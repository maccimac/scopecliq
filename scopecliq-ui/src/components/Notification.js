import axios from 'axios'
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../store/user-store';


export const Notification =()=>{

    const api = global.config.API;
    const clientMode = useSelector(isClient);

    const [attachmentType, set_attachmentType] = useState("deliverable")
    const [title, set_title] = useState("")
    const [body, set_body] = useState("")
    const notifDeliverableComplete = {
        id: 1,
        project_id:  2,
        milestone_id:  3,
        deliverable_id:  7,
        type:  'STATUS_UPDATE',
        status:  'COMPLETE',
        description:  'Market, competition, and demography research',
        additional_message:  'This is done, thanks for your help.',  
    }

    const notifInvoiceSent = {
        id: 1,
        project_id:  2,
        milestone_id:  null,
        deliverable_id:  null,
        type:  'INVOICE',
        status:  'SENT',
        description:  'Market, competition, and demography research',
        additional_message:  'This is done, thanks for your help.',  
    }
    const notifItemChanged = {
        id: 1,
        project_id:  2,
        milestone_id:  null,
        deliverable_id:  null,
        type:  'CHANGE',
        status:  'MADE',
        description:  'Market, competition, and demography research',
        additional_message:  'This is done, thanks for your help.',  
    }
    
    const [notification, set_notification] = useState(notifItemChanged)

    const titleOpts = {
        'STATUS_UPDATE' : {
            COMPLETE: `✅ ${attachmentType} has been completed`,
            INCOMPLETE: `⚪️ Hmm.  A ${attachmentType} has been marked incompleted`,
            CANCELLED: `❌  ${attachmentType} cancelled`,
            DELETED: ` 🗑  ${attachmentType} deleted`,
        },
        'INVOICE':{
            SENT: '📬 Invoice has been sent',
            PAID: '💸 Invoice has been paid',
            VOID: '❌ Invoice is voided'
        },
        'CHANGE':{
            'MADE': `✏️ ${attachmentType} has been changed`,
        }
    }
    const resolveTitle = () => {
        if(notification.deliverable_id){
            //
            set_attachmentType('deliverable')
           
        }else if(notification.milestone_id){
            //
        }else if(notification.project_id){
            //
        }
        set_title(titleOpts[notification.type][notification.status])
    }
    
    const exit = () => {}

    useEffect(()=>{
        resolveTitle()
    }, [])
    
    return(
        <div className={
            `sq-notification p-3 rounded sq-outter-shadow mb-3
                 ${notification.type == 'STATUS_UPDATE' && 'bg-sq-green-light' }
                 ${notification.type == 'INVOICE' && 'bg-sq-lav-light' }
                 ${notification.type == 'CHANGE' && 'bg-sq-gold-lightest' }
            `}>
            <div className='d-flex notification-header justify-content-between mb-2'>
                    <div className={`title text-capitalize

                    ${notification.type == 'STATUS_UPDATE' && 'text-color-sq-green-mid' }
                    ${notification.type == 'INVOICE' && 'text-color-sq-lav-mid' }
                    ${notification.type == 'CHANGE' && 'text-color-sq-gold-mid' }
            
               `}>{title}</div>
                    <i class="btn-notif-exit fa-solid fa-regular fa-xmark fa-md m-1 sq-btn-icon text-color-sq-med" onClick={exit}></i>
            </div>
            <div className='notification-body'>
                <p>This status is for <strong>{notification.description}</strong>.</p>
            </div>
            <div className='notification-footer d-flex mt-3'>
                <div className={`
                    sq-btn
                    ${notification.type == 'STATUS_UPDATE' && 'bg-sq-green' }
                    ${notification.type == 'INVOICE' && 'bg-sq-lav' }
                    ${notification.type == 'CHANGE' && 'bg-sq-gold' }
               `}>
                    Approve
                </div>
            </div>
        </div>
    )
}

export default Notification;