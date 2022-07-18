import { CombinedState, combineReducers, configureStore } from '@reduxjs/toolkit'
import { authApi } from './api/auth.api'
import { baseApi } from './api/base.api'
import { entitiesSlice } from './reducers/entities.reducer'
import { projectsSlice } from './reducers/projects.reducer'
import { uiSlice } from './reducers/ui.reducer'
import { userSlice } from './reducers/user.reducer'

const rootReducer = combineReducers({
  ui: uiSlice.reducer,
  auth: userSlice.reducer,
  projects: projectsSlice.reducer,
  entities: entitiesSlice.reducer,

  [baseApi.reducerPath]: baseApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
})

export const setupStore: CombinedState<any> = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(baseApi.middleware).concat(authApi.middleware),
  })
}

export type RootState = ReturnType<typeof rootReducer>
// export type RootState = ReturnType<typeof setupStore.getState>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof setupStore.dispatch
