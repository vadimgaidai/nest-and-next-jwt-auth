import { UserApi } from 'api/user'
import { AppThunk } from 'state/store'
import { UserTypes } from './types'
import { setUser, setUsers } from './slice'

export const loadUsers = (): AppThunk => async (dispatch) => {
  try {
    const payload: UserTypes[] = await UserApi.users()
    dispatch(setUsers(payload))
  } catch (error) {
    throw Error('Get users error')
  }
}

export const getMe = (): AppThunk => async (dispatch) => {
  try {
    const payload: UserTypes = await UserApi.getMe()
    dispatch(setUser(payload))
  } catch {
    throw Error('Get me error')
  }
}
