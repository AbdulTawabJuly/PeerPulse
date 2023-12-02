import { Link } from "react-router-dom";

function UserNotFound() {
  return (
    <main className="grid min-h-screen  place-items-center bg-Auth-0 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className=" font-semibold text-AuthBtn-0 text-2xl">404</p>
        <h1 className="mt-4 text-3xl font-bold font-signature tracking-tight text-gray-900 sm:text-5xl">
          User Not Found
          <img
            src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg"
            alt={404}
            className="w-20 h-24 mb-3 inline"
          />
        </h1>

        <p className="mt-6 text-base leading-7 text-gray-600">
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/home"
            className="rounded-md bg-AuthBtn-0 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-AuthBtnHover-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default UserNotFound;
