import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { signOut } from "next-auth/react";
import Router from "next/router";
import type { Dine_W_Food } from "../cart/cartSlice";

const initialState = {
  id: "",
  name: "",
  civId: "",
  image: "",
  department: "",
  loggedIn: false,
  loading: false,
  reservation: [],
};

export const getReservation = createAsyncThunk(
  "user/reservation",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`/api/reservation`, {
        method: "GET",
      });
      // if (response.status == 400) {
      //   Router.replace("/login");
      // }
      const result = await response.json();
      return result;
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

//REDO: You need to remove param name from the function,
// all users should be able to see only their information
export const getCurrentUser = createAsyncThunk(
  "user/currentUser",
  async (name: string, thunkAPI) => {
    try {
      const response = await fetch(`/api/user/${name}`, { method: "GET" });
      if (response.status == 400) {
        Router.replace("/login");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      const { id, name, civId, image, department, reservation } =
        action.payload;
      state.id = id;
      state.name = name;
      state.civId = civId;
      state.image = image;
      state.reservation = reservation;
      state.department = department;
    });
    builder.addCase(getReservation.fulfilled, (state, action) => {
      state.reservation = action.payload.reservation;
    });
  },
});

// export const { setUser } = userSlice.actions;
export default userSlice.reducer;
