import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GetJobState {
  jobData: any[]; // Replace `any[]` with the actual type of `jobData`
  jobId: string; // Replace `string` with the actual type of `jobId`
}

const initialState: GetJobState = {
  jobData: [],
  jobId: "",
};

const getjobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    getJob: (state, action: PayloadAction<any[]>) => {
      state.jobData = action.payload;
    },
    getJobId: (state, action: PayloadAction<string>) => {
      state.jobId = action.payload;
    },
  },
});

export const { getJob, getJobId } = getjobSlice.actions;
export default getjobSlice;
