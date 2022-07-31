import { RootState } from '../store'
import { AuthStateTypes } from './types'

export const selectAuthState = (state: RootState): AuthStateTypes => state.auth

export const isAuth = (state: RootState): boolean =>
  !!(
    selectAuthState(state).accessToken &&
    selectAuthState(state).refreshToken &&
    selectAuthState(state).expiresIn
  )
