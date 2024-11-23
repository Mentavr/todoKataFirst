export interface ITask {
  id: number;
  type: 'active' | 'complete';
  description: string;
  created: Date;
  minutes: number;
  seconds: number;
}

export interface IContextValue {
  getTasks: () => ITask[];
  editTask: (id: number, newDescription: string) => void;
  addTask: (e: ITask) => void;
  deleteCompletedTasks: () => void;
  setTypeTask: (id: number, type: 'active' | 'complete') => void;
  getLength: () => void;
  getCountActiveTasks: () => void;
  stateStatusButton: 'active' | 'complete' | null;
  setStateStatusButton: (e: 'active' | 'complete' | null) => void;
  deleteTask: (id: number) => void;
}
