import { CombinedState, combineReducers, configureStore } from '@reduxjs/toolkit'
import { jobsApi } from '../services/jobService'

const rootReducer = combineReducers({
  [jobsApi.reducerPath]: jobsApi.reducer,
})

export const setupStore: CombinedState<any> = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(jobsApi.middleware),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
