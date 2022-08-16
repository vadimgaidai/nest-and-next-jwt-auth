import { RootState } from '../store'
import { AuthStateTypes } from './types'

export const selectAuthState = (state: RootState): AuthStateTypes => state.auth
