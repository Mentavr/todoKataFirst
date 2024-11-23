import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useContextState } from '../../utils/hooks/useContextState';
import { IFormInput } from '../../types/types';
import { formatDistance } from '../../utils/halpers/formatDistance';

import cls from './style.module.css';
import { Timer } from '../Timer/Timer';

interface ITask {
  description: string;
  created: Date;
  id: number;
  type: 'active' | 'complete';
  minutes: number;
  seconds: number;
}

export const Task = ({ description, created, id, type, minutes, seconds }: ITask) => {
  const [statusTask, setStatusTask] = useState<'active' | 'complete'>(type);
  const [isEdit, setEdit] = useState<boolean>(false);
  const { setTypeTask, deleteTask, editTask, stateStatusButton } = useContextState();
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
    if (statusTask === 'active') {
      setStatusTask('complete');
    } else {
      setStatusTask('active');
    }
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

  const activeTasksStyle = {
    [cls.visibleTask]: true,
    [cls.hiddenTask]:
      (stateStatusButton === 'complete' && type === 'active') ||
      (stateStatusButton === 'active' && type === 'complete'),
  };

  return (
    <li className={clsx(cls.editing, activeTasksStyle)}>
      <div className={clsx(cls.wrapper, isEdit && cls.view)}>
        <input
          id={String(id)}
          onChange={handlerTypeTask}
          className={cls.toggle}
          type="checkbox"
          checked={statusTask === 'complete'}
        />
        <label className={cls.labelTask} htmlFor={String(id)}>
          <span className={clsx(cls.description, statusTask === 'complete' && cls.descriptionCheck)}>
            {description}
          </span>
        </label>
        <Timer taskId={id} minutes={minutes} seconds={seconds} />
        <span className={cls.created}>{formatDistance(created)}</span>
        <div className={cls.wrapperButtonTask}>
          <button onClick={handlerEdit} className={clsx(cls.icon, cls.iconEdit)}></button>
          <button onClick={handlerDeleteTask} className={clsx(cls.icon, cls.iconDestroy)}></button>
        </div>
      </div>
      {isEdit && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input className={cls.edit} autoFocus {...register('toDo', { required: true })} />
        </form>
      )}
    </li>
  );
};
