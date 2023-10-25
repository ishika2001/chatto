import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import  {loginSlice, LoginState } from "./loginSlice";
import  {verifySlice, VerifyState } from "./verifySlice";
import getjobSlice, { GetJobState } from "./getjobSlice";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import checkSlice, { CheckState } from "./checkSlice";
import checkVerifySlice, { CheckVerifyState } from "./checkVerify";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { gettagslice, Gettagstate } from "./getCaseSlice";
import { identitySlice, IdentityState } from "./identitySlice";
import { pinSlice, PinState } from "./pinSlice";

// Define the root state interface
export interface RootState {
  emails: LoginState;
  verifys: VerifyState;
  jobs: GetJobState;
  checks: CheckState;
  checkedVerifys: CheckVerifyState;
  tags: Gettagstate;
  identity: IdentityState;
  pin: PinState;
}

const reducers = combineReducers<RootState>({
  emails: loginSlice.reducer,
  verifys: verifySlice.reducer,
  jobs: getjobSlice.reducer,
  checks: checkSlice.reducer,
  checkedVerifys: checkVerifySlice.reducer,
  tags: gettagslice.reducer,
  identity: identitySlice.reducer,
  pin: pinSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk as ThunkMiddleware<RootState>], // Add ThunkMiddleware with RootState type
  // middleware: getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});

export default store;
