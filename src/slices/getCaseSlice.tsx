import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Gettagstate {
  tagDetailsData: any[]; // Replace `any[]` with the actual type of `tagDetailsData`
}

const initialState: Gettagstate = {
  tagDetailsData: [],
};

export const gettagslice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    gettags: (state, action: PayloadAction<any[]>) => {
      state.tagDetailsData = action.payload;
    },
  },
});

export const { gettags } = gettagslice.actions;
export default gettagslice;
