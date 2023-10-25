import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IdentityState {
  email: string; // Replace `string` with the actual type of `email`
  schedule: string; // Replace `string` with the actual type of `schedule`
  isLoadingCondition: boolean;
}

const initialState: IdentityState = {
  email: "",
  schedule: "",
  isLoadingCondition: false,
};

export const identitySlice = createSlice({
  name: "identity",
  initialState,
  reducers: {
    identityGet: (state, action: PayloadAction<{ email: string }>) => {
      state.email = action.payload.email;
    },
    getSchedule: (state, action: PayloadAction<{ schedule: string }>) => {
      state.schedule = action.payload.schedule;
    },
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoadingCondition = action.payload;
    },
  },
});

export const { identityGet, isLoading, getSchedule } = identitySlice.actions;
export default identitySlice;
