import React, { useEffect, useState } from "react";
import { useHistory ,useLocation } from 'react-router-dom';

import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm({
  clientSecret,
  // paymentIntent
}) {
  const stripe = useStripe();
  const elements = useElements();
  const origin = window.location.origin;
  const location = useLocation()

  console.log({location})


  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchIntent = async() => {
    
    try{
      const payIntent = await stripe.retrievePaymentIntent(clientSecret)
      console.log({payIntent});
    
  
    }catch(e){
      console.log(e)
    }
  }

  const setIntentMessage = paymentIntent =>{
    switch (paymentIntent.status) {
      case "succeeded":
        setMessage("Payment succeeded!");
        break;
      case "processing":
        setMessage("Your payment is processing.");
        break;
      case "requires_payment_method":
        setMessage("Your payment was not successful, please try again.");
        break;
      default:
        setMessage("Something went wrong.");
        break;
    }
  }

  useEffect(() => {
    console.log({clientSecret})
    if (!stripe) return;
    if (!clientSecret) return;
    fetchIntent()    
  },  [clientSecret]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const res = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: origin + location.pathname,
        // redirect: 'if_required'
      },
      handleActions: false, 
    });

    console.log({res})

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (res.error?.type === "card_error" || res.error?.type === "validation_error") {
      setMessage(res.error.message);
    } else {
      // setMessage("An unexpected error occurred.");

      // mark as paid
      
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <div className="sq-checkout p-4 rounded">

        <div>
          Fake details: 
          Mastercard	5555555555554444
        </div>
       <form id="payment-form" onSubmit={handleSubmit}>

        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
        </form>

    </div>
   
  );
}