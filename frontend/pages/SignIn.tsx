import { FieldValues } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { NextPage } from 'next'

import { SignInValidation } from 'utils/validation'
import { useAppDispatch } from 'state/hooks'
import { authLoading } from 'state/auth/selectors'

import AuthWrapper from 'components/Auth/Wrapper'
import { Form, FormField } from 'components/Form'
import { signIn } from 'state/auth/actions'

const SignIn: NextPage = () => {
  const dispatch = useAppDispatch()
  const isLoading = useSelector(authLoading)

  const onSubmit = async ({ email, password }: FieldValues) => {
    await dispatch(
      signIn({
        email,
        password,
      })
    )
  }

  return (
    <AuthWrapper title="Sign In" type="signin">
      <Form text="Sign In" validation={SignInValidation} loading={isLoading} onSubmit={onSubmit}>
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

export default SignIn
