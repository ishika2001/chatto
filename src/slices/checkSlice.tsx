import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CheckState {
  isCheck: boolean;
}

const initialState: CheckState = {
  isCheck: false,
};

const checkSlice = createSlice({
  name: "check",
  initialState,
  reducers: {
    getChecked: (state, action: PayloadAction<boolean>) => {
      state.isCheck = action.payload;
    },
  },
});

export const { getChecked } = checkSlice.actions;
export default checkSlice;
