import React from "react";
import { FaHamburger } from "react-icons/fa";

type Props = {
  openModal: any;
};

const CartModal = (props: Props) => {
  return (
    <div className="fixed top-[20%] left-[20.5%]  h-full max-h-[60%] min-w-[50%]  overflow-y-auto rounded-lg border border-neutral-900 bg-neutral-500 shadow-sm">
      <div className="inline-flex h-full w-full flex-col bg-neutral-600">
        <div className="min-h-[2rem] w-full bg-neutral-900 p-2">
          <h1 className="text-xl font-bold text-neutral-300">Cart</h1>
        </div>
        <div className="grid h-full w-full">
          <div className="col-span-5 bg-neutral-800 lg:col-span-3">
            <div className=" flex flex-row items-center bg-neutral-800 p-2">
              <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg  bg-neutral-600 text-neutral-200">
                <FaHamburger />
              </div>
              <div className="ml-3 text-base font-normal text-neutral-200">
                Breakfast | 27-10-2022
              </div>
              <button
                type="button"
                className=" ml-auto inline-flex h-8 w-8 rounded-lg bg-neutral-800 p-1.5 text-neutral-500 hover:bg-neutral-700 hover:text-white focus:ring-2 focus:ring-neutral-300"
                data-dismiss-target="#toast-default"
                aria-label="Close">
                <span className="sr-only">Close</span>
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
            <div className="flex flex-row items-center  bg-neutral-800 p-2">
              <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg  bg-neutral-600 text-neutral-200">
                <FaHamburger />
              </div>
              <div className="ml-3 text-base font-normal text-neutral-200">
                Dine | 27-10-2022
              </div>
              <button
                type="button"
                className=" ml-auto inline-flex h-8 w-8 rounded-lg bg-neutral-800 p-1.5 text-neutral-500 hover:bg-neutral-700 hover:text-white focus:ring-2 focus:ring-neutral-300"
                data-dismiss-target="#toast-default"
                aria-label="Close">
                <span className="sr-only">Close</span>
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
            <div className="flex flex-row items-center  bg-neutral-800 p-2">
              <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg  bg-neutral-600 text-neutral-200">
                <FaHamburger />
              </div>
              <div className="ml-3 text-base font-normal text-neutral-200">
                Dine | 27-10-2022
              </div>
              <button
                type="button"
                className=" ml-auto inline-flex h-8 w-8 rounded-lg bg-neutral-800 p-1.5 text-neutral-500 hover:bg-neutral-700 hover:text-white focus:ring-2 focus:ring-neutral-300"
                data-dismiss-target="#toast-default"
                aria-label="Close">
                <span className="sr-only">Close</span>
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
            <div className="flex items-end  p-2">
              <button
                type="button"
                className="  w-full  rounded-lg bg-green-600  py-2.5 text-base font-medium text-white hover:bg-green-700  focus:outline-none focus:ring-4 focus:ring-green-800">
                Payment 32 TL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
