import * as yup from 'yup'

export const SignInValidation = yup.object().shape({
  email: yup.string().email('Invalid mail').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

export const SignUpValidation = yup
  .object()
  .shape({
    name: yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  })
  .concat(SignInValidation)
