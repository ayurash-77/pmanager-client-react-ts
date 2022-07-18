import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IProject } from '../../interfaces/IProject'
import { IQuarterItem, quartersFilter } from '../../utils/quarter-filter'

interface IQuarterFilter {
  isActive: boolean
  quarter: string
}

interface IInitialState {
  quarterData: IQuarterItem[] | null
  quarterFilter: IQuarterFilter
}

const initialState: IInitialState = {
  quarterData: [],
  quarterFilter: { isActive: false, quarter: null },
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
  },
})

export const { setQuarterFilter, setQuarterData } = projectsSlice.actions
export default projectsSlice.reducer
