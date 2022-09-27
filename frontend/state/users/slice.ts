import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { UsersStateTypes, UserTypes } from './types'

const initialState: UsersStateTypes = {
  user: null,
  users: [],
  loading: false,
}

const { reducer, actions } = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading(state, { payload }: PayloadAction<boolean>) {
      state.loading = payload
    },
    setUser(state, { payload }: PayloadAction<UserTypes | null>) {
      state.user = payload
    },
    setUsers(state, { payload }: PayloadAction<UserTypes[] | []>) {
      state.users = payload
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.users,
    }),
  },
})

export const { setUser, setUsers } = actions
export default reducer
