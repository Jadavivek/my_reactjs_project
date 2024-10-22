import React from 'react';
import { GroupingTypes, SortingTypes } from '../data/Task';
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import './NavBar.css';
import { FaAngleDown } from "react-icons/fa";

const groupOptions: GroupingTypes[] = ['Status', 'Priority', 'User'];
const sortOptions: SortingTypes[] = ['Priority', 'Title'];

interface NavbarProps {
  selectedGroup: GroupingTypes;
  selectedSort: SortingTypes;
  onGroupChange: (group: GroupingTypes) => void;
  onSortChange: (sort: SortingTypes) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ selectedGroup, selectedSort, onGroupChange, onSortChange }) => {
  return (
    <nav className="navbar text-left">
      <div className='dropdown'>
        <div className='flex align-center gap-2 border p-5 rounded-md m-2'>
          <HiAdjustmentsHorizontal />
          <p className="m-0 p-0">Display</p>
          <FaAngleDown/>
        </div>
        <div className="dropdown-content">
          <div className="dropdown-group flex align-center w-250px space-between">
            <label htmlFor="grouping">Grouping </label>
            <select className='max-w-md' id="grouping" value={selectedGroup} onChange={(e) => onGroupChange(e.target.value as GroupingTypes)}>
              {groupOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="dropdown-group flex align-center w-250px space-between">
            <label htmlFor="sorting">Sorting</label>
            <select className='max-w-md' id="sorting" value={selectedSort} onChange={(e) => onSortChange(e.target.value as SortingTypes)}>
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};
