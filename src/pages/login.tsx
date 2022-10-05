import React from "react";
import Image from "next/image";
import { Form, Field, Formik } from "formik";
import bg from "../images/bg.jpg";
import logo from "../images/estulogo.png";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import Router from "next/router";
type Props = {
  providers: any;
  csrfToken: any;
};

const Login = (props: Props) => {
  const { providers, csrfToken } = props;
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    const login = await signIn("credentials", {
      redirect: false,
      username: values.username,
      password: values.password,
      csrfToken,
    });
    if (login?.ok) Router.push("/");
    return;
  };
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
          onSubmit={handleSubmit}>
          <Form className="m-auto flex w-full flex-col self-center lg:w-2/3">
            <input
              readOnly={true}
              name="csrfToken"
              className="hidden"
              value={csrfToken}
            />
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

Login.getInitialProps = async (ctx) => {
  const { req, res } = ctx;
  const session = await getSession({ req });
  if (session && res && session.user?.id) {
    res.writeHead(302, { Location: "/" });
    res.end();
    return;
  }
  return {
    session: undefined,
    providers: await getProviders(),
    csrfToken: await getCsrfToken(ctx),
  };
};

export default Login;
