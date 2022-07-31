import type { NextPage } from 'next'
import { Text } from '@chakra-ui/react'

const Home: NextPage = () => (
  <main>
    <Text
      bgGradient="linear(to-l, #7928CA, #FF0080)"
      bgClip="text"
      fontSize="6xl"
      fontWeight="extrabold">
      Welcome to <a href="https://nextjs.org">Next.js!</a>
    </Text>
  </main>
)

export default Home
