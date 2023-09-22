import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MoonLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser ,createUserAsync, selectStatus, selectErrors} from "../authSlice";

function SignUp() {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const error = useSelector(selectErrors);
  const user = useSelector(selectLoggedInUser);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <>
      {user && <Navigate to ="/" replace={true}/>}
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-Auth-0 font-signature">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="h-60 w-60 ml-20 -mt-6"
            src="/NowOpen-removebg-preview.png"
            alt="Your Company"
          />
          <h2 className="-mt-20 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up to your Account
          </h2>
          {error ? <h4 className="text-red-700 text-center pt-4">{error}</h4> : null}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
             dispatch(createUserAsync({email:data.email,password:data.password}))
            })}
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
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Confirm Password Required",
                    validate: (value, formValues) =>
                      value === formValues.password || "Password Not Matching",
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-AuthBtn-0 hover:bg-AuthBtnHover-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {status === "loading" ? <MoonLoader color="white" size={20}/> : "Sign Up"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a Member?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-AuthBtn-0 hover:text-AuthBtnHover-0"
            >
              Sign In 😊
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUp;
