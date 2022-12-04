import { Button } from '@chakra-ui/react'
import styled from 'styled-components'
import { NextPage } from 'next/types'

import { useAppDispatch, useAppSelector } from 'state/hooks'
import { selectUser } from 'state/users/selectors'
import { logout } from 'state/auth/slice'

import { Container } from 'components/Container'

const ContainerStyle = styled(Container)`
  display: grid;
`
const Wrapper = styled.section`
  display: grid;
  grid-auto-rows: min-content;
  grid-auto-flow: row;
  align-self: center;
  justify-self: center;
  row-gap: 12px;
`
const Dashboard: NextPage = () => {
  const user = useAppSelector(selectUser)

  const dispatch = useAppDispatch()

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <ContainerStyle as="main">
      <Wrapper>
        <h1>
          Hi <b>{user?.name}</b>!
        </h1>
        <h2>
          This is your email <b>{user?.email}</b>
        </h2>
        <Button onClick={onLogout}>Logout</Button>
      </Wrapper>
    </ContainerStyle>
  )
}

export default Dashboard
