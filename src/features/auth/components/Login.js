import { useForm } from "react-hook-form";
import MoonLoader from "react-spinners/MoonLoader";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  checkUserAsync,
  selectErrors,
  selectLoggedInUser,
  selectStatus,
} from "../authSlice";
import { useEffect } from "react";

function Login() {
  const dispatch = useDispatch();
  const error = useSelector(selectErrors);
  const user = useSelector(selectLoggedInUser);
  const status = useSelector(selectStatus);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-Auth-0 font-signature">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className=" h-60 w-60 ml-20 -mt-6"
            src="/NowOpen-removebg-preview.png"
            alt="Your Company"
          />
          <h2 className=" -mt-20 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 font-signature">
            Sign In to your Account
          </h2>
          {error && <h4 className="text-red-700 text-center pt-4">{error}</h4>}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              dispatch(
                checkUserAsync({ email: data.email, password: data.password })
              );
            })}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email Address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: "Email Required",
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: "Email Not Valid",
                    },
                  })}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="/forget-password"
                    className="font-semibold  text-AuthBtn-0 hover:text-AuthBtnHover-0"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: "Password is Required",
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              {error && <p className="text-red-500">{error.message}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md  bg-AuthBtn-0 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  hover:bg-AuthBtnHover-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {status === "loading" ? (
                  <MoonLoader color="white" size={20} />
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a Member?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6  text-AuthBtn-0 hover:text-AuthBtnHover-0"
            >
              Sign Up 😊
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
