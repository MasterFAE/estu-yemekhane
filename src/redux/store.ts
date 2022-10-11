import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { createWrapper, HYDRATE, MakeStore } from "next-redux-wrapper";

import userReducer from "./user/userSlice";
import cartReducer from "./cart/cartSlice";
import systemMessageReducer from "./system-message/systemMessageSlice";

const combinedReducers = combineReducers({
  user: userReducer,
  cart: cartReducer,
  systemMessage: systemMessageReducer,
});
export type OurStore = ReturnType<typeof combinedReducers>;

export type storeType = ReturnType<typeof combinedReducers>;

const rootReducer = (state: storeType, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  }
  return combinedReducers(state, action);
};

export const store = configureStore<OurStore>({
  //@ts-ignore
  reducer: rootReducer,
});
//@ts-ignore
const makeStore: MakeStore = () => store;
export const wrapper = createWrapper(makeStore, { debug: false });
export type MyThunkDispatch = typeof store.dispatch;
