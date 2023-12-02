import React, { useEffect, useState } from "react";
import { useHistory ,useLocation } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
// import { showSnackbarMessage} from './/store/snackbar-store';
import showSnackbarMessage from './../../store/snackbar-store'

import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm({
  clientSecret,
  cb,
  invoice
  // paymentIntent
}) {
  const stripe = useStripe();
  const elements = useElements();
  const origin = window.location.origin;
  const location = useLocation()
  const dispatch = useDispatch()

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchIntent = async() => {
    try{
      const payIntent = await stripe.retrievePaymentIntent(clientSecret)
  
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
      return;
    }

    setIsLoading(true);

    try{

      const res = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: origin + location.pathname,
          // redirect: 'if_required'
        },
        handleActions: false, 
      });

      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.
      if (res.error?.type === "card_error" || res.error?.type === "validation_error") {
        setMessage(res.error.message);
      } else {
        if (res.paymentIntent.status==="succeeded"){
          cb.payInvoice(res.paymentIntent)
          cb.close()
        }
      }

    } catch (e){
      console.log(e)
      dispatch(showSnackbarMessage({
        status: 'error',
        message: e.response.data.message 
    }))
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <div className="sq-checkout">

        
        <div className='bg-sq-lav-light w-100 sq-outter-shadow mb-4 p-3 rounded'>
          <div className='sub mb-2'>Demo Test Card</div>
            <div className='sq-grid font-size-11 w-100'>
                <strong>Card Number:</strong>
                <div className=''>5555555555554444</div>
            </div>
        </div>
        <hr className="mb-4"/>
       <form id="payment-form" onSubmit={handleSubmit}>

        <PaymentElement id="payment-element" options={paymentElementOptions} />

        <button 
          className={`sq-btn mt-3
            ${isLoading && '  bg-color-sq-light'}
          `} 
          disabled={isLoading || !stripe || !elements} 
          id="submit"
        >
          <span id="button-text">
            {isLoading ? "Processing..." : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
        </form>

    </div>
   
  );
}