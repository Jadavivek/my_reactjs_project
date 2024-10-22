import React  from 'react';
import { Navbar } from '../components/NavBar';
import { PriorityIcon, StatusIcon, TagsList, TaskCardContainer, TaskCardIcon, TaskTitle, UserIcon } from '../components/TaskCard';
import { DefaultRightTray, LeftTray, TaskColumnHeader } from '../components/TaskColumnHeader';
import { GroupingTypes, SortingTypes, Task } from '../data/Task';
import { User } from '../data/User';
import useCachedState from '../hooks/useCachedState';
import './TaskBoard.css';
import { getBoardColumnKeys, groupTasks, priorityKeyFromValue, sortGrouppedTasks } from './utils';

export default function TaskBoard({ tasks, users }: { tasks: Task[], users: User[] }) {
  const [groupby, setGroupBy] = useCachedState<GroupingTypes>('appv1-groupingtypes', 'Priority');
  const [sortby, setSortby] = useCachedState<SortingTypes>('appv1-sortingtypes', 'Priority');
  const groupedTasks = sortGrouppedTasks(groupTasks(groupby, tasks), sortby);
  const keys = getBoardColumnKeys(groupby, tasks);
  return (
    <>
      <Navbar
        selectedGroup={groupby}
        selectedSort={sortby}
        onSortChange={(tp) => { setSortby(tp) }}
        onGroupChange={(grp) => { setGroupBy(grp) }}
      />
      <div className="task-board">
        {keys.map((columnTitle) => (
          <TaskColumn groupedby={groupby} key={columnTitle} users={users} columnTitle={columnTitle} tasks={groupedTasks[columnTitle] ?? []} />
        ))}
      </div>
    </>
  );
};

interface TaskColumnProps {
  columnTitle: string;
  tasks: Task[];
  groupedby: GroupingTypes;
  users: User[];
}
const TaskColumn: React.FC<TaskColumnProps> = ({ columnTitle, tasks, groupedby, users }) => {
  const isUserActive = (userid: string): boolean => {
    return users.find((v) => v.id === userid)?.available ?? false;
  }
  const GroupIcon = () => {
    let firstElement = tasks.length > 0 ? tasks[0] : undefined;
    if (groupedby === 'Priority') {
      //@ts-ignore
      return <PriorityIcon priority={(firstElement !== undefined) ? priorityKeyFromValue(firstElement.priority) : columnTitle} />
    } else if (groupedby === 'User') {
      const userId = firstElement?.userId ?? columnTitle;
      return <UserIcon userid={userId} isActive={isUserActive(userId)} />
    } else if (groupedby === 'Status') {
      //@ts-ignore
      return <StatusIcon status={firstElement?.status ?? columnTitle} />
    }
    throw new Error('Invalid grouping type');
  };
  return (
    <div className="task-column">

      <TaskColumnHeader>
        <LeftTray>
          <GroupIcon />
          <div className="text-sm bold">{groupedby !== 'User' ? columnTitle : users.find(v => v.id === columnTitle)?.name ?? "No Name"}</div>
          <div className="text-sm">{tasks?.length ?? 0}</div>
        </LeftTray>
        <DefaultRightTray />
      </TaskColumnHeader>

      {tasks.map((task, i) => (
        <TaskCardContainer className='flex' key={i}>
          <div>
            <div className="text-sm mb-2">{task.id}</div>
            <div className='flex gap-3'>
              {(groupedby !== 'Status') && <StatusIcon status={task.status} />}
              <TaskTitle title={task.title} />
            </div>
            <div className='flex align-center gap-1 mt-3'>
              {(groupedby !== 'Priority') && <TaskCardIcon task={task} />}
              <TagsList tags={task.tags ?? []} />
            </div>
          </div>

          {(groupedby !== 'User') && <UserIcon userid={task.userId} className="ml-auto" isActive={isUserActive(task.userId)} />}
        </TaskCardContainer>
      ))}
    </div>
  );
};
