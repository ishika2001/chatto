import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PinState {
  Token: string; // Assuming Token is of type string
  response: any[]; // Change `any[]` to the actual type of the response array if possible
}

const initialState: PinState = {
  Token: "",
  response: [],
};

export const pinSlice = createSlice({
  name: "pin",
  initialState,
  reducers: {
    verifyPinGet: (state, action: PayloadAction<{ Token: string; response: any[] }>) => {
      state.Token = action.payload.Token;
      state.response = action.payload.response;
    },
    resetverifyPinGet: (state) => {
      state.response = [];
    },
  },
});

export const { verifyPinGet, resetverifyPinGet } = pinSlice.actions;
export default pinSlice.reducer;
