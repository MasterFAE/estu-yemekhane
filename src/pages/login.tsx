import React from "react";
import Image from "next/image";
import { Form, Field, Formik } from "formik";
import bg from "../images/bg.jpg";
import logo from "../images/estulogo.png";
type Props = {};

const login = (props: Props) => {
  return (
    <main
      className="flex h-screen w-full items-center justify-center  bg-cover"
      style={{
        backgroundImage: `url(${bg.src})`,
      }}>
      <div className="fixed z-0 h-full w-full bg-black opacity-30"></div>
      <div className="fixed z-10 mb-32 flex w-4/5 flex-col gap-x-8  rounded-lg bg-neutral-100 p-4 py-12 shadow-md lg:w-2/5 lg:flex-row">
        <div className="m-auto h-[33%] w-[33%] self-center ">
          <Image src={logo} objectFit="contain" />
        </div>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values) => {}}>
          <Form className="m-auto flex w-full flex-col self-center lg:w-2/3">
            <label
              htmlFor="username"
              className="mt-2 text-base font-bold text-gray-700">
              Öğrenci numarası
            </label>
            <Field
              id="username"
              name="username"
              className="rounded-md px-2 py-1 outline-none"
              placeholder="Öğrenci numarası"
            />
            <label
              htmlFor="password"
              className="mt-2 text-base font-bold text-gray-700">
              Öğrenci şifresi
            </label>
            <Field
              id="password"
              name="password"
              className="rounded-md px-2 py-1 outline-none"
              type="password"
              placeholder="Şifre"
            />
            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-blue-100 py-1 text-lg text-blue-700 transition-all hover:bg-blue-200">
              Giriş yap
            </button>
          </Form>
        </Formik>
      </div>
    </main>
  );
};

export default login;
