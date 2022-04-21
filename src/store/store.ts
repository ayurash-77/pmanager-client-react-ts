import { CombinedState, combineReducers, configureStore } from '@reduxjs/toolkit'
import { authApi } from './api/auth.api'
import { jobsApi } from './api/jobs.api'
import { projectsApi } from './api/projects.api'
import { userSlice } from './reducers/user.reducer'
import { projectsSlice } from './reducers/projects.reducer'
import { briefsApi } from './api/briefs.api'
import { uiSlice } from './reducers/ui.reducer'
import { brandsApi } from './api/brands.api'
import { clientsApi } from './api/clients.api'
import { agenciesApi } from './api/agencies.api'
import { rolesApi } from './api/roles.api'
import { tagsApi } from './api/tags.api'
import { postsApi } from './api/posts.api'
import { reelsTypesApi } from './api/reelsTypes.api'
import { reelsApi } from './api/reels.api'
import { shotsApi } from './api/shots.api'
import { entitiesSlice } from './reducers/entities.reducer'
import { usersApi } from './api/users.api'

const rootReducer = combineReducers({
  ui: uiSlice.reducer,
  auth: userSlice.reducer,
  projects: projectsSlice.reducer,
  entities: entitiesSlice.reducer,

  [authApi.reducerPath]: authApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [projectsApi.reducerPath]: projectsApi.reducer,
  [briefsApi.reducerPath]: briefsApi.reducer,
  [brandsApi.reducerPath]: brandsApi.reducer,
  [clientsApi.reducerPath]: clientsApi.reducer,
  [agenciesApi.reducerPath]: agenciesApi.reducer,
  [jobsApi.reducerPath]: jobsApi.reducer,
  [rolesApi.reducerPath]: rolesApi.reducer,
  [tagsApi.reducerPath]: tagsApi.reducer,
  [postsApi.reducerPath]: postsApi.reducer,
  [reelsTypesApi.reducerPath]: reelsTypesApi.reducer,
  [reelsApi.reducerPath]: reelsApi.reducer,
  [shotsApi.reducerPath]: shotsApi.reducer,
})

export const setupStore: CombinedState<any> = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(usersApi.middleware)
        .concat(projectsApi.middleware)
        .concat(briefsApi.middleware)
        .concat(brandsApi.middleware)
        .concat(clientsApi.middleware)
        .concat(agenciesApi.middleware)
        .concat(jobsApi.middleware)
        .concat(rolesApi.middleware)
        .concat(tagsApi.middleware)
        .concat(postsApi.middleware)
        .concat(reelsTypesApi.middleware)
        .concat(shotsApi.middleware)
        .concat(reelsApi.middleware),
  })
}

export type RootState = ReturnType<typeof rootReducer>
// export type RootState = ReturnType<typeof setupStore.getState>

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof setupStore.dispatch
