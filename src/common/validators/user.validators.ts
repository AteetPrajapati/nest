import * as yup from 'yup';

export const createUserSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required(),
  role: yup.string().oneOf(['user', 'admin']).default('user'),
});
