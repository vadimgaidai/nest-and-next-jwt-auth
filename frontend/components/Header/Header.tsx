import { useRouter } from 'next/router'
import Link from 'next/link'
import { FC } from 'react'
import { ListItem } from '@chakra-ui/react'

import { Container } from 'components/Container'
import { config } from './config'
import { HeaderStyle, LinkText, List } from './styles'

const Header: FC = () => {
  const { pathname } = useRouter()

  return (
    <HeaderStyle>
      <Container as="nav">
        <List>
          {config?.map(({ route, value, path }) => (
            <ListItem key={route}>
              <Link href={route} passHref>
                <LinkText color={pathname === path ? 'secondary' : 'text'}>{value}</LinkText>
              </Link>
            </ListItem>
          ))}
        </List>
      </Container>
    </HeaderStyle>
  )
}

export default Header
