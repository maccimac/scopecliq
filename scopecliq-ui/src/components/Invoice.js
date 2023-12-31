import axios from 'axios'

import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';

import { storeProject} from '../store/project-store';
import { currentUserId } from '../store/login-store';
import { showSnackbarMessage} from '../store/snackbar-store';
import { isClient } from '../store/client-store';

import CheckoutForm from '../modules/payments/CheckoutForm';
import Modal from '@mui/material/Modal';
import Tooltip from '@mui/material/Tooltip';

import { DateTime } from 'luxon';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51OFRqQCUuD2E5VcQunafcxNGQs53fPIlzkKlUSmcXJTic0RiMGDJyN0vN03qiNt6XCzp593F5F693yVGMfSQk86A00RfBIiUPe'); // FRONTEND
const stripe = require("stripe")('sk_test_51OFRqQCUuD2E5VcQlnxuimTBgtF5JUyKE3gxrHXsVx0FGkbe0yedLV3ywwW2N8wCzVMKl2rzFZGF6JEBIUdzbUUi00T8ww4o7U'); // BACKEND


const Invoice = ({
    propMilestoneId,
    milestone
}) => {
    const api = global.config.API
    const { paramMilestoneId } = useParams();
    let initLoad = false
    const userId = useSelector(currentUserId)
    const milestoneId = paramMilestoneId || propMilestoneId;

    const dispatch = useDispatch()
    const project = useSelector(storeProject)
    const clientMode = useSelector(isClient)
    const [invoice, set_invoice] = useState(null)
    const [consultant, set_consultant] = useState(null)
    const [isCollapsed, set_isCollapsed] = useState(propMilestoneId)

    const [clientSecret, setClientSecret] = useState("");
    const [paymentIntent, setPaymentIntent] = useState(null)
    const [options, setOptions]=useState({})

    const [showCheckout, setShowCheckout] = useState(false)

    const markAsPaid = async () =>{
        try{
            const res = await axios.post(`${api}/invoices/mark-paid/${invoice.id}`)
            getInvoiceDetails()
        }catch(e){
            dispatch(showSnackbarMessage({
                status: 'error',
                message: e.response.data.message 
            }))
        }
    }

    const fetchPaymentIntent = async () =>{
        if(!invoice?.total || invoice?.total <= 0) return
         if(invoice?.datetime_paid) return
        try{
            const paymentIntent = await stripe.paymentIntents.create({
                amount: parseInt(invoice.total),
                currency: "cad",
                // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
                automatic_payment_methods: {
                    enabled: true,
                },
            });
            console.log({paymentIntent})
            if(paymentIntent){
                setPaymentIntent(paymentIntent)
            }
            if(paymentIntent.client_secret){
                setClientSecret(paymentIntent.client_secret)
                setOptions({
                    clientSecret: paymentIntent.client_secret
                })
            }
        }catch(e){
            console.log(e)
        }           
    }


    const payInvoice = async (paymentIntent) =>{
        if(!paymentIntent || paymentIntent.status !== "succeeded") return
        const payload = {
            id: invoice.id,
            payment_id: paymentIntent.id,
            payment_method: paymentIntent.payment_method,
            payment_client_secret: paymentIntent.client_secret
        }
        try{
            const res = await axios.post(`${api}/invoices/pay/${invoice.id}`, payload, {
                headers: {
                  "Content-Type": "application/json",
                },
        })
            dispatch(showSnackbarMessage({
                message: "Payment successful" 
            }))
            getInvoiceDetails()
        }catch(e){
            dispatch(showSnackbarMessage({
                status: 'error',
                message: e.response.data.message 
            }))
        }
    }
    
    const getInvoiceDetails = async () =>{
        try{
            const res = await axios.post(`${api}/invoices/milestone/${milestoneId}`)
            set_invoice(res.data)

        }catch(e){
            console.log(e)
            dispatch(showSnackbarMessage({
                status: 'error',
                message: e.response.data.message 
            }))
        }
    }

    const fetchConsultant = async() =>{
        const res = await axios.get(api+ '/organizations/consultant/'+userId)
        set_consultant(res.data)
    }

    const parseDateTime = (str) => {
        try {
          // Split the input string into date and time parts
          const [datePart, timePart] = str.split(' ');
      
          // Combine the date and time in ISO 8601 format
          const isoDateTime = `${datePart}T${timePart}`;
      
          const parsedDate = DateTime.fromISO(isoDateTime);
      
          if (parsedDate.isValid) {
            return parsedDate.toFormat('MMMM d yyyy');
          } else {
            return 'Invalid Date';
          }
        } catch (error) {
          return 'Invalid Date';
        }
      }

    const parseAmount = (num) => {
        // return (num).toLocaleString('en-US'); 
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    const origin = window.location.origin;
    const copyToClipboard = () => {
        const urlLink =  `${origin}/invoice/${milestoneId}` ;
        navigator.clipboard.writeText(urlLink)
          .then(() => {
            console.log('Text successfully copied to clipboard');
          })
          .catch(err => {
            console.error('Unable to copy text to clipboard', err);
          });
      };
          
    useEffect(()=>{
        if(!initLoad){
            getInvoiceDetails()
            fetchConsultant()
            initLoad = true
        }
    }, [])
    useEffect(()=>{

        fetchPaymentIntent()
    }, [invoice])

    return(
        <>
        
      
            {invoice && paramMilestoneId && (   
                <div className='font-size-11 m-4'>
                    <Link to={
                        clientMode ? `/portal/${invoice.portal_domain}` : `/dashboard/${invoice.project_id}`
                        } className='sq-link text-color-sq-med pb-0'>
                        <i className="fa-solid fa-regular fa-arrow-left me-2 fa-xs"/>
                        Back to Client Portal
                    </Link>
                </div>   )}
            
            <div className="sq-invoice border-sq-light p-3 m-4 rounded">
                {invoice ? (
                <div>
                    <div className="d-flex align-items-end justify-content-between">
                        <div>
                            <div>
                                {paramMilestoneId && (<div className='sub mb-1'>{invoice.project_name}</div>)}
                                <span className='label'>
                                    Milestone {invoice.position + 1}: &nbsp;
                                </span>
                                <h2 className='d-inline text-color-sq-black'>
                                    {invoice.name}
                                </h2>
                            </div>
                        </div>

                        <div className={`
                            sub d-flex-inline align-items-center p-2 px-4 mb-2 rounded text-color-sq-white
                                ${ (!invoice.datetime_paid && !invoice.datetime_void) && 'bg-sq-lav' }
                                ${ invoice.datetime_paid && 'bg-sq-green' }
                                ${ invoice.datetime_void && 'bg-sq-med' }
                                
                            `}>
                                {
                                    parseInt(invoice.budget_percentage) === 0 ? 'No Payment Required'
                                    :
                                    (<> { !invoice.datetime_paid && !invoice.datetime_void && 
                                            <div className='text-center'>Invoice Sent <br/> <span className='font-size-8'>Payment Required</span></div>
                                        }
                                        { invoice.datetime_paid && 'Invoice Paid'}
                                        { invoice.datetime_void && 'Invoice Void' }
                                        </>
                                    )
                                    
                                }
                        </div>
                           
                    </div>
                    <hr/>

                    <div className='d-flex font-size-12'>
                        <div className='font-size-12 me-5'>
                            <div className='mb-1'>
                                <span className='label'>
                                    Invoice #
                                </span>
                                00{invoice.id}
                            </div>
                            
                        </div>
                        <div className='me-5'>
                            <div className='mb-1'>
                                <span className='label'>
                                    Total: &nbsp;
                                </span>
                                <span className='text-color-sq-green'>
                                    $ {parseAmount(invoice.total)}
                                </span>
                            </div>

                            <div className='mb-1'>
                                <span className='label'>
                                    Fee: &nbsp;
                                </span>
                                <span className=''>
                                    {invoice.budget_percentage}% of $ {parseAmount(invoice.budget)}
                                </span>
                            </div>

                        </div>

                        <div>
                            
                            <div className='mb-1'>
                                <span className='label'>
                                    Billing Date: &nbsp;
                                </span>
                                <span className=''>
                                    {parseDateTime(invoice.datetime_generated)}
                                </span>
                            </div>

                            {invoice.datetime_paid && (<div className='mb-1'>
                                <span className='label'>
                                    Payment Date: &nbsp;
                                </span>
                                <span className=''>
                                <span className=''>
                                    {parseDateTime(invoice.datetime_paid)}
                                </span>
                                </span>
                            </div>)}

                        </div>
                    </div>
                    
                    {!isCollapsed && (<>
                        <hr/>

                        {
                        invoice.payment_id && (
                                <div className='d-flex font-size-12 my-3'>
                                    <span className='label'>
                                        Payment Transaction #
                                    </span>
                                    <span className='text-uppercase'>
                                        {invoice.payment_id}
                                    </span>
                                    
                                </div>
                            )
                        }   
                        
                        <div className='d-flex font-size-12'>
                            <div className='me-4'>
                                <div className='mb-2'>
                                    <span className='label'>To: &nbsp;</span>
                                    <strong>{invoice.organization_name}</strong> ({invoice.contact_email})
                                </div>
                                <div>{invoice.organization_address}</div>
                                <div>{invoice.contact_number}</div>
                            </div>
                            {consultant && (
                                <div>
                                    <div className="mb-2">
                                        <span className='label'>From: &nbsp;</span>
                                        {consultant.organization_name}
                                    </div>
                                    <div> {consultant.organization_address} </div>
                                    <div> {consultant.contact_number} </div>
                                </div>
                            )}
                        </div>
                        <hr/>

                        <div className='d-flex font-size-12 my-3 align-items-center'>
                            <div className='label'>Invoice Link: &nbsp;</div>
                            <Tooltip title="Copy invoice URL to clipboard">
                                <div className='sq-input d-flex w-75' onClick={copyToClipboard}>
                                    <input className='w-100 me-1 outline-none border-none bg-transparent' disabled 
                                        value={`${origin}/invoice/${milestoneId}`}/>
                                    <div className='sq-btn sq-btn-icon p-2 bg-sq-lighter' >
                                        <i className='fa fa-solid fa-link'/>
                                    </div>
                                </div>
                            </Tooltip>

                        </div>
                        
                        
                        {/* {invoice.notes ?
                            (<div>
                                
                                <span className='label'>Notes: &nbsp;</span> {invoice.notes}
                            </div>) :
                            <div className='sq-link d-inline'>
                                Add note
                            </div>
                            <hr/>
                        } */}

                    
                    </>)}
                    <hr/>
                    <div className='d-flex justify-content-between align-items-center'>
                        {!invoice.datetime_paid && clientSecret && (
                            clientMode ? (
                                <div className='d-flex align-items-center'>
                            
                                    <div className='sq-btn bg-sq-green me-2' onClick={()=>{
                                        setShowCheckout(true)
                                    }}>
                                        Pay Invoice
                                    </div>
                                </div>
                            )
                            : ( 
                                <div className='d-flex align-items-center'>
                                
                                    <div className='sq-btn bg-sq-green me-2' onClick={markAsPaid}>
                                        Mark as paid
                                    </div>
                                    <div className='sq-link'>
                                        Resend invoice notification
                                    </div>
                                </div>
                            )
                        )}
                        <div></div>
                        {propMilestoneId && (
                            <div className='align-self-end' onClick={()=>{
                                set_isCollapsed(!isCollapsed)
                            }}>
                                <span className='sq-link'>
                                    {isCollapsed 
                                        ? (<>Expand &nbsp; <i className='fa-solid fa-regular fa-chevron-down'></i></>)
                                        : (<>Collapse &nbsp; <i className='fa-solid fa-regular fa-chevron-up'></i></>)
                                    }
                                </span>
                            </div>)}
                    </div>
                    
                </div>            
                )
            :   <div>
                    <div className="d-block">
                        {milestone && (<div>
                            <div className='mb-3'>
                                <span className='label'>
                                    Milestone { milestone.position + 1}: &nbsp;
                                </span>
                                <h2 className='d-inline text-color-sq-black'>
                                    {milestone.name}
                                </h2>
                            </div>
                        </div>)}
                        <div className='text-center'> 
                            <span className={`
                                sub d-flex-inline align-items-center p-2 px-4 mb-2 rounded text-color-sq-white bg-sq-black
                                `}>
                                    There is no invoice yet for this milestone
                            </span>
                            <p className='mt-2'>
                                All deliverables have to be completed for an invoice to be generated.
                            </p>
                        </div>
                    </div>
                
                    
                </div>}
            </div>
            {
                clientSecret !== "" && showCheckout && (
                <Elements stripe={stripePromise} options={options}>
                <Modal
                    open={showCheckout}
                    onClose={()=>{
                        setShowCheckout(false)
                    }}
                    className='d-flex align-items-center fill-width justify-item-center outline-none border-none'
                >
                    <div className='d-inline-flex fill-height align-center p-5 justify-content-center w-100 mx-auto outline-none border-none'>
                        <div className='sq-checkout__modal rounded p-4 sq-outter-shadow'>
                            <div className='d-flex justify-content-between alig-items-center'>
                                    {/* <h3 className='mb-0'>Payment Gateway</h3> */}
                                    <div className='me-4 text-color-sq-black'>
                                        <h3>Process Payment</h3>
                                        <p>You are paying <strong>${parseAmount(invoice.total)}</strong> for <strong>Invoice #00{invoice.id}</strong></p>
                                    </div>
                                    <button
                                        className='sq-btn-icon bg-transparent'
                                        onClick={()=>{
                                            setShowCheckout(false)
                                        }}
                                    >
                                        <i className='fa fa-regular fa-solid fa-xmark text-color-sq-dark fa-xl'/>
                                    </button>
                            </div>
                            {/* <div className='mt-4 text-color-sq-black'>
                                
                                        You are paying <strong>${parseAmount(invoice.total)}</strong> for <strong>Invoice #00{invoice.id}</strong>
                            </div> */}
                            <hr className='mb-3'/>
                            <CheckoutForm 
                                clientSecret={paymentIntent.client_secret} 
                                paymentIntent={paymentIntent}
                                invoice={invoice}
                                cb={{
                                    payInvoice,
                                    close: ()=>{
                                        setShowCheckout(false)
                                    }
                                }}
                            />
                        </div>
                        
                    </div>
                </Modal>
                </Elements>
            )}
        </>
        
    )
}
export default Invoice;

