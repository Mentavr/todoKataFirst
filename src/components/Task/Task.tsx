import { clsx } from 'clsx';
import cls from './style.module.css';
import { useEffect, useState } from 'react';
import { useContextState } from '../../utils/hooks/useContextState';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFormInput } from '../../types/types';
import { formatDistance } from '../../utils/halpers/formatDistance';

interface ITask {
  description: string;
  created: Date;
  id: number;
  type: 'active' | 'complete';
}

export const Task = ({ description, created, id, type }: ITask) => {
  const [statusTask, setStatusTask] = useState<'active' | 'complete'>(type);
  const [isEdit, setEdit] = useState<boolean>(false);
  const { setTypeTask, deleteTask, editTask } = useContextState();
  const { register, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      toDo: description,
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    editTask(id, data.toDo);
    setEdit(false);
  };

  const handlerTypeTask = () => {
    statusTask === 'active' ? setStatusTask('complete') : setStatusTask('active');
  };

  const handlerDeleteTask = () => {
    deleteTask(id);
  };

  const handlerEdit = () => {
    setEdit(true);
  };

  useEffect(() => {
    setTypeTask(id, statusTask);
  }, [statusTask]);

  console.log('formatDistance(created)', formatDistance(created));

  return (
    <li className={cls.editing}>
      <div className={clsx(isEdit && cls.view)}>
        <input
          id="task"
          onChange={handlerTypeTask}
          className={cls.toggle}
          type="checkbox"
          checked={statusTask === 'complete'}
        />
        <label htmlFor="task">
          <span className={clsx(cls.description, statusTask === 'complete' && cls.descriptionCheck)}>
            {description}
          </span>
          <span className={cls.created}>{formatDistance(created)}</span>
        </label>
        <button onClick={handlerEdit} className={clsx(cls.icon, cls.iconEdit)}></button>
        <button onClick={handlerDeleteTask} className={clsx(cls.icon, cls.iconDestroy)}></button>
      </div>
      {isEdit && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input className={cls.edit} autoFocus {...register('toDo', { required: true })} />
        </form>
      )}
    </li>
  );
};