import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Dine, Food } from ".prisma/client";
import Router from "next/router";

export enum SystemMessageType {
  WARNING,
  ERROR,
  SUCCESS,
  INFO,
}

export type SystemMessage = {
  type: SystemMessageType;
  title: string;
  message: string;
};

const initialState: SystemMessage[] = [];

const systemMessageSlice = createSlice({
  name: "system-message",
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<SystemMessage>) {
      state.unshift(action.payload);
    },
    deleteLastMessage(state) {
      state.pop();
    },
  },
});

export const { addMessage, deleteLastMessage } = systemMessageSlice.actions;
export default systemMessageSlice.reducer;
