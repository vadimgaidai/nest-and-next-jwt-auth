import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
import { AuthStateTypes } from './types'

const initialState: AuthStateTypes = {
  isLogin: false,
}

export const { actions, reducer } = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
})

// export const {  } = actions

export default reducer
