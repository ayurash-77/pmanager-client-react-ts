import { CombinedState, combineReducers, configureStore } from '@reduxjs/toolkit'
import { authApi } from './api/auth.api'
import { jobsApi } from './api/jobs.api'
import { projectsApi } from './api/projects.api'
import { userSlice } from './reducers/user.reducer'
import { projectsSlice } from './reducers/projects.reducer'

const rootReducer = combineReducers({
  auth: userSlice.reducer,
  projects: projectsSlice.reducer,

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
