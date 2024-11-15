import clsx from 'clsx';

import { useContextState } from '../../utils/hooks/useContextState';

import cls from './style.module.css';

export const Footer = () => {
  const { getCountActiveTasks, setStateStatusButton, deleteCompletedTasks, stateStatusButton } = useContextState();

  const handlerButton = (status: 'active' | 'complete' | null) => {
    setStateStatusButton(status);
  };

  return (
    <footer className={cls.footer}>
      <span className={cls.todoCount}>{`${getCountActiveTasks()} items left`}</span>
      <ul className={cls.filters}>
        <li>
          <button className={clsx(stateStatusButton === null && cls.selected)} onClick={() => handlerButton(null)}>
            All
          </button>
        </li>
        <li>
          <button
            className={clsx(stateStatusButton === 'active' && cls.selected)}
            onClick={() => handlerButton('active')}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={clsx(stateStatusButton === 'complete' && cls.selected)}
            onClick={() => handlerButton('complete')}
          >
            Completed
          </button>
        </li>
      </ul>
      <button onClick={deleteCompletedTasks} className={cls.clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};
