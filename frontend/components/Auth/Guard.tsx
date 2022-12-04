/* eslint-disable react/jsx-no-useless-fragment */
import { FC, ReactElement, useMemo, useEffect } from 'react'
import { useRouter } from 'next/router'
import { CircularProgress } from '@chakra-ui/react'
import styled from 'styled-components'

import { useAppDispatch, useAppSelector } from 'state/hooks'
import { getMe } from 'state/users/actions'

import { Container } from 'components/Container'
import { isTokens } from 'state/auth/selectors'
import { selectUser } from 'state/users/selectors'

export interface AuthGuardTypes {
  children: ReactElement
}

const ContainerStyle = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const AuthGuard: FC<AuthGuardTypes> = ({ children }) => {
  const router = useRouter()

  const dispatch = useAppDispatch()

  const isAuth = useAppSelector(isTokens)
  const user = useAppSelector(selectUser)

  const isGuardPages = useMemo(
    () => router.pathname.split('/').some((item) => ['dashboard'].includes(item.toLowerCase())),
    [router.pathname]
  )

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(getMe())
    }

    if (!isAuth && isGuardPages) {
      router.push('/sign-in')
    }

    if (isAuth && !user) {
      fetchUser()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname, isGuardPages, isAuth])

  if (!isAuth && isGuardPages) {
    return (
      <ContainerStyle as="main">
        <CircularProgress isIndeterminate color="secondary" size={30} />
      </ContainerStyle>
    )
  }

  return <>{children}</>
}

export default AuthGuard
