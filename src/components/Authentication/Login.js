import React, { useEffect } from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

import auth from "./../../firebase.init";
import Loading from "./../Shared/Loading";

const Login = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  let signInError;
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user || gUser) {
      navigate("/");
    }
  }, [user, gUser, from, navigate]);

  if (loading || gLoading) {
    return <Loading></Loading>;
  }

  if (error || gError) {
    signInError = (
      <p className="text-red-500">
        <small>{error?.message || gError?.message}</small>
      </p>
    );
  }

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  return (
    <div className="bg-no-repeat  opacity-75 inset-0 z-0 bg-cover bg-center relative">
      <div className="absolute  opacity-75 inset-0 z-0"></div>
      <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
          <div className="self-start hidden lg:flex flex-col  text-base-content">
            {/* <img src="" className="mb-3" /> */}
            <h1 className="mb-3 font-bold text-5xl text-base-content">
              Hi 👋 Welcome to
            </h1>
            <p className="pr-3 text-base-content">
              Dobby. Please sign in to your account.
            </p>
          </div>
        </div>
        <div className="flex justify-center self-center  z-10">
          <div className="p-12 bg-transparnet mx-auto rounded-2xl w-100 ">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-base-content">
                Sign In
              </h3>
              <p className="text-base-content"></p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">
                    Email
                  </label>
                  <input
                    className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                    type="email"
                    placeholder="mail@gmail.com"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Email is Required",
                      },
                      pattern: {
                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                        message: "Provide a valid Email",
                      },
                    })}
                  />
                  <label className="label">
                    {errors.email?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.email.message}
                      </span>
                    )}
                    {errors.email?.type === "pattern" && (
                      <span className="label-text-alt text-red-500">
                        {errors.email.message}
                      </span>
                    )}
                  </label>
                </div>
                <div className="space-y-1">
                  <label className=" text-sm font-medium text-gray-700 tracking-wide">
                    Password
                  </label>
                  <input
                    className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is Required",
                      },
                      minLength: {
                        value: 6,
                        message: "Must be 6 characters or longer",
                      },
                    })}
                  />
                  <label className="label">
                    {errors.password?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.password.message}
                      </span>
                    )}
                    {errors.password?.type === "minLength" && (
                      <span className="label-text-alt text-red-500">
                        {errors.password.message}
                      </span>
                    )}
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  {/* <div className="flex items-center">
                    <input
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember_me"
                      className="ml-2 block text-sm text-gray-800"
                    >
                      Remember me
                    </label>
                  </div> */}
                  <div className="text-sm">
                    <Link
                      to="/"
                      className="mt-2 text-grey-400 hover:text-grey-500"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center bg-neutral text-neutral-content  p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    Sign in
                  </button>
                </div>
              </div>
              <div className="mt-2 text-center text-base-content text-sm">
                <span>
                  Create New Account?
                  <Link
                    to="/signup"
                    className="ml-2 text-green hover:text-green-500 "
                  >
                    Sign Up
                  </Link>
                  {signInError}
                </span>
              </div>
            </form>
            <div className="mt-2 divider divide-black"></div>
            <div className="flex items-center justify-center">
              <button
                onClick={() => signInWithGoogle()}
                className="btn btn-outline"
              >
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
