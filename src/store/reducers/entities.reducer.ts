import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IShot } from '../../interfaces/IShot'
import { IReel } from '../../interfaces/IReel'

interface IInitialState {
  activeReelsTypeId: number | null
  activeReelId: number | null
  activeShotId: number | null
  dragShot: IShot | null
  dropReel: IReel | null
}

const initialState: IInitialState = {
  activeReelsTypeId: null,
  activeReelId: null,
  activeShotId: null,
  dragShot: null,
  dropReel: null,
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
    setDragShot(state, action: PayloadAction<IShot | null>) {
      state.dragShot = action.payload
    },
    setDropReel(state, action: PayloadAction<IReel | null>) {
      state.dropReel = action.payload
    },
  },
})

export const { setActiveReelsTypeId, setActiveReelId, setActiveShotId, setDragShot, setDropReel } =
  entitiesSlice.actions
export default entitiesSlice.reducer
