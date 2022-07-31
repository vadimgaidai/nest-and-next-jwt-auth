import { NextPage } from 'next'
import { Heading, Text } from '@chakra-ui/react'
import { FieldValues } from 'react-hook-form'

import { SignInValidation } from 'utils/validation'

import { Container } from 'components/Container'
import { Form, FormField } from 'components/Form'

const SignIn: NextPage = () => {
  const onSubmit = (data: FieldValues) => {
    console.log('SignIn', data)
  }
  return (
    <Container>
      <Heading as="h1" size="xl">
        Sign In
      </Heading>
      <Text>
        You can login with your registered account or quick login with your Google account.
      </Text>
      <Form validation={SignInValidation} text="Sign In" onSubmit={onSubmit}>
        <FormField name="email" type="email" label="Enter your email" />
        <FormField name="password" type="password" label="Enter your password" />
      </Form>
    </Container>
  )
}

export default SignIn
