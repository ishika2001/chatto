import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginState {
  email: string; // Assuming email is of type string
  isLoadingCondition: boolean;
}

const initialState: LoginState = {
  email: "",
  isLoadingCondition: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    emailGet: (state, action: PayloadAction<{ email: string }>) => {
      state.email = action.payload.email;
    },
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoadingCondition = action.payload;
    },
  },
});

export const { emailGet, isLoading } = loginSlice.actions;
export default loginSlice.reducer;



