import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import authReducer from './auth/slice'

const makeStore = () =>
  configureStore({
    reducer: { auth: authReducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: true,
        serializableCheck: true,
        thunk: true,
      }),
    devTools: process.env.NODE_ENV !== 'production',
  })

const store = makeStore()

export type RootStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const wrapper = createWrapper<RootStore>(makeStore, {
  debug: process.env.NODE_ENV !== 'production',
})

export default store
