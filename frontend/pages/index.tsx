import { Text } from '@chakra-ui/react'

import type { NextPage } from 'next'

import { useAppSelector } from 'state/hooks'
import { selectUser, selectUsers } from 'state/users/selectors'
import { wrapper } from 'state/store'
import { getUsers } from 'state/users/actions'

const Home: NextPage = () => {
  const user = useAppSelector(selectUser)
  const users = useAppSelector(selectUsers)
  return (
    <main>
      <Text
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold">
        User: {user?.name} {user?.email}
      </Text>
      {users?.map(({ id, name }) => (
        <div key={id}>{name}</div>
      ))}
    </main>
  )
}

Home.getInitialProps = wrapper.getInitialPageProps((store) => async () => {
  await store.dispatch(getUsers())
})

export default Home
