import { Section } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { User } from '@/declarations/backend/backend.did';
import { backend } from '@/declarations/export';
import { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import UserDetails from './components/UserDetails';
import Billing from './components/Billing';
import { io, Socket } from 'socket.io-client';
import { useUser } from '@/store';
const TaxBilling: React.FC = () => {
  const [userid, setUserID] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const { user: admin } = useUser();
  const [{ token }] = useCookies(['token']);

  const [socket, setSocket] = useState<Socket>();

  const establishConnection = useCallback(() => {
    const socket = io('http://192.168.43.121:5000/');
    setSocket(socket);
    socket?.emit('id', token);
  }, []);

  useEffect(() => {
    establishConnection();

    socket?.on('error', () => {
      toast.error('User is not connected.');
    });

    socket?.on('receive-pay-success', () => {
      console.log('ok');
      toast.success('Payment Received.');
    });

    socket?.on('pay-decline', () => {
      toast.error('Payment Declined');
    });
  }, []);

  const handleRequest = async (amount: number, purpose: string) => {
    socket?.emit('req-pay', {
      requester: {
        id: admin.id,
        fullName: admin.fullName,
      },
      receiver: userid,
      amount,
      purpose,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { message, user } = await backend.getUser(
        String(userid),
        String(token),
      );

      if (message == '200') {
        setUser(user);
        return;
      }
      console.log(message);
      toast.error(message);
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Section title="Tax Billing" selected="Tax Billing">
      <div className="flex gap-6 my-6">
        <Input
          placeholder="Account ID"
          onChange={(e) => setUserID(e.target.value)}
        />
        <Button disabled={isLoading} variant="pri" onClick={handleSubmit}>
          {isLoading ? <Spinner /> : 'Search'}
        </Button>
      </div>
      {user && (
        <UserDetails
          properties={user.properties}
          transactions={user.transactions}
          user={user}
        />
      )}
      {user && <Billing onRequest={handleRequest} />}
    </Section>
  );
};

export default TaxBilling;
