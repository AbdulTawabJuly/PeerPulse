import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage"
import PageNotFound from "./pages/PageNotFound"
import RoomPage from "./pages/RoomPage"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Protected from "./features/auth/components/Protected";
import TimeUp from "./features/rooms/components/TimeUp";

const router = createBrowserRouter([  
  {
    path: "/",
    element: <Protected><HomePage></HomePage></Protected>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignUpPage></SignUpPage>,
  },
  {
    path: "/forget-password",
    element: <ForgetPasswordPage></ForgetPasswordPage>,
  },
  {
     path:"/room/:id",
     element: <RoomPage></RoomPage>,
  },
  {
    path:"/TimeUp",
    element:<TimeUp></TimeUp>
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },

]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
