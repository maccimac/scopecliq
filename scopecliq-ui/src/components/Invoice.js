import axios from 'axios'

import { DateTime } from 'luxon';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import NavBar from '../components/NavBar';
import { storeProject} from '../store/project-store';
import { useDispatch, useSelector} from 'react-redux';
import { currentUserId } from '../store/login-store';
import { showSnackbarMessage} from '../store/snackbar-store';


const Invoice = ({
    propMilestoneId,
    milestone
}) => {
    const api = global.config.API
    const { paramMilestoneId } = useParams();
    const userId = useSelector(currentUserId)

    const milestoneId = paramMilestoneId || propMilestoneId;

    const dispatch = useDispatch()
    const project = useSelector(storeProject)
    const [invoice, set_invoice] = useState(null)
    const [consultant, set_consultant] = useState(null)
    const [isCollapsed, set_isCollapsed] = useState(propMilestoneId)


    const markAsPaid = async () =>{
        try{
            const res = await axios.post(`${api}/invoices/mark-paid/${invoice.id}`)
            getInvoiceDetails()
        }catch(e){
            console.log(e)
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
            console.log('inv', res.data)

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
          
    useEffect(()=>{
        getInvoiceDetails()
        fetchConsultant()
    }, [])

    return(
        <div className="sq-invoice border-sq-light p-3 m-4 rounded">
            {invoice ? (
            <div>
                <div className="d-flex align-items-end justify-content-between">
                    <div>
                        <div>
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
                            { (!invoice.datetime_paid && !invoice.datetime_void) && 'Invoice Sent' }
                            { invoice.datetime_paid && 'Invoice Paid'}
                            { invoice.datetime_void && 'Invoice Void' }
                    </div>
                </div>
                <hr/>

                <div className='d-flex font-size-12'>
                    <div className='font-size-12 me-5'>
                                <span className='label'>
                                    Invoice #
                                </span>
                                00{invoice.id}
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
                    {invoice.notes ?
                        (<div>
                            
                            <span className='label'>Notes: &nbsp;</span> {invoice.notes}
                        </div>) :
                        <div className='sq-link d-inline'>
                            Add note
                        </div>
                    }

                
                </>)}
                <hr/>
                <div className='d-flex justify-content-between align-items-center'>
                    {!invoice.datetime_paid && (<>    
                    
                    <div className='d-flex align-items-center'>
                        
                            <div className='sq-btn bg-sq-green me-2' onClick={markAsPaid}>
                                Mark as paid
                            </div>
                            <div className='sq-link'>
                                Resend invoice
                            </div>
                    </div>
                    </>)}
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
    )
}
export default Invoice;

