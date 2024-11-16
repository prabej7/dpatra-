import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const TabBar: React.FC = () => {
  const links = [
    {
      name: 'Home',
      icon: <Home />,
      path: '/mobile/account',
    },
  ];
  return (
    <div className="absolute bottom-12 w-full">
      <div className='flex gap-3 w-full justify-evenly px-6' >
        {links.map(({ icon, name, path }) => {
          return (
            <Link
              to={path}
              className="flex flex-col items-center justify-center"
            >
              {icon} <p>{name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TabBar;
