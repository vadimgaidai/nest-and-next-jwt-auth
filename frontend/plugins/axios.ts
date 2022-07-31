import axiosLib, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const instance = axiosLib.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/`,
})

const instanceJWT = axiosLib.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/`,
})

const authErrorStatusCode = 401

const responseFulfilled = (response: AxiosResponse) => response?.data

function responseRejected(error: AxiosError) {
  if (!error?.response) {
    return Promise.reject()
  }
  return Promise.reject(error.response)
}

async function requestFulfilledJWT(config: AxiosRequestConfig) {
  // if (isLoggedIn) {
  //   config.headers.Authorization = `Bearer `
  // }

  return config
}

async function responseRejectedJWT(error: AxiosError) {
  if (!error?.response) {
    return Promise.reject()
  }

  // !isLoggedIn
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
