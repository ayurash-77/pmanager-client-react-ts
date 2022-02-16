import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ITheme {
  theme: { darkMode: boolean }
}

const themeInLocalStorage = localStorage.getItem('darkMode')
console.log(themeInLocalStorage)

const initialState: ITheme = {
  theme: { darkMode: themeInLocalStorage ? JSON.parse(themeInLocalStorage) : true },
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setThemeMode(state, action: PayloadAction<boolean>) {
      state.theme.darkMode = action.payload
      localStorage.setItem('darkMode', JSON.stringify(action.payload))
    },
  },
})

export const { setThemeMode } = uiSlice.actions
export default uiSlice.reducer
