import { PacmanLoader } from "react-spinners";
import Navbar from "../features/Navbar/Navbar";
import { selectLoggedInUser, selectStatus } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

function HomePage() {
  const user = useSelector(selectLoggedInUser);
  const status = useSelector(selectStatus);
  console.log({ user: user });
  return (
    <div className=" min-h-screen bg-Auth-0">
      <Navbar></Navbar>
      <h1 className="text-center text-4xl text-black font-Logo">Home</h1>
      <br />
      <div className="flex justify-center items-center">
        {status === "loading" ? (
          <PacmanLoader color="#435334"/>
        ) : null}
      </div>
      {user.user.email && <div className=" text-4xl">{user.user.email}</div>}
    </div>
  );
}

export default HomePage;
