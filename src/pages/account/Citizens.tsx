import { Sheets, Table } from '@/components';
import Section from '@/components/Section';
import { Button } from '@/components/ui/button';
import CitizenForm from '@/components/user/CitizenForm';
import { User } from '@/declarations/backend/backend.did';
import { useQueryCall } from '@ic-reactor/react';
import { Search, UserPlus } from 'lucide-react';
import FindUser from './components/FindUser';

const Citizens: React.FC = () => {
  const { data, loading } = useQueryCall({
    functionName: 'getAllUser',
  });

  const allUsers = data as [string, User][];

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Section
        title="Citizens"
        selected="Citizens"
        titleOptions={
          <div className="flex gap-6">
            <FindUser />
            <Sheets
              side="bottom"
              title="Register Citizen"
              desciption="Add the details and click on the submit button."
              trigger={
                <Button variant="pri">
                  Add <UserPlus />{' '}
                </Button>
              }
              content={
                <div>
                  <CitizenForm />
                </div>
              }
            />
          </div>
        }
      >
        <div>
          <Table users={allUsers} />
        </div>
      </Section>
    </>
  );
};

export default Citizens;
