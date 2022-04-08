import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProjectViewFilter } from '../../interfaces/IProjectViewFilter'

interface IFilterbarFilters {
  grid: IProjectViewFilter
  list: IProjectViewFilter
}

export interface IFilterbar {
  show: boolean
  filters: IFilterbarFilters
}

export interface ISidebar {
  show: boolean
}

export interface IMenubar {
  expanded: boolean
}

export type IProjectsViewMode = 'grid' | 'list'

export interface IInitialState {
  theme: { darkMode: boolean }
  projectsViewMode: IProjectsViewMode
  filterBar: IFilterbar
  sidebar: ISidebar
  menubar: IMenubar
}

const themeInLocalStorage = localStorage.getItem('darkMode')
const projectsViewModeInLocalStorage = localStorage.getItem('projectsViewMode')
const filterBarInLocalStorage = localStorage.getItem('filterBar')
const sidebarInLocalStorage = localStorage.getItem('sidebar')
const menubarInLocalStorage = localStorage.getItem('menubar')

const filterBarInit = {
  show: false,
  filters: {
    grid: {
      brand: true,
      client: true,
      agency: true,
      createdAt: false,
      startAt: true,
      deadline: true,
      status: true,
      owner: true,
    },
    list: {
      brand: true,
      client: false,
      agency: true,
      createdAt: false,
      startAt: true,
      deadline: true,
      status: true,
      owner: true,
      progress: true,
      details: false,
    },
  },
}

const sidebarInit: ISidebar = { show: true }
const menubarInit: IMenubar = { expanded: true }

const initialState: IInitialState = {
  theme: { darkMode: themeInLocalStorage ? JSON.parse(themeInLocalStorage) : true },
  projectsViewMode: projectsViewModeInLocalStorage ? JSON.parse(projectsViewModeInLocalStorage) : 'grid',
  filterBar: filterBarInLocalStorage ? JSON.parse(filterBarInLocalStorage) : filterBarInit,
  sidebar: sidebarInLocalStorage ? JSON.parse(sidebarInLocalStorage) : sidebarInit,
  menubar: menubarInLocalStorage ? JSON.parse(menubarInLocalStorage) : menubarInit,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setThemeMode(state, action: PayloadAction<boolean>) {
      state.theme.darkMode = action.payload
      document.body.setAttribute('darkMode', action.payload.toString())
      localStorage.setItem('darkMode', JSON.stringify(action.payload))
    },
    setProjectsViewMode(state, action: PayloadAction<IProjectsViewMode>) {
      state.projectsViewMode = action.payload
      localStorage.setItem('projectsViewMode', JSON.stringify(state.projectsViewMode))
    },
    setFilterbarShow(state, action: PayloadAction<boolean>) {
      state.filterBar.show = action.payload
      localStorage.setItem('filterBar', JSON.stringify(state.filterBar))
    },
    setFilterbarFilters(state, action: PayloadAction<IFilterbarFilters>) {
      state.filterBar.filters = action.payload
      localStorage.setItem('filterBar', JSON.stringify(state.filterBar))
    },
    setSidebarShow(state, action: PayloadAction<boolean>) {
      state.sidebar.show = action.payload
      localStorage.setItem('sidebar', JSON.stringify(state.sidebar))
    },
    setMenubarExpanded(state, action: PayloadAction<boolean>) {
      state.menubar.expanded = action.payload
      localStorage.setItem('menubar', JSON.stringify(state.menubar))
    },
  },
})

export const {
  setThemeMode,
  setProjectsViewMode,
  setFilterbarShow,
  setFilterbarFilters,
  setSidebarShow,
  setMenubarExpanded,
} = uiSlice.actions
export default uiSlice.reducer
