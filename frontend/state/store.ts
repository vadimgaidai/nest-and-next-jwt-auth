/* eslint-disable no-underscore-dangle */
import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createWrapper } from 'next-redux-wrapper'

import authReducer from './auth/slice'
import usersReducer from './users/slice'

const PERSISTED_KEYS: string[] = []

const persistConfig = {
  key: 'primary',
  whitelist: PERSISTED_KEYS,
  storage,
  version: 0,
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({ auth: authReducer, users: usersReducer })
)

const makeStore = (preloadedState?: any) =>
  configureStore({
    reducer: persistedReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: true,
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
        thunk: true,
      }),
    devTools: process.env.NODE_ENV !== 'production',
  })

// eslint-disable-next-line import/no-mutable-exports
let store: ReturnType<typeof makeStore> | undefined

export const initializeStore = (preloadedState: any = undefined) => {
  let _store = store ?? makeStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store

  // Create the store once in the client
  if (!store) {
    store = _store
  }

  return _store
}

store = initializeStore()

export type RootStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<RootStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)

export const wrapper = createWrapper<RootStore>(initializeStore, {
  debug: process.env.NODE_ENV !== 'production',
})

export default store
