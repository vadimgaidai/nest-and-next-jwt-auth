/* eslint-disable import/named */
/* eslint-disable import/no-self-import */
import axiosLib, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'

const instance: AxiosInstance = axiosLib.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/`,
})

export const instanceJWT: AxiosInstance = axiosLib.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/`,
})

const responseFulfilled = (response: AxiosResponse) => response?.data

const responseRejected = (error: AxiosError) => {
  if (!error?.response) {
    return Promise.reject()
  }
  return Promise.reject(error.response)
}

instance.interceptors.response.use(responseFulfilled, responseRejected)

const axios: AxiosInstance = instance

export default axios
