import AppSidebar from '@/components/Sidebar';
import React from 'react';

interface Props {
  title: string;
  selected: string;
  children: React.ReactNode;
  titleOptions?: React.ReactNode;
}

const Section: React.FC<Props> = ({
  selected,
  title,
  children,
  titleOptions,
}) => {
  return (
    <div className="flex w-full min-h-screen ">
      {/* Sidebar with fixed width */}
      <AppSidebar selected={selected} />

      {/* Content section that grows to fill remaining width */}
      <div className="flex-grow p-12">
        <div className="flex justify-between" style={{ width: '100%' }}>
          <h1 className="font-bold text-xl text-green-500">{title}</h1>
          {titleOptions}
        </div>
        <div className="overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default Section;
