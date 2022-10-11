import React, { useEffect, useState } from "react";
import {
  SystemMessage,
  SystemMessageType,
} from "../redux/system-message/systemMessageSlice";

type Props = {
  item: SystemMessage;
};

//warning: border-left-color: rgb(250 204 21
//error: border-left-color: rgb(248 113 113
//info: border-left-color: rgb(59 130 246
//success:  border-left-color: rgb(34 197 94
// border-neutral-700
const SystemMessage = (props: Props) => {
  const { item } = props;

  const setColor = () => {
    switch (item.type) {
      case SystemMessageType.ERROR:
        return "rgb(239 68 68)";

      case SystemMessageType.INFO:
        return "rgb(59 130 246)";

      case SystemMessageType.SUCCESS:
        return "rgb(34 197 94)";

      case SystemMessageType.WARNING:
        return "rgb(250 204 21)";
    }
  };

  return (
    <div
      style={{ borderLeftColor: setColor() }}
      className="h-fit max-h-[12rem] w-96 rounded-lg rounded-l-sm border border-l-4 border-neutral-700  bg-neutral-600 ">
      <h1 className="rounded-r-lg bg-neutral-800 p-1 px-2 font-bold text-neutral-200">
        {item.title}
      </h1>
      <p className="p-2 text-sm  text-neutral-300">{item.message}</p>
    </div>
  );
};

export default SystemMessage;
