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

export interface IReelsBlock {
  expanded: boolean
}

export interface IRibbonReelsTypes {
  expanded: boolean
}

export interface IRibbonReels {
  expanded: boolean
}

type activeMenuType =
  | 'projects'
  | 'overview'
  | 'reelsTypes'
  | 'reels'
  | 'shots'
  | 'tasks'
  | 'graph'
  | 'stuff'
  | 'team'

export interface IMenubar {
  expanded: boolean
  activeMenu: activeMenuType
}

export type IProjectsViewMode = 'grid' | 'list'

export interface IInitialState {
  theme: { darkMode: boolean }
  projectsViewMode: IProjectsViewMode
  filterBar: IFilterbar
  menubar: IMenubar
  sidebar: ISidebar
  reelsBlock: IReelsBlock
  ribbonReels: IRibbonReels
  ribbonReelsTypes: IRibbonReelsTypes
  searchProjectsFilter?: string
}

const themeInLocalStorage = localStorage.getItem('darkMode')
const projectsViewModeInLocalStorage = localStorage.getItem('projectsViewMode')
const filterBarInLocalStorage = localStorage.getItem('filterBar')
const menubarInLocalStorage = localStorage.getItem('menubar')
const sidebarInLocalStorage = localStorage.getItem('sidebar')
const reelsBlockInLocalStorage = localStorage.getItem('reelsBlock')
const ribbonReelsInLocalStorage = localStorage.getItem('ribbonReels')
const ribbonReelsTypesInLocalStorage = localStorage.getItem('ribbonReelsTypes')

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

const menubarInit: IMenubar = { expanded: true, activeMenu: 'projects' }
const sidebarInit: ISidebar = { show: true }
const reelsBlockInit: IReelsBlock = { expanded: false }
const ribbonReelsInit: IRibbonReels = { expanded: false }
const ribbonReelsTypesInit: IRibbonReelsTypes = { expanded: false }

const initialState: IInitialState = {
  theme: { darkMode: themeInLocalStorage ? JSON.parse(themeInLocalStorage) : true },
  projectsViewMode: projectsViewModeInLocalStorage ? JSON.parse(projectsViewModeInLocalStorage) : 'grid',
  filterBar: filterBarInLocalStorage ? JSON.parse(filterBarInLocalStorage) : filterBarInit,
  sidebar: sidebarInLocalStorage ? JSON.parse(sidebarInLocalStorage) : sidebarInit,
  menubar: menubarInLocalStorage ? JSON.parse(menubarInLocalStorage) : menubarInit,
  reelsBlock: reelsBlockInLocalStorage ? JSON.parse(reelsBlockInLocalStorage) : reelsBlockInit,
  ribbonReels: ribbonReelsInLocalStorage ? JSON.parse(ribbonReelsInLocalStorage) : ribbonReelsInit,
  ribbonReelsTypes: ribbonReelsTypesInLocalStorage
    ? JSON.parse(ribbonReelsTypesInLocalStorage)
    : ribbonReelsTypesInit,
  searchProjectsFilter: null,
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
    setReelsBlockExpanded(state, action: PayloadAction<boolean>) {
      state.reelsBlock.expanded = action.payload
      localStorage.setItem('reelsBlock', JSON.stringify(state.reelsBlock))
    },
    setRibbonReelsExpanded(state, action: PayloadAction<boolean>) {
      state.ribbonReels.expanded = action.payload
      localStorage.setItem('ribbonReels', JSON.stringify(state.ribbonReels))
    },
    setRibbonReelsTypesExpanded(state, action: PayloadAction<boolean>) {
      state.ribbonReelsTypes.expanded = action.payload
      localStorage.setItem('ribbonReelsTypes', JSON.stringify(state.ribbonReelsTypes))
    },
    setActiveMenu(state, action: PayloadAction<activeMenuType>) {
      state.menubar.activeMenu = action.payload
      localStorage.setItem('menubar', JSON.stringify(state.menubar))
    },
    setSearchProjectsFilter(state, action: PayloadAction<string>) {
      state.searchProjectsFilter = action.payload
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
  setActiveMenu,
  setSearchProjectsFilter,
  setReelsBlockExpanded,
  setRibbonReelsExpanded,
  setRibbonReelsTypesExpanded,
} = uiSlice.actions
export default uiSlice.reducer
