import axios from 'axios'
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../store/client-store';
import { Navigate, Link, useNavigate } from "react-router-dom"

// import { _project, _setProject } from '../store/project-store';


export const Notification =({_notification, cb})=>{

    const api = global.config.API;
    const navigate = useNavigate();
    const clientMode = useSelector(isClient)

    const [attachmentType, set_attachmentType] = useState("An item")
    const [title, set_title] = useState("")
    const [body, set_body] = useState("")
    const [cta, set_cta] = useState(null)
    
    const [notification, set_notification] = useState(_notification)


    const titleOpts = {
        'STATUS_UPDATE' : {
            COMPLETE: `✅ ${attachmentType} has been completed`,
            INCOMPLETE: `⚪️ Hmm.  A ${attachmentType} has been marked incomplete`,
            CANCELLED: `❌  ${attachmentType} cancelled`,
            DELETED: ` 🗑  ${attachmentType} deleted`,
        },
        'INVOICE':{
            SENT: '📬 Invoice has been sent',
            PAID: '💸 Invoice has been paid',
            VOID: '❌ Invoice is voided'
        },
        'CHANGE':{
            MADE: `✏️ ${attachmentType} has been changed`,
            CREATED: `✨ ${attachmentType} has been added`,
            DELETED: `🗑  ${attachmentType} deleted`,
            /**
             * MADE_APPROVED
             * MADE_DECLINED
             * CREATED_APPROVED
             * CREATED_DECLINED
             */
        }
    }
    
    const resolveAttachment = () => {
        if(notification.deliverable_id){
            set_attachmentType('deliverable')
        }else if(notification.milestone_id){
            set_attachmentType('milestone')
            //
        }else if(notification.project_id){
            set_attachmentType('project')
            //
        }
        // set_title(titleOpts[notification.type][notification.status])
    }
    const resolveCta = () => {
        switch(notification.type){
            case 'INVOICE':
                set_cta({
                    label: "Go to invoice",
                    action: ()=>{
                        navigate('/invoice/' + notification.milestone_id)
                    }
                })
                break;
            default:
                break;
        }
    }
    
    const markRead = async () => {
        const res = await axios.post(`${api}/notifications/read/${notification.id}`)
        console.log(res)
        // cb.set_notifications([])
        cb.fetchNotificationsByProject()
    }

    useEffect(()=>{
        resolveAttachment()
        resolveCta()
    }, [_notification])
    
    useEffect(()=>{
        resolveAttachment()
    },[])
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
            
               `}>{titleOpts[notification.type][notification.status]}</div>
               { clientMode &&
                    <i 
                    class="sq-btn-icon bg-transparent m-0 btn-notif-exit fa-solid fa-regular fa-xmark fa-md m-1 sq-btn-icon text-color-sq-med" 
                    onClick={markRead}
                >        
                </i>
                
               }
                    
                 
            </div>
            <div className='notification-body'>
                <p>This status is for <strong>{notification.description}</strong>.</p>
            </div>


            {cta &&
                (<div className='notification-footer d-flex mt-3'>
                    <div className={`
                        sq-btn
                        ${notification.type == 'STATUS_UPDATE' && 'bg-sq-green' }
                        ${notification.type == 'INVOICE' && 'bg-sq-lav' }
                        ${notification.type == 'CHANGE' && 'bg-sq-gold' }
                    `}
                    onClick={cta.action}>
                        {cta.label}
                    </div>
                </div>)
            }
        </div>
    )
}

export default Notification;