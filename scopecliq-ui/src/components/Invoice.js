import axios from 'axios'

import { DateTime } from 'luxon';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import NavBar from '../components/NavBar';
import { storeProject} from '../store/project-store';
import { useDispatch, useSelector} from 'react-redux';
import { currentUserId } from '../store/login-store';


const Invoice = () => {
    const api = global.config.API
    const { milestoneId } = useParams();
    const userId = useSelector(currentUserId)

    const dispatch = useDispatch()
    const project = useSelector(storeProject)
    const [invoice, set_invoice] = useState(null)
    const [consultant, set_consultant] = useState(null)
    
    const getInvoiceDetails = async () =>{
        try{
            const res = await axios.post(`${api}/invoices/milestone/${milestoneId}`)
            console.log(res.data)
            set_invoice(res.data)
        }catch(e){
            console.log(e)
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
        return num.toLocaleString('en-US'); 
    }
          
    useEffect(()=>{
        getInvoiceDetails()
        fetchConsultant()
    }, [])

    return(
        <div className="sq-invoice border-sq-light p-4 m-4 rounded">
            {invoice ? (
            <div>
                <div className="d-flex justify-content-between">
                    <div>
                        <div className="sub text-color-sq-lav mb-2">
                            { (!invoice.datetime_paid && !invoice.datetime_void) && 'Invoice Sent' }
                            { invoice.datetime_paid && 'Invoice Paid' }
                            { invoice.datetime_void && 'Invoice Void' }
                        </div>
                        <div>
                            <span className='label'>
                                Milestone {invoice.position}: &nbsp;
                            </span>
                            <h2 className='d-inline text-color-sq-black'>
                                {invoice.name}
                            </h2>
                        </div>
                    </div>
                    <div>
                        <span className='sq-link'>
                            Expand &nbsp; <i className='fa-solid fa-regular fa-chevron-up'></i>
                        </span>
                    </div>

                </div>
                <hr/>
                <div className='font-size-12 mb-2'>
                    <span className='label'>
                        Invoice Number: &nbsp;
                    </span>
                    {invoice.id}
                </div>

                <div className='d-flex font-size-12'>
                    <div className='me-4'>
                        <div className='mb-1'>
                            <span className='label'>
                                Total: &nbsp;
                            </span>
                            <span className='text-color-sq-green'>
                                ${parseAmount(invoice.total)}
                            </span>
                        </div>

                        <div className='mb-1'>
                            <span className='label'>
                                Fee: &nbsp;
                            </span>
                            <span className=''>
                                {invoice.budget_percentage}% of ${invoice.budget}
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

                <hr/>

                <div className='d-flex font-size-12'>
                    <div className='me-4'>
                        <div>
                            <span className='label'>To: &nbsp;</span>
                            {invoice.organization_name}
                        </div>
                        <div>
                            {invoice.organization_address}
                        </div>
                    </div>
                        {consultant && (
                            <div>
                        <div>
                            <span className='label'>From: &nbsp;</span>
                            {consultant.organization_name}
                        </div>
                        <div>
                            {consultant.organization_address}
                        </div>
                        </div>)}
                    </div>
                    {invoice.notes && 
                    (<div>
                        <hr/>
                        <span className='label'>Notes: &nbsp;</span> {invoice.notes}
                    </div>)}

                    <hr/>
                    <div className='d-flex align-items-center'>
                        <div className='sq-btn bg-sq-green me-2'>
                            Mark as paid
                         </div>
                         <div className='sq-link'>
                            Resend invoice
                        </div>   
                    </div>
                </div>            
            )
        : <div>
            No invoice for this milestone
        </div>}
        </div>
    )
}
export default Invoice;

