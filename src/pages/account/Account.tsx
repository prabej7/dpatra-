import { UserBarChart, UserInfos, UserPieChart } from '@/components';
import Section from '@/components/Section';
import { useAuth } from '@/hooks';
import { useUser } from '@/store';
import { convertDP } from '@/utils';
import { Transfer } from './components';

const Account: React.FC = () => {
  const { isUserLoading } = useAuth();

  const { user } = useUser();

  if (isUserLoading) return <>Loading..</>;

  const img = convertDP(user.dp);

  return (
    <Section selected="Dashboard" title="Dashboard" titleOptions={<Transfer />}>
      <UserInfos />
      <div className="grid grid-rows-1 grid-cols-2 gap-6 h-[700px] overflow-y-auto">
        <UserPieChart />
        <UserBarChart />
      </div>
    </Section>
  );
};

export default Account;
