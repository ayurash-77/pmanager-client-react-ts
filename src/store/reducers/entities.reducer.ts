import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IInitialState {
  activeReelsTypeId: number | null
  activeReelId: number | null
  activeShotId: number | null
}

const initialState: IInitialState = {
  activeReelsTypeId: null,
  activeReelId: null,
  activeShotId: null,
}

export const entitiesSlice = createSlice({
  name: 'entities',
  initialState,
  reducers: {
    setActiveReelsTypeId(state, action: PayloadAction<number | null>) {
      state.activeReelsTypeId = action.payload
    },
    setActiveReelId(state, action: PayloadAction<number | null>) {
      state.activeReelId = action.payload
    },
    setActiveShotId(state, action: PayloadAction<number | null>) {
      state.activeShotId = action.payload
    },
  },
})

export const { setActiveReelsTypeId, setActiveReelId, setActiveShotId } = entitiesSlice.actions
export default entitiesSlice.reducer
