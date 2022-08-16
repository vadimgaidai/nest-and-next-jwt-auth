import Cookies, { parseCookies } from 'nookies'
import { AxiosInstance } from 'axios'
import { GetServerSidePropsContext, NextPageContext } from 'next/types'

import { instanceJWT } from 'plugins/axios'
import { AuthApi } from 'api/auth'
import { TokensTypes } from 'state/auth/types'
import { CookieTypes, resetCookieData, setCookieData } from './cookie'

const authErrorStatusCode = 401

const refreshToken = async (cookies: CookieTypes): Promise<TokensTypes | null> => {
  try {
    const response = await AuthApi.refreshTokens(cookies?.refresh_token)

    if (!response?.access_token) {
      resetCookieData()
    }
    setCookieData(response)
    return response
  } catch (error) {
    resetCookieData()
    return null
  }
}

const fetcherJWT = (ctx?: NextPageContext | GetServerSidePropsContext): AxiosInstance => {
  const cookies = ctx ? Cookies.get(ctx) : parseCookies()

  instanceJWT.interceptors.request.use(
    async (config) => {
      if (cookies?.access_token) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${cookies?.access_token}`,
        }
      }

      return config
    },
    (error) => Promise.reject(error)
  )

  instanceJWT.interceptors.response.use(
    (response) => response,
    async (error) => {
      const config = error?.config

      if (error?.response?.status === authErrorStatusCode && !config?.sent) {
        config.sent = true

        const response = await refreshToken(cookies)

        if (response?.access_token) {
          config.headers = {
            ...config.headers,
            authorization: `Bearer ${response?.access_token}`,
          }
        }

        return instanceJWT(config)
      }
      return Promise.reject(error)
    }
  )

  return instanceJWT
}

export default fetcherJWT
