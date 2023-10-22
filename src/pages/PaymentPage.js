import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { selectCurrentlyClickedRoom, selectJoinedRoom, setCurrentlyClicked, setCurrentlyClickedPaidRoom } from "../features/rooms/RoomSlice";

export default function PaymentPage() {
  const location = useLocation();
  const RoomDetails = location.state;
  //console.log(RoomDetails.name);
  const dispatch=useDispatch();

  dispatch(setCurrentlyClickedPaidRoom(RoomDetails))

  return (
    <>
      <div class="min-h-screen flex justify-center items-center bg-Auth-0">
        <div class="bg-gray-200 p-4 h-96 w-96 rounded-lg">
          <h1 className=" text-4xl font-Logo">Payment</h1>
          <div className=" mt-20">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>Room Name: {RoomDetails.name}</h3>
                      <p className="ml-4">Price: $ {RoomDetails.price}</p>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>$ {RoomDetails.price}</p>
            </div>
            <div className="mt-6">
              <Link
                to="/stripe-checkout/"
                className="flex items-center justify-center rounded-md border border-transparent bg-AuthBtn-0 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-AuthBtnHover-0"
              >
                Pay
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{" "}
                <Link to="/">
                  <button
                    type="button"
                    className="font-medium text-AuthBtn-0 hover:text-AuthBtnHover-0"
                  >
                    Return
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
