import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Me{
  "username": string,
  "email": string,
  "family_name": string,
  "given_name": string,
  "picture": string,
}

export interface AuthState {
  me: Me | null,
}

const initialState: AuthState = {
  me: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMe(state, action: PayloadAction<Me>) {
      state.me = action.payload
    }
  }
})

export const { setMe } = authSlice.actions

export default authSlice.reducer