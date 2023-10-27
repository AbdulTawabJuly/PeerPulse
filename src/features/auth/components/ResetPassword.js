import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  resetPasswordAsync,
  selectErrors,
  selectPasswordReset,
  setErrorToNull,
  setPasswordResetToFalse,
} from "../authSlice";

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const passwordReset = useSelector(selectPasswordReset);
  const error = useSelector(selectErrors);

  useEffect(() => {
    dispatch(setPasswordResetToFalse());
    dispatch(setErrorToNull());
  }, []);
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const email = query.get("email");
  return (
    <>
      {email && token ? (
        <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-Auth-0 font-signature">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className=" h-60 w-60 ml-20 -mt-6"
              src="/NowOpen-removebg-preview.png"
              alt="Your Company"
            />
            <h2 className=" -mt-20 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 font-signature">
              Reset Password
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              noValidate
              onSubmit={handleSubmit((data) => {
                dispatch(
                  resetPasswordAsync({ email, token, password: data.password })
                );
              })}
              className="space-y-6"
              action="#"
              method="POST"
            >
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    New Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    {...register("password", {
                      required: "Password is Required",
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                        message: `- at least 8 characters\n
                      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                      - Can contain special characters`,
                      },
                    })}
                    type="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm New Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    {...register("confirmPassword", {
                      required: "Confirm Password Required",
                      validate: (value, formValues) =>
                        value === formValues.password ||
                        "Password Not Matching",
                    })}
                    type="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                  {passwordReset && (
                    <p className="text-green-500">
                      Password Successfully Reset
                    </p>
                  )}
                  {error && <p className="text-red-500">{error}</p>}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md  bg-AuthBtn-0 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  hover:bg-AuthBtnHover-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Reset Password 🚀
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Send me back to{" "}
              <Link
                to="/login"
                className="font-semibold leading-6  text-AuthBtn-0 hover:text-AuthBtnHover-0"
              >
                Sign In 😊
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <main className="grid min-h-screen  place-items-center bg-Auth-0 px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className=" font-semibold text-AuthBtn-0 text-2xl">404</p>
            <h1 className="mt-4 text-3xl font-bold font-signature tracking-tight text-gray-900 sm:text-5xl">
              Page Not Found
              <img
                src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg"
                alt={404}
                className="w-20 h-24 mb-3 inline"
              />
            </h1>

            <p className="mt-6 text-base leading-7 text-gray-600">
              Sorry, the Link was not Valid.
            </p>
          </div>
        </main>
      )}
    </>
  );
}
