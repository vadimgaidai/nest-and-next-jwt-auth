import { createSlice } from '@reduxjs/toolkit'
import { signIn } from './actions'
import { AuthStateTypes } from './types'

const initialState: AuthStateTypes = {
  accessToken: null,
  refreshToken: null,
  expiresIn: null,
}

const { reducer } = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.accessToken = payload.access_token
      state.refreshToken = payload.refresh_token
      state.expiresIn = payload.expires_in
    })
  },
})

export default reducer
