import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "../Stripe.css";
import { useSelector } from "react-redux";
import { selectCurrentlyClickedRoom } from "../features/rooms/RoomSlice";
import { useNavigation } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51NoQGmSDkACrq3oOH97IaDGRCc9BtOEfzPsL6qga6XSkwPoFLD35ifp8QuDEpFBgStRAcPlS9K61rTBl8nZ3b4DK007jTkfUub"
);
export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const currentlySelectedPaidRoom = useSelector(selectCurrentlyClickedRoom);
  console.log("Current Price",currentlySelectedPaidRoom.price)

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:8080/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( {totalAmount : currentlySelectedPaidRoom.price} ),
      // meta: {
      //   room_id: currentlySelectedPaidRoom.id,
      // },
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm></CheckoutForm>
        </Elements>
      )}
    </div>
  );
}
