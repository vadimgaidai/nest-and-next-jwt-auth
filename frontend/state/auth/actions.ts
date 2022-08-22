import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthApi } from 'api/auth'
import { SignInTypes, SignUpTypes } from './types'

export const signIn = createAsyncThunk('auth/signIn', async (data: SignInTypes) => {
  try {
    const payload = await AuthApi().signIn(data)
    return payload
  } catch {
    throw Error('Sign in error')
  }
})

export const signUp = createAsyncThunk('auth/signUp', async (data: SignUpTypes) => {
  try {
    const payload = await AuthApi().signUp(data)
    return payload
  } catch {
    throw Error('Sign up error')
  }
})
