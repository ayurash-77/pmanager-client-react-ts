import { CombinedState, combineReducers, configureStore } from '@reduxjs/toolkit'
import { jobsApi } from '../services/jobsApi'
import { usersApi } from '../services/usersApi'
import { authApi } from '../services/authApi'
import userReducer from './reducers/UserSlice'

const rootReducer = combineReducers({
  userReducer,
  [jobsApi.reducerPath]: jobsApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
})

export const setupStore: CombinedState<any> = () => {
  return configureStore({
    reducer: rootReducer,
    // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof setupStore.dispatch
