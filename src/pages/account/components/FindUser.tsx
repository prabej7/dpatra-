import { Sheets } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Property, User } from '@/declarations/backend/backend.did';
import { backend } from '@/declarations/export';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import Docs from './Docs';

const FindUser: React.FC = () => {
  const [{ token }] = useCookies(['token']);
  const [userid, setUserId] = useState<string>('');
  const [docurl, setDocUrl] = useState<string>('');
  const [user, setUser] = useState<User>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isDocumentView, setDocumentView] = useState<boolean>(false);

  const handleFind = async () => {
    setLoading(true);
    try {
      const { message, user } = await backend.getUser(
        String(userid),
        String(userid),
      );

      if (message === '200') {
        setUser(user);

        const fileBlob = new Blob([new Uint8Array(user.dp)], {
          type: 'image/jpeg',
        });

        const imageUrl = URL.createObjectURL(fileBlob);
        setDocUrl(imageUrl);
        return;
      }

      if (message === '404') {
        toast.error('User not found!');
      }
      toast.error(message);
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheets
      side="top"
      trigger={
        <Button variant="pri">
          Find
          <Search />
        </Button>
      }
      title="Find a user."
      desciption="You can find a user by their id."
      content={
        <div className="overflow-y-auto max-h-[80vh] p-4">
          <div className="flex gap-6">
            <Input
              placeholder="User ID"
              onChange={(e) => setUserId(e.target.value)}
            />
            <Button variant="pri" onClick={handleFind}>
              {isLoading ? <Spinner /> : <Search />}
            </Button>
          </div>

          {docurl && (
            <div className="">
              <div className="flex gap-6 items-center">
                <img className="h-96 rounded-lg border my-6" src={docurl} />
                <div className="border h-72"></div>
                <div>
                  <p className="font-bold pl-6 text-2xl text-gradient">
                    Citizens Details
                  </p>
                  <div className="flex gap-24 p-6">
                    <ul>
                      <li className="text-slate-700">
                        <strong>ID</strong>
                      </li>
                      <li className="text-slate-700">
                        <strong>Full Name</strong>
                      </li>
                      <li className="text-slate-700">
                        <strong>Gender</strong>
                      </li>
                      <li className="text-slate-700">
                        <strong>Date of Birth</strong>
                      </li>
                      <li className="text-slate-700">
                        <strong>Citizenship no.:</strong>
                      </li>
                      <li className="text-slate-700">
                        <strong>Documents</strong>
                      </li>
                      <li className="text-slate-700">
                        <strong>Created At</strong>
                      </li>
                    </ul>
                    <ul>
                      <li className="text-slate-700">{user?.id}</li>
                      <li className="text-slate-700">{user?.fullName}</li>
                      <li className="text-slate-700">{user?.gender}</li>
                      <li className="text-slate-700">{user?.dob}</li>
                      <li className="text-slate-700">View</li>
                      <li
                        className="text-slate-700 cursor-pointer"
                        onClick={() => setDocumentView(true)}
                      >
                        {user?.czid}
                      </li>
                      <li className="text-slate-700">{user?.createdAt}</li>
                    </ul>
                  </div>
                </div>
              </div>
              {user && <Docs documents={user?.documents} />}
            </div>
          )}
        </div>
      }
    />
  );
};

export default FindUser;
