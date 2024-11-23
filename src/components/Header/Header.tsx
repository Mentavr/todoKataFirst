import { useForm, SubmitHandler } from 'react-hook-form';

import { useContextState } from '../../utils/hooks/useContextState';
import { IFormInput } from '../../types/types';

import cls from './style.module.css';
import clsx from 'clsx';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../validation/validation';

export const Header = () => {
  const { addTask } = useContextState();
  const { register, handleSubmit, setValue } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    let minutes = data.min;
    let seconds = data.sec;
    if (!minutes) {
      minutes = 0;
    }
    if (!seconds) {
      seconds = 0;
    }

    addTask({
      type: 'active',
      id: new Date().getMilliseconds(),
      description: data.toDo,
      created: new Date(),
      minutes: minutes,
      seconds: seconds,
    });

    setValue('toDo', '');
    setValue('min', undefined);
    setValue('sec', undefined);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const handleInputMinutes = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, '');

    if (value[0] === '0') {
      value = value.slice(0, 1);
    }
    e.target.value = value;
  };

  const handleInputSecond = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, '');

    if (value.length > 0 && ['0', '7', '8', '9'].includes(value[0])) {
      value = value.slice(1);
    }

    if (value[0] === '6' && value[1] !== '0') {
      value = value.slice(0, 1);
    }

    if (value.length > 2) {
      value = value.slice(0, 2);
    }

    e.target.value = value;
  };

  return (
    <header className={cls.header}>
      <h1>todos</h1>
      <form className={cls.form} onKeyDown={handleKeyDown} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={cls.newTodo}
          placeholder="What needs to be done?"
          autoFocus
          {...register('toDo', { required: true })}
        />

        <input
          className={clsx(cls.newTodo, cls.min)}
          type="number"
          placeholder="Min"
          {...register('min')}
          onInput={handleInputMinutes}
        />

        <input
          className={clsx(cls.newTodo, cls.sec)}
          type="number"
          placeholder="Sec"
          {...register('sec')}
          onInput={handleInputSecond}
        />
      </form>
    </header>
  );
};
