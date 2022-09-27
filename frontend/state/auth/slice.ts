import { createSlice } from '@reduxjs/toolkit'
import { getRefreshToken, signIn, signUp } from './actions'
import { AuthStateTypes } from './types'

const initialState: AuthStateTypes = {
  accessToken: null,
  refreshToken: null,
  expiresIn: null,
  loading: false,
}

const { reducer, actions } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.accessToken = null
      state.refreshToken = null
      state.expiresIn = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.loading = true
    })
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.accessToken = payload.access_token
      state.refreshToken = payload.refresh_token
      state.expiresIn = payload.expires_in
      state.loading = false
    })
    builder.addCase(signIn.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(signUp.pending, (state) => {
      state.loading = true
    })
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      state.accessToken = payload.access_token
      state.refreshToken = payload.refresh_token
      state.expiresIn = payload.expires_in
      state.loading = false
    })
    builder.addCase(signUp.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(getRefreshToken.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getRefreshToken.fulfilled, (state, { payload }) => {
      state.accessToken = payload.access_token
      state.refreshToken = payload.refresh_token
      state.expiresIn = payload.expires_in
      state.loading = false
    })
    builder.addCase(getRefreshToken.rejected, (state) => {
      state.loading = false
    })
  },
})

export const { logout } = actions
export default reducer
