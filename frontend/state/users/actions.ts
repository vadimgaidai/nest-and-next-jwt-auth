import { UserApi } from 'api/user'
import { AppThunk } from 'state/store'
import { UserTypes } from './types'
import { setUser, setUsers } from './slice'

// export const getMeAction = async (ctx?: Context) => {
//   try {
//     const payload: UserTypes = await UserApi(ctx).getMe(Cookies.get(ctx).access_token)
//     return payload
//   } catch {
//     throw Error('Get Me error')
//   }
// }

export const getUsers = (): AppThunk => async (dispatch) => {
  try {
    const payload: UserTypes[] = await UserApi.users()
    dispatch(setUsers(payload))
  } catch (error) {
    throw Error('Get users error')
  }
}

export const getMeAction = (): AppThunk => async (dispatch) => {
  try {
    const payload: UserTypes = await UserApi.getMe()
    dispatch(setUser(payload))
  } catch {
    throw Error('Get me error')
  }
}
