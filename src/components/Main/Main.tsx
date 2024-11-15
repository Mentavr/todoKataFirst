import { Task } from '../Task/Task';
import { useContextState } from '../../utils/hooks/useContextState';

import cls from './style.module.css';

export const Main = () => {
  const { getTasks } = useContextState();
  const tasks = getTasks();

  return (
    <div className="main">
      <ul className={cls.todoList}>
        {tasks.map(({ description, id, type, created }) => (
          <Task key={id} description={description} id={id} type={type} created={created} />
        ))}
      </ul>
    </div>
  );
};
