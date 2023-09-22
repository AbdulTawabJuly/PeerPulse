import Navbar from "../features/Navbar/Navbar"
import { selectLoggedInUser } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

function HomePage() {
  const user = useSelector(selectLoggedInUser);

  return (
    <div className=" min-h-screen bg-Auth-0">
    <Navbar></Navbar>
      <h1 className="text-center text-4xl text-black font-Logo">Home</h1>
      <br />
      <p>{user.email}</p>
    </div>
  );
}

export default HomePage;
