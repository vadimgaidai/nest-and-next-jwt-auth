import { createSlice } from '@reduxjs/toolkit'
import { setCookieData, resetCookieData } from 'services/cookie'
import { signIn, signUp } from './actions'
import { AuthStateTypes } from './types'

const initialState: AuthStateTypes = {}

const { reducer, actions } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout() {
      resetCookieData()
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      setCookieData(payload)
    })
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      setCookieData(payload)
    })
  },
})

export const { logout } = actions
export default reducer
