import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Dine, User } from ".prisma/client";
import { signOut } from "next-auth/react";
import Router from "next/router";

const initialState = {
  id: "",
  name: "",
  civId: "",
  image: "",
  department: "",
  loggedIn: false,
  loading: false,
};

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
      const { id, name, civId, image, department } = action.payload;
      state.id = id;
      state.name = name;
      state.civId = civId;
      state.image = image;
      state.department = department;
    });
  },
});

// export const { setUser } = userSlice.actions;
export default userSlice.reducer;
