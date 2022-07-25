import { useDispatch } from 'react-redux'
import { AppDispatch } from './store'

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export const useAppDispatch = () => useDispatch<AppDispatch>()
