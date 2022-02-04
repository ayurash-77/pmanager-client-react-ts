import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IQuarterFilter, quartersFilter } from '../../tools/quarter-filter'
import { IProject } from '../../interfaces/IProject'

interface IInitialState {
  quarterFilterActive: boolean
  quarterData: IQuarterFilter[] | null
  quarterFilter: string | null
}

const initialState: IInitialState = {
  quarterFilterActive: false,
  quarterData: [],
  quarterFilter: null,
}

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setFiler(state, action: PayloadAction<boolean>) {
      state.quarterFilterActive = action.payload
    },
    setQuarterData(state, action: PayloadAction<IProject[]>) {
      state.quarterData = quartersFilter(action.payload)
      state.quarterFilter = state.quarterData[0].quarter
    },
    setQuarterFilter(state, action: PayloadAction<string>) {
      state.quarterFilter = action.payload
    },
  },
})

export const { setQuarterFilter, setQuarterData, setFiler } = projectsSlice.actions
export default projectsSlice.reducer
