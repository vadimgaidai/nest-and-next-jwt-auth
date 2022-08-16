import { destroyCookie, setCookie } from 'nookies'
import { TokensTypes } from 'state/auth/types'

export interface CookieTypes {
  [key: string]: string
}

export const setCookieData = ({
  access_token: accessToken,
  refresh_token: refreshToken,
  expires_in: expiresTn,
}: TokensTypes) => {
  setCookie(null, 'access_token', accessToken, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  })
  setCookie(null, 'refresh_token', refreshToken, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  })
  setCookie(null, 'expires_in', String(expiresTn), {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  })
}

export const resetCookieData = () => {
  destroyCookie(null, 'access_token')
  destroyCookie(null, 'refresh_token')
  destroyCookie(null, 'expires_in')
}
