import { UserTypes } from 'state/users/types'
import { axiosJWT, axios } from 'plugins/axios'

export const UserApi = {
  async getMe(): Promise<UserTypes> {
    const response: UserTypes = await axiosJWT.get('users/me')
    return response
  },
  async users(): Promise<UserTypes[]> {
    const response: UserTypes[] = await axios.get('users')
    return response
  },
}
