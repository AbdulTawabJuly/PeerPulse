import React from "react";
import { Link,  } from "react-router-dom";

export default function ForgetPassword() {

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-Auth-0 font-signature">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className=" h-60 w-60 ml-20 -mt-6"
            src="/NowOpen-removebg-preview.png"
            alt="Your Company"
          />
          <h2 className=" -mt-20 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 font-signature">
           Forgot Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
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
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md  bg-AuthBtn-0 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  hover:bg-AuthBtnHover-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send Email 🚀
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
    </>
  );
}
