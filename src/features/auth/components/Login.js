import { Link } from "react-router-dom";

function Login() {
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
            Sign In to your Account
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
                  className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
                  name="password"
                  type="password"
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
                Sign In
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
