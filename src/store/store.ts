import { CombinedState, combineReducers, configureStore } from '@reduxjs/toolkit'
import { authApi } from '../services/authApi'
import { jobsApi } from '../services/jobsApi'
import { projectsApi } from '../services/projectsApi'
import userReducer from './userSlice'

const rootReducer = combineReducers({
  auth: userReducer,
  [authApi.reducerPath]: authApi.reducer,
  [projectsApi.reducerPath]: projectsApi.reducer,
  [jobsApi.reducerPath]: jobsApi.reducer,
})

export const setupStore: CombinedState<any> = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(projectsApi.middleware)
        .concat(jobsApi.middleware),
  })
}

export type RootState = ReturnType<typeof rootReducer>
// export type RootState = ReturnType<typeof setupStore.getState>

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof setupStore.dispatch
