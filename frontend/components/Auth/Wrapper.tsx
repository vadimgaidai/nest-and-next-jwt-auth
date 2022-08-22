import { FC, ReactNode, useMemo } from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'
import styled from 'styled-components'

import Container from 'components/Container/Container'

const ContainerStyle = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const LinkStyle = styled.a`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 600;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }
`

export interface AuthWrapperTypes {
  title: string
  children: ReactNode
  type: 'signin' | 'signup'
}

const AuthWrapper: FC<AuthWrapperTypes> = ({ title, children, type }) => {
  const isSigIn = useMemo(() => type === 'signin', [type])
  return (
    <ContainerStyle>
      <Box display="grid" width="100%" maxWidth="440px" gridGap="8px">
        <Heading as="h1" size="xl" textAlign="center">
          {title}
        </Heading>
        {children}
        <Text fontSize="14px" textAlign="center">
          {isSigIn ? 'Don’t have an account?' : 'Have an account?'}{' '}
          <Link href={isSigIn ? '/sign-up' : '/sign-in'}>
            <LinkStyle href={isSigIn ? '/sign-up' : '/sign-in'}>
              {isSigIn ? 'Create one!' : 'Sign In'}
            </LinkStyle>
          </Link>
        </Text>
      </Box>
    </ContainerStyle>
  )
}

export default AuthWrapper
