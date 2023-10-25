import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface VerifyState {
  Token: string; // Assuming Token is of type string
  response: any[]; // Change `any[]` to the actual type of the response array if possible
}

const initialState: VerifyState = {
  Token: "",
  response: [],
};

export const verifySlice = createSlice({
  name: "verify",
  initialState,
  reducers: {
    verifyGet: (state, action: PayloadAction<{ Token: string; response: any[] }>) => {
      state.Token = action.payload.Token;
      state.response = action.payload.response;
    },
    resetverifyGet: (state) => {
      state.response = [];
    },
  },
});

export const { verifyGet, resetverifyGet } = verifySlice.actions;
export default verifySlice.reducer;
