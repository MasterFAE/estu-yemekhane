import React, { Suspense, useState } from "react";
import Image from "next/image";
import { Form, Field, Formik, ErrorMessage } from "formik";
import bg from "../images/bg.jpg";
import logo from "../images/estulogo.png";
import * as Yup from "yup";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import Router from "next/router";
import { NextPageContext } from "next";
import Loading from "../components/Loading";
type Props = {
  providers: any;
  csrfToken: any;
};

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Username is too short")
    .max(50, "Username is too short")
    .required("Required"),
  password: Yup.string()
    .min(2, "Password is too short")
    .max(50, "Password is too long")
    .required("Required"),
});

const Login = (props: Props) => {
  const { providers, csrfToken } = props;
  const [_error, setError] = useState<null | string>(null);
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
    if (!login?.ok || login?.error) {
      setError("Credentials does not match");
    }
    if (login?.ok) Router.push("/");
    return;
  };
  return (
    <Suspense fallback={<Loading />}>
      <main
        className="flex h-screen w-full items-center justify-center bg-cover"
        style={{
          backgroundImage: `url(${bg.src})`,
        }}>
        <div className="fixed z-0 h-screen w-full bg-black py-32 opacity-30"></div>
        <div className="fixed z-10 mb-32 flex w-4/5 flex-col gap-x-8  rounded-lg bg-neutral-100 p-4 py-12 shadow-md lg:w-2/5 lg:flex-row">
          <div className="m-auto h-[33%] w-[33%] self-center ">
            <Image src={logo} objectFit="contain" />
          </div>

          <Formik
            validationSchema={SignupSchema}
            initialValues={{ username: "", password: "" }}
            onSubmit={handleSubmit}>
            <Form className="m-auto flex w-full flex-col self-center lg:w-2/3">
              <input
                readOnly={true}
                name="csrfToken"
                className="hidden"
                value={csrfToken}
              />
              {_error && (
                <div className="rounded-lg bg-red-200 px-2.5 py-2 text-sm font-medium text-red-900">
                  {_error}
                </div>
              )}
              <label
                htmlFor="username"
                className="mt-2 text-lg font-bold text-gray-700">
                Student Username
              </label>
              <ErrorMessage name="username" component="div">
                {(msg) => (
                  <div className=" text-sm  font-medium text-red-600">
                    {msg}
                  </div>
                )}
              </ErrorMessage>
              <Field
                id="username"
                name="username"
                className="rounded-md px-2 py-1 outline-none"
                placeholder="Enter username"
              />
              <label
                htmlFor="password"
                className="mt-2 text-lg font-bold text-gray-700">
                Student Password
              </label>
              <ErrorMessage component="div" name="password">
                {(msg) => (
                  <div className=" text-sm  font-medium text-red-600">
                    {msg}
                  </div>
                )}
              </ErrorMessage>
              <Field
                id="password"
                name="password"
                className="rounded-md px-2 py-1 outline-none"
                type="password"
                placeholder="Enter password"
              />

              <button
                type="submit"
                className="mt-4 w-full rounded-lg bg-blue-200 py-1 text-lg font-normal text-blue-700 transition-all hover:bg-blue-300 focus:bg-blue-300">
                Login
              </button>
            </Form>
          </Formik>
        </div>
      </main>
    </Suspense>
  );
};

Login.getInitialProps = async (ctx: NextPageContext) => {
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
