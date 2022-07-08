import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import authReducer from './auth/slice'

/**
 * @see https://github.com/reduxjs/redux-toolkit/issues/1566
 */
const store: any = configureStore({
  reducer: { auth: authReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: true,
      thunk: true,
    }),
  devTools: process.env.NODE_ENV !== 'production',
})

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch()
export type RootState = ReturnType<typeof store.getState>

export default store
