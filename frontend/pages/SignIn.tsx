import { NextPage } from 'next'
import { Heading, Text } from '@chakra-ui/react'
import { Container } from 'components/Container'

const SignIn: NextPage = () => (
  <Container>
    <Heading>Login</Heading>
    <Text>You can login with your registered account or quick login with your Google account.</Text>
  </Container>
)

export default SignIn
