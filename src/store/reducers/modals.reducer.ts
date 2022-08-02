import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IModal } from '../../components/modal/modalWrapper.interfaces'

interface IInitialState {
  projectModal: IModal
  reelsTypeModal: IModal
  reelModal: IModal
  newProjectModalShow: boolean
  deleteProjectModalShow: boolean
}

const initialState: IInitialState = {
  projectModal: { isOpen: false, mode: 'create', zIndex: 1000 },
  reelsTypeModal: { isOpen: false, mode: null, zIndex: 1000 },
  reelModal: { isOpen: false, mode: null, zIndex: 1000 },
  newProjectModalShow: false,
  deleteProjectModalShow: false,
}

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setProjectModal(state, action: PayloadAction<Partial<IModal>>) {
      state.projectModal = { ...state.projectModal, ...action.payload }
    },
    setReelsTypeModal(state, action: PayloadAction<IModal>) {
      state.reelsTypeModal = { ...state.reelsTypeModal, ...action.payload }
    },
    setReelModal(state, action: PayloadAction<IModal>) {
      state.reelModal = { ...state.reelModal, ...action.payload }
    },
    setNewProjectModalShow(state, action: PayloadAction<boolean>) {
      state.newProjectModalShow = action.payload
    },
    setDeleteProjectModalShow(state, action: PayloadAction<boolean>) {
      state.deleteProjectModalShow = action.payload
    },
  },
})

export const { setProjectModal, setDeleteProjectModalShow, setReelsTypeModal, setReelModal } =
  modalsSlice.actions
