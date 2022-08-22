import { createSlice } from '@reduxjs/toolkit'
import { parseCookies } from 'nookies'
import { setCookieData, resetCookieData } from 'services/cookie'
import { signIn, signUp } from './actions'
import { AuthStateTypes } from './types'

const initialState: AuthStateTypes = {
  isAuth: !!parseCookies(),
  loading: false,
}

const { reducer, actions } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuth = false
      resetCookieData()
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.loading = true
    })
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      setCookieData(payload)
      state.loading = false
      state.isAuth = true
    })
    builder.addCase(signUp.pending, (state) => {
      state.loading = true
    })
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      setCookieData(payload)
      state.loading = false
      state.isAuth = true
    })
  },
})

export const { logout } = actions
export default reducer
