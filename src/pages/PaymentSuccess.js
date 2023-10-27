import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { selectCurrentlyClickedRoom, sendInvoiceAsync } from "../features/rooms/RoomSlice";

function PaymentSuccess() {
  const params = useParams();
  const user=useSelector(selectLoggedInUser);
  const RoomDetails=useSelector(selectCurrentlyClickedRoom);
  const dispatch = useDispatch();
  

  const sendInvoice = () => {
    dispatch(sendInvoiceAsync({RoomDetails,user,params}))
  };

  return (
    <>
      {!params.id && <Navigate to="/" replace={true}></Navigate>}
      <main className="grid min-h-screen  place-items-center bg-Auth-0 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">
            Payment Recieved Successfully 🚀
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Payment ID #{params?.id}
          </h1>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to={`/room/${params.id}`}
              onClick={() => sendInvoice()}
              className="rounded-md bg-AuthBtn-0 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-AuthBtnHover-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go to Room
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default PaymentSuccess;
