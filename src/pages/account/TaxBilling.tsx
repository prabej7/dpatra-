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
const TaxBilling: React.FC = () => {
  const [userid, setUserID] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [{ token }] = useCookies(['token']);

  const [socket, setSocket] = useState<Socket>();

  const establishConnection = useCallback(() => {
    const socket = io('http://192.168.43.121:5000/');
    setSocket(socket);
  }, []);

  useEffect(() => {
    establishConnection();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { message, user } = await backend.getUser(
        String(token),
        String(userid),
      );

      if (message == '200') {
        setUser(user);
        return;
      }

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
      {user && <Billing />}
    </Section>
  );
};

export default TaxBilling;
