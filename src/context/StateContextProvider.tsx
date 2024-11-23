import { useState, type ReactNode } from 'react';

import { IContextValue, ITask } from '../types/contextTypes';

import { StateContext } from './StateContext';

interface IStateContextProvider {
  children: ReactNode;
}

type IStatusButton = 'active' | 'complete' | null;

export const StateContextProvider = ({ children }: IStateContextProvider) => {
  const [stateTasks, setStateTasks] = useState([] as ITask[]);
  const [stateStatusButton, setStateStatusButton] = useState<IStatusButton>(null);

  // const getTasks = () => {
  //   const filterTasksForStatus = stateTasks.filter((task) => {
  //     if (stateStatusButton === null) {
  //       return task;
  //     }
  //     if (task.type === stateStatusButton) {
  //       return task;
  //     }
  //   });
  //   return filterTasksForStatus;
  // };

  const getTasks = () => {
    return stateTasks;
  };

  const addTask = ({ id, description, type, created, minutes, seconds }: ITask) => {
    setStateTasks([...stateTasks, { id, description, type, created, minutes, seconds }]);
  };

  const editTask = (id: number, newDescription: string) => {
    const newTasks = stateTasks.map((elem) => {
      if (elem.id === id) {
        return { ...elem, description: newDescription };
      }
      return elem;
    });
    setStateTasks(newTasks);
  };

  const setTypeTask = (id: number, type: 'active' | 'complete') => {
    const newTasks = stateTasks.map((elem) => {
      if (elem.id === id) {
        return { ...elem, type: type };
      }
      return elem;
    });
    setStateTasks(newTasks);
  };

  const deleteTask = (id: number) => {
    const filterTasks = stateTasks.filter((elem) => elem.id !== id);
    setStateTasks(filterTasks);
  };

  const deleteCompletedTasks = () => {
    const filterTasks = stateTasks.filter((elem) => elem.type !== 'complete');
    setStateTasks(filterTasks);
  };

  const getLength = () => {
    return +stateTasks.length;
  };

  const getCountActiveTasks = () => {
    const activeTasks = stateTasks.filter((elem) => elem.type === 'active');
    return activeTasks.length;
  };

  const contextValue: IContextValue = {
    getTasks,
    editTask,
    addTask,
    deleteCompletedTasks,
    setTypeTask,
    getLength,
    getCountActiveTasks,
    stateStatusButton,
    setStateStatusButton,
    deleteTask,
  };

  return <StateContext.Provider value={contextValue}>{children}</StateContext.Provider>;
};
