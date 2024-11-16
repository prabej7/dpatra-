import {
  Property,
  Transaction,
  User,
} from '@/declarations/backend/backend.did';
import TransactionsTemplate from './TransactionsTemplate';
import PropertiesTable from './PropertiesTable';

interface Props {
  user: User;
  transactions: [string, Transaction][];
  properties: [string, Property][];
}

const UserDetails: React.FC<Props> = ({ properties, transactions, user }) => {
  return (
    <div className="flex flex-col gap-6 my-6">
      <div className="">
        <p className="font-medium text-lg text-green-500">Account Details</p>
        <div className="flex gap-24">
          <ul>
            <li>ID</li>
            <li>Full Name</li>
            <li>National Identity No.</li>
            <li>Citizenship No.</li>
          </ul>
          <ul>
            <li>{user.id}</li>
            <li>{user.fullName}</li>
            <li>{user.nid}</li>
            <li>{user.czid}</li>
          </ul>
        </div>
      </div>
      <div>
        <p className="font-medium text-lg text-green-500">Transactions</p>
        <TransactionsTemplate transactions={transactions} />
      </div>
      <div>
        <p className="font-medium text-lg text-green-500">Properties Details</p>
        <PropertiesTable properties={properties} />
      </div>
    </div>
  );
};

export default UserDetails;
