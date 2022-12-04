import { createSlice } from '@reduxjs/toolkit'
import { getRefreshToken, signIn, signUp } from './actions'
import { AuthStateTypes } from './types'

const initialState: AuthStateTypes = {
  loading: false,
}

const { reducer, actions } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout() {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('expiresIn')
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.loading = true
    })
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      localStorage.setItem('accessToken', payload?.access_token)
      localStorage.setItem('refreshToken', payload?.refresh_token)
      localStorage.setItem('expiresIn', String(payload?.expires_in))
      state.loading = false
    })
    builder.addCase(signIn.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(signUp.pending, (state) => {
      state.loading = true
    })
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      localStorage.setItem('accessToken', payload?.access_token)
      localStorage.setItem('refreshToken', payload?.refresh_token)
      localStorage.setItem('expiresIn', String(payload?.expires_in))
      state.loading = false
    })
    builder.addCase(signUp.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(getRefreshToken.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getRefreshToken.fulfilled, (state, { payload }) => {
      localStorage.setItem('accessToken', payload?.access_token)
      localStorage.setItem('refreshToken', payload?.refresh_token)
      localStorage.setItem('expiresIn', String(payload?.expires_in))
      state.loading = false
    })
    builder.addCase(getRefreshToken.rejected, (state) => {
      state.loading = false
    })
  },
})

export const { logout } = actions
export default reducer
