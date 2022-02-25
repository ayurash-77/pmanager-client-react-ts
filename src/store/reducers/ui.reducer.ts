import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ITheme {
  theme: { darkMode: boolean }
}

const themeInLocalStorage = localStorage.getItem('darkMode')

const initialState: ITheme = {
  theme: { darkMode: themeInLocalStorage ? JSON.parse(themeInLocalStorage) : true },
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setThemeMode(state, action: PayloadAction<boolean>) {
      state.theme.darkMode = action.payload
      document.body.setAttribute('darkMode', action.payload.toString())
      localStorage.setItem('darkMode', JSON.stringify(action.payload))
    },
  },
})

export const { setThemeMode } = uiSlice.actions
export default uiSlice.reducer
