import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  newProjectModalShow: boolean
  deleteProjectModalShow: boolean
  newReelsTypeModalShow: boolean
  newReelModalShow: boolean
  newShotModalShow: boolean
}

const initialState: IInitialState = {
  newProjectModalShow: false,
  deleteProjectModalShow: false,
  newReelsTypeModalShow: false,
  newReelModalShow: false,
  newShotModalShow: false,
}

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setNewProjectModalShow(state, action: PayloadAction<boolean>) {
      state.newProjectModalShow = action.payload
    },
    setDeleteProjectModalShow(state, action: PayloadAction<boolean>) {
      state.deleteProjectModalShow = action.payload
    },
    setNewReelsTypeModalShow(state, action: PayloadAction<boolean>) {
      state.newReelsTypeModalShow = action.payload
    },
    setNewReelModalShow(state, action: PayloadAction<boolean>) {
      state.newReelModalShow = action.payload
    },
    setNewShotModalShow(state, action: PayloadAction<boolean>) {
      state.newReelModalShow = action.payload
    },
  },
})

export const {
  setNewProjectModalShow,
  setDeleteProjectModalShow,
  setNewReelsTypeModalShow,
  setNewReelModalShow,
  setNewShotModalShow,
} = modalsSlice.actions
export default modalsSlice.reducer
