import { NextPage } from 'next'
import { Text } from '@chakra-ui/react'

const SignIn: NextPage = () => (
  <main>
    <Text
      bgGradient="linear(to-l, #7928CA, #FF0080)"
      bgClip="text"
      fontSize="6xl"
      fontWeight="extrabold">
      Sign In
    </Text>
  </main>
)

export default SignIn
