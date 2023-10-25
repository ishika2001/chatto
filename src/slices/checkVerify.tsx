import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CheckVerifyState {
  isVerify: boolean;
  alertShow: boolean;
  count: number;
}

const initialState: CheckVerifyState = {
  isVerify: false,
  alertShow: false,
  count: 3,
};

const checkVerifySlice = createSlice({
  name: "check",
  initialState,
  reducers: {
    verfifyChecked: (state, action: PayloadAction<boolean>) => {
      state.isVerify = action.payload;
    },
    alertChecked: (state, action: PayloadAction<boolean>) => {
      state.alertShow = action.payload;
    },
    attempCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
  },
});

export const { verfifyChecked, alertChecked, attempCount } = checkVerifySlice.actions;
export default checkVerifySlice;
