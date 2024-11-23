import * as yup from 'yup';

interface Schema {
  toDo: string;
  min?: number;
  sec?: number;
}

export const schema = yup.object({
  toDo: yup.string().required().trim(),
  min: yup.number(),
  sec: yup.number(),
}) as yup.ObjectSchema<Schema>;
