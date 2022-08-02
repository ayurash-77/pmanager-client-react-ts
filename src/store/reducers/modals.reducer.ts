import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IModal } from '../../components/modal/modalWrapper.interfaces'

interface IInitialState {
  projectModal: IModal
  reelsTypeModal: IModal
  reelModal: IModal
}

const initialState: IInitialState = {
  projectModal: { isOpen: false, mode: null, zIndex: 1000 },
  reelsTypeModal: { isOpen: false, mode: null, zIndex: 1000 },
  reelModal: { isOpen: false, mode: null, zIndex: 1000 },
}

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setProjectModal(state, action: PayloadAction<IModal>) {
      state.projectModal = { ...state.projectModal, ...action.payload }
    },
    setReelsTypeModal(state, action: PayloadAction<IModal>) {
      state.reelsTypeModal = { ...state.reelsTypeModal, ...action.payload }
    },
    setReelModal(state, action: PayloadAction<IModal>) {
      state.reelModal = { ...state.reelModal, ...action.payload }
    },
  },
})

export const { setProjectModal, setReelsTypeModal, setReelModal } = modalsSlice.actions
