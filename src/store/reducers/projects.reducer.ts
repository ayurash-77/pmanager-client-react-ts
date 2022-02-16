import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IQuarterItem, quartersFilter } from '../../tools/quarter-filter'
import { IProject } from '../../interfaces/IProject'

interface IQuarterFilter {
  isActive: boolean
  quarter: string
}

interface IInitialState {
  quarterData: IQuarterItem[] | null
  quarterFilter: IQuarterFilter
  selectedId: number | null
}

const initialState: IInitialState = {
  quarterData: [],
  quarterFilter: { isActive: false, quarter: null },
  selectedId: null,
}

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setQuarterData(state, action: PayloadAction<IProject[]>) {
      state.quarterData = quartersFilter(action.payload)
      state.quarterFilter.quarter = state.quarterData[0].quarter
    },
    setQuarterFilter(state, action: PayloadAction<IQuarterFilter>) {
      state.quarterFilter = action.payload
    },
    setSelectedId(state, action: PayloadAction<number>) {
      state.selectedId = action.payload
    },
  },
})

export const { setQuarterFilter, setQuarterData, setSelectedId } = projectsSlice.actions
export default projectsSlice.reducer
