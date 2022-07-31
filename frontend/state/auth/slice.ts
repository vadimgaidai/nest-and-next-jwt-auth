import { createSlice } from '@reduxjs/toolkit'
import { refreshTokens, signIn, signUp } from './actions'
import { AuthStateTypes } from './types'

const initialState: AuthStateTypes = {
  accessToken: null,
  refreshToken: null,
  expiresIn: null,
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
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.accessToken = payload.access_token
      state.refreshToken = payload.refresh_token
      state.expiresIn = payload.expires_in
    })
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      state.accessToken = payload.access_token
      state.refreshToken = payload.refresh_token
      state.expiresIn = payload.expires_in
    })
    builder.addCase(refreshTokens.fulfilled, (state, { payload }) => {
      state.accessToken = payload.access_token
      state.refreshToken = payload.refresh_token
      state.expiresIn = payload.expires_in
    })
  },
})

export const { logout } = actions
export default reducer
