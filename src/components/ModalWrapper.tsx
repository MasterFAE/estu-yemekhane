import React from "react";

type Props = {
  children: React.ReactNode;
};

const ModalWrapper = (props: Props) => {
  return (
    <div className="z-60 fixed top-0 left-0 h-screen w-full bg-neutral-900 bg-opacity-30 pb-4">
      {props.children}
    </div>
  );
};

export default ModalWrapper;
