import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';

interface ChildrenProps {
  children: React.ReactNode;
}

export const TaskColumnHeader: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <div className="flex items-center mb-5">
      {children}
    </div>
  );
};

export const LeftTray: React.FC<ChildrenProps> = ({ children }) => {
  return <div className="flex items-center gap-3 w-full">
    {children}
  </div>
};

export const RightTray: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <div className="flex items-center ml-auto gap-3">
      {children}
    </div>
  );
};

export const DefaultRightTray = () => {
  return <RightTray>
    <AiOutlinePlus className="cursor-pointer" />
    <BsThreeDots className="cursor-pointer" />
  </RightTray>
};
