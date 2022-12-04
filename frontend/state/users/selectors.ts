import { RootState } from '../store'
import { UsersStateTypes, UserTypes } from './types'

export const selectUsersState = (state: RootState): UsersStateTypes => state.users

export const usersLoading = (state: RootState): boolean => selectUsersState(state).loading

export const selectUser = (state: RootState): UserTypes | null => selectUsersState(state).user

export const selectUsers = (state: RootState): UserTypes[] | [] => selectUsersState(state).users
