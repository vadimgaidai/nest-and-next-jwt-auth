import { RootState } from '../store'
import { AuthStateTypes } from './types'

export const selectAuthState = (state: RootState): AuthStateTypes => state.auth

export const authLoading = (state: RootState): boolean => selectAuthState(state).loading

export const isTokens = (state: RootState): boolean =>
  !!selectAuthState(state).accessToken &&
  !!selectAuthState(state).refreshToken &&
  !!selectAuthState(state).expiresIn
