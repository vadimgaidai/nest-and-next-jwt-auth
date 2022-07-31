import { useRouter } from 'next/router'
import Link from 'next/link'
import { FC } from 'react'
import { ListItem } from '@chakra-ui/react'

import { Container } from 'components/Container'
import { config } from './config'
import { Content, LinkText, List } from './styles'

const Header: FC = () => {
  const { pathname } = useRouter()

  return (
    <Content>
      <Container as="nav">
        <List>
          {config?.map(({ route, value, path }) => (
            <ListItem key={route}>
              <Link href={route}>
                <LinkText color={pathname === path ? 'secondary' : 'text'}>{value}</LinkText>
              </Link>
            </ListItem>
          ))}
        </List>
      </Container>
    </Content>
  )
}

export default Header
