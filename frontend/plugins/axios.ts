/* eslint-disable import/named */
/* eslint-disable import/no-self-import */
import axiosLib, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'
import { getRefreshToken } from 'state/auth/actions'

import store from 'state/store'

const instance = axiosLib.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/`,
})

const instanceJWT = axiosLib.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/`,
})

const authErrorStatusCode = 401

const responseFulfilled = (response: AxiosResponse) => response?.data

function responseRejected(error: AxiosError) {
  if (!error || !error.response) {
    return Promise.reject()
  }
  return Promise.reject(error.response)
}

async function requestFulfilledJWT(config: AxiosRequestConfig) {
  let accessToken = localStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken')
  const expiredIn = localStorage.getItem('expiresIn')
  const isExpired = !expiredIn || +expiredIn < Date.now() / 1000

  if (isExpired && refreshToken) {
    await store?.dispatch(getRefreshToken(refreshToken))
    accessToken = localStorage.getItem('accessToken')
  }

  if (accessToken && config?.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
}

async function responseRejectedJWT(error: AxiosError) {
  if (!error || !error.response) {
    return Promise.reject()
  }

  if (error.response.status === authErrorStatusCode) {
    return instanceJWT(error.config)
  }
  return Promise.reject(error.response)
}

instance.interceptors.response.use(responseFulfilled, responseRejected)

instanceJWT.interceptors.request.use(requestFulfilledJWT)
instanceJWT.interceptors.response.use(responseFulfilled, responseRejectedJWT)

export const axios: AxiosInstance = instance
export const axiosJWT: AxiosInstance = instanceJWT
