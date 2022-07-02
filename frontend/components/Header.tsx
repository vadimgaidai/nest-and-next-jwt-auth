import { useRouter } from 'next/router'
import Link from 'next/link'
import { FC } from 'react'
import { ListItem, Text, List as ChakraList } from '@chakra-ui/react'
import styled from 'styled-components'

const Content = styled.header`
  padding: 15px;
`
const List = styled(ChakraList)`
  display: grid;
  grid-auto-columns: max-content;
  grid-auto-flow: column;
  column-gap: 15px;
`

const LinkText = styled(Text)`
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.5;
  }
`

const Header: FC = () => {
  const { pathname } = useRouter()

  const links = [
    {
      path: '/',
      route: '/',
      value: 'Home',
    },
    {
      path: '/SignIn',
      route: '/sign-in',
      value: 'Sign In',
    },
    {
      path: '/SignUp',
      route: '/sign-up',
      value: 'Sign Up',
    },
  ]

  return (
    <Content>
      <nav>
        <List>
          {links?.map(({ route, value, path }) => (
            <ListItem key={route}>
              <Link href={route}>
                <LinkText color={pathname === path ? 'active' : 'text'}>{value}</LinkText>
              </Link>
            </ListItem>
          ))}
        </List>
      </nav>
    </Content>
  )
}

export default Header
