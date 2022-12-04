import { FieldValues } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import { NextPage } from 'next'

import { SignInValidation } from 'utils/validation'

import { useAppDispatch } from 'state/hooks'
import { authLoading } from 'state/auth/selectors'
import { signIn } from 'state/auth/actions'

import AuthWrapper from 'components/Auth/Wrapper'
import { Form, FormField } from 'components/Form'

const SignIn: NextPage = () => {
  const router = useRouter()

  const dispatch = useAppDispatch()

  const isLoading = useSelector(authLoading)

  const onSubmit = async ({ email, password }: FieldValues) => {
    const { payload } = await dispatch(
      signIn({
        email,
        password,
      })
    )
    if (payload) {
      router.push('/dashboard')
    }
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
