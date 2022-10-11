import { Dispatch } from "react";
import { AnyAction } from "redux";
import {
  addMessage,
  deleteLastMessage,
  SystemMessage,
  SystemMessageType,
} from "../redux/system-message/systemMessageSlice";

const addSystemMessage = async (
  dispatch: Dispatch<AnyAction>,
  payload: SystemMessage
) => {
  dispatch(addMessage(payload));
  setTimeout(() => {
    dispatch(deleteLastMessage());
  }, 5000);
};
export default addSystemMessage;
