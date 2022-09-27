import { FieldValues } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { NextPage } from 'next'

import { SignUpValidation } from 'utils/validation'
import { useAppDispatch } from 'state/hooks'
import { authLoading } from 'state/auth/selectors'

import AuthWrapper from 'components/Auth/Wrapper'
import { Form, FormField } from 'components/Form'
import { signUp } from 'state/auth/actions'

const SignUp: NextPage = () => {
  const dispatch = useAppDispatch()
  const isLoading = useSelector(authLoading)

  const onSubmit = async ({ name, email, password }: FieldValues) => {
    await dispatch(signUp({ name, email, password }))
  }

  return (
    <AuthWrapper title="Sign Up" type="signup">
      <Form text="Sign Un" validation={SignUpValidation} loading={isLoading} onSubmit={onSubmit}>
        <FormField name="name" type="text" label="Name" placeholder="Enter your name" />
        <FormField name="email" type="email" label="Email" placeholder="Enter your email" />
        <FormField
          name="password"
          type="password"
          label="Password"
          placeholder='Enter your password"'
        />
      </Form>
    </AuthWrapper>
  )
}

export default SignUp
