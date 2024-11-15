import { useForm, SubmitHandler } from 'react-hook-form';
import cls from './style.module.css';
import { useContextState } from '../../utils/hooks/useContextState';
import { IFormInput } from '../../types/types';

export const Header = () => {
  const { addTask } = useContextState();
  const { register, handleSubmit, setValue } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    addTask({ type: 'active', id: new Date().getMilliseconds(), description: data.toDo, created: new Date() });
    setValue('toDo', '');
  };

  return (
    <header className={cls.header}>
      <h1>todos</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className={cls.newTodo}
          placeholder="What needs to be done?"
          autoFocus
          {...register('toDo', { required: true })}
        />
      </form>
    </header>
  );
};
