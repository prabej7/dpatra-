import { useUser } from '@/store';
import {
  LayoutDashboard,
  LogOut,
  User,
  FileText,
  ArrowLeftRight,
  House,
  icons,
  BadgePercent,
} from 'lucide-react';
import { useCookies } from 'react-cookie';

import { Link } from 'react-router-dom';

// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: '/account',
    icon: <LayoutDashboard />,
  },
  {
    title: 'Citizens',
    url: '/account/citizens',
    icon: <User />,
  },
  {
    title: 'Documents',
    url: '/account/documents',
    icon: <FileText />,
  },
  {
    title: 'Transactions',
    url: '/account/transactions',
    icon: <ArrowLeftRight />,
  },
  {
    title: 'Properties',
    url: '/account/properties',
    icon: <House />,
  },
  {
    title: 'Tax Billing',
    url: '/account/billing',
    icon: <BadgePercent />,
  },
];

const AppSidebar: React.FC<{ selected: string }> = ({ selected }) => {
  const [_, __, removeCookie] = useCookies(['token']);
  const { user } = useUser();
  return (
    <div className="p-12 min-w-80">
      <div>
        <p className="font-bold text-2xl bg-gradient-to-b from-green-300 to-green-700 inline-block text-transparent bg-clip-text">
          DPatra
        </p>
        <p className="text-sm text-slate-700">Account No. {user.id}</p>
      </div>
      <div className="border my-3"></div>
      <div>
        <ul className="flex flex-col">
          {items.map(({ title, url, icon }) => {
            return (
              <>
                <Link
                  className={`py-3 pl-3 flex gap-3 ${
                    title == selected
                      ? 'bg-gradient-to-t from-green-600 bg-green-400  rounded-lg'
                      : 'text-green-500'
                  }`}
                  to={url}
                >
                  <div className={`${title == selected && 'text-white'}`}>
                    {icon}
                  </div>

                  <p className={`${title == selected && 'text-white'}`}>
                    {title}
                  </p>
                </Link>
              </>
            );
          })}
        </ul>
        <p
          onClick={() => removeCookie('token')}
          className="py-3 pl-3 flex gap-3 text-green-500 cursor-pointer"
        >
          <LogOut />
          Logout
        </p>
      </div>
    </div>
  );
};

export default AppSidebar;
