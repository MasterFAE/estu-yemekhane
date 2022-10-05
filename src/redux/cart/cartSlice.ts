import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Dine } from ".prisma/client";
type cartSlice = Dine[];

const initialState: cartSlice = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Dine>) {
      state.unshift(action.payload);
    },
    clearCart(state) {
      state = initialState;
    },
    deleteItem(state, action: PayloadAction<{ id: number }>) {
      state.filter((e) => e.id !== action.payload.id);
    },
  },
});

export const { addItem, clearCart, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;
