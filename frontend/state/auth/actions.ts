import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthApi } from 'api/auth'
import { SignInTypes } from './types'

export const signIn = createAsyncThunk('auth/signIn', async (data: SignInTypes) => {
  try {
    const payload = await AuthApi.signIn(data)
    return payload
  } catch {
    throw Error('Sign in error')
  }
})
