import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import auth from "./../../firebase.init";
import Loading from "./../Shared/Loading";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";

const Registration = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  const navigate = useNavigate();

  let signInError;

  if (loading || gLoading || updating) {
    return <Loading></Loading>;
  }

  if (error || gError || updateError) {
    signInError = (
      <p className="text-red-500">
        <small>
          {error?.message || gError?.message || updateError?.message}
        </small>
      </p>
    );
  }

  if (user || gUser) {
    navigate("/");
  }

  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
    //console.log('update done');
  };

  return (
    <div className="bg-no-repeat bg-cover bg-center relative">
      {/* <div className="absolute  opacity-75 inset-0 z-0"></div> */}
      <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
          <div className="self-start hidden lg:flex flex-col  text-base-content">
            {/* <img src="" className="mb-3" /> */}
            <h1 className="mb-3 font-bold text-5xl text-base-content">
              New to Dobby Gallery
            </h1>
            <p className="pr-3 text-base-content">
              Please create your account. 🎉
            </p>
          </div>
        </div>
        <div className="flex justify-center self-center  z-10">
          <div className="p-12 bg-transparnet mx-auto rounded-2xl w-100 ">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-base-content">
                Sign Up{" "}
              </h3>
              <p className="text-base-content"></p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">
                    Name
                  </label>
                  <input
                    className=" w-full text-base px-4 py-2 border  border-base-content rounded-lg focus:outline-none focus:border-green-400"
                    type="text"
                    placeholder="Rafath Auvee"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Name is Required",
                      },
                    })}
                  />
                  <label className="label">
                    {errors.name?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.name.message}
                      </span>
                    )}
                  </label>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">
                    Email
                  </label>
                  <input
                    className=" w-full text-base px-4 py-2 border  border-base-content rounded-lg focus:outline-none focus:border-green-400"
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
                <div className="space-y-2">
                  <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                    Password
                  </label>
                  <input
                    className="w-full content-center text-base px-4 py-2 border  border-base-content rounded-lg focus:outline-none focus:border-green-400"
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
                  <div className="text-sm">
                    <Link to="/" className="text-grey-400 hover:text-grey-500">
                      Forgot your password?
                    </Link>
                  </div>
                </div>
                <div>
                  <input
                    type="submit"
                    value="Sign Up"
                    className="w-full flex justify-center bg-neutral text-neutral-content  p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  />
                </div>
              </div>
            </form>
            {signInError}
            <div className="pt-5 text-center text-base-content text-sm">
              <span>
                Already have an account?
                <Link
                  to="/login"
                  className="ml-2 text-green text-base-content "
                >
                  Sign In
                </Link>
              </span>
            </div>
            <div className="divider"></div>
            <div className="flex items-center justify-center">
              <button
                onClick={() => signInWithGoogle()}
                className="btn btn-outline flex items-center justify-center "
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

export default Registration;
