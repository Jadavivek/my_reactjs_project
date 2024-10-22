export type TaskStatus = 'Todo' | 'In progress' | 'Done' | 'Backlog';
export const TaskStatusTypes: TaskStatus[] = ['Todo', 'In progress', 'Done', 'Backlog'];

export const TaskPriority = {
  NoPriority: 0,
  Low: 1,
  Medium: 2,
  High: 3,
  Urgent: 4,
}
export const TaskPriorityTypes = Object.keys(TaskPriority) as Array<keyof typeof TaskPriority>;

export type Task = {
  id: string;
  title: string;
  tags: string[];
  userId: string;
  status: TaskStatus;
  priority: number;
}

export type GroupingTypes = "User" | "Priority" | "Status";
export type SortingTypes = "Priority" | "Title"
