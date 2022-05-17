import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IShot } from '../../interfaces/IShot'
import { IReel } from '../../interfaces/IReel'

interface IInitialState {
  activeProjectId: number | null
  activeReelsTypeId: number | null
  activeReelId: number | null
  activeReelsIds: number[]
  activeShotId: number | null
  dragShotId: number | null
  dropReelId: number | null
}

const initialState: IInitialState = {
  activeProjectId: null,
  activeReelsTypeId: null,
  activeReelId: null,
  activeReelsIds: [],
  activeShotId: null,
  dragShotId: null,
  dropReelId: null,
}

export const entitiesSlice = createSlice({
  name: 'entities',
  initialState,
  reducers: {
    setActiveProjectId(state, action: PayloadAction<number>) {
      state.activeProjectId = action.payload
    },
    setActiveReelsTypeId(state, action: PayloadAction<number | null>) {
      state.activeReelsTypeId = action.payload
    },
    setActiveReelId(state, action: PayloadAction<number | null>) {
      state.activeReelId = action.payload
    },
    setActiveReelsIds(state, action: PayloadAction<number[]>) {
      state.activeReelsIds = action.payload
    },
    setActiveShotId(state, action: PayloadAction<number | null>) {
      state.activeShotId = action.payload
    },
    setDragShotId(state, action: PayloadAction<number | null>) {
      state.dragShotId = action.payload
    },
    setDropReelId(state, action: PayloadAction<number | null>) {
      state.dropReelId = action.payload
    },
  },
})

export const {
  setActiveProjectId,
  setActiveReelsTypeId,
  setActiveReelId,
  setActiveReelsIds,
  setActiveShotId,
  setDragShotId,
  setDropReelId,
} = entitiesSlice.actions
export default entitiesSlice.reducer
