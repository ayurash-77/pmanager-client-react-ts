import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IShot } from '../../interfaces/IShot'
import { IReel } from '../../interfaces/IReel'

interface IInitialState {
  activeProjectId: number | null
  activeReelsTypeId: number | null
  activeReelId: number | null
  activeReelsIds: number[]
  activeShotId: number | null
  dragShot: IShot | null
  dropReel: IReel | null
}

const initialState: IInitialState = {
  activeProjectId: null,
  activeReelsTypeId: null,
  activeReelId: null,
  activeReelsIds: [],
  activeShotId: null,
  dragShot: null,
  dropReel: null,
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
    setDragShot(state, action: PayloadAction<IShot | null>) {
      state.dragShot = action.payload
    },
    setDropReel(state, action: PayloadAction<IReel | null>) {
      state.dropReel = action.payload
    },
  },
})

export const {
  setActiveProjectId,
  setActiveReelsTypeId,
  setActiveReelId,
  setActiveReelsIds,
  setActiveShotId,
  setDragShot,
  setDropReel,
} = entitiesSlice.actions
export default entitiesSlice.reducer
