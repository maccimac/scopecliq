import axios from 'axios'
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../store/user-store';
import { storeProject } from '../store/project-store';
import { connect } from 'react-redux';

import Notification from '../components/Notification';

const SidebarOffset = () => {
    const api = global.config.API;
    const clientMode = useSelector(isClient);
    const aProject= useSelector(storeProject);
    const [showOffcanvas, setShowOffcanvas] = useState(clientMode); // Set the initial state to true to show the Offcanvas

    const fetchNotificationsByProject = async() =>{
        const res = await axios.get(api+ '/notifications/project/' + aProject.id)
        set_notifications(res.data)
    }

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


    const [notifications, set_notifications] = useState([])

  const toggleOffcanvas = () => {
    fetchNotificationsByProject()
    setShowOffcanvas(!showOffcanvas);
  };
  const hideCanvas = () => {
    setShowOffcanvas(false);
  };

  useEffect(()=>{
    fetchNotificationsByProject()
  },[aProject])


    return(
        <div className="sq-sidebar-offcanvas">
            <div className="sq-btn btn-menu mt-4 me-3 bg-sq-green" onClick={toggleOffcanvas}>
                <i className="fa-solid fa-bars"></i>
            </div>
            <div className={'offcanvas offcanvas-end ' + ( showOffcanvas ? 'show' : '')} data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel"
            //  onClick={hideCanvas}
            >
                <div className="offcanvas-header">
                    {/* <h5 className="offcanvas-title" id="staticBackdropLabel">Offcanvas</h5>
                     */}
                     {/* <span></span>
                     <button  className="btn-close" onClick={hideCanvas}
                    ></button> */}

                </div>
                <div className="offcanvas-body">
                    <div>
                        <div className='d-flex justify-content-between mb-4 align-items-center'>
                            <h2>
                                Notifications
                            </h2>
                            <div className='d-flex'>
                                <button
                                    className='sq-btn-icon bg-transparent mr-2'
                                    onClick={fetchNotificationsByProject}
                                >
                                    <i className='fa fa-regular fa-solid fa-sync text-color-sq-gold-mid'/>
                                </button>

                                <button
                                    className='sq-btn-icon bg-transparent'
                                    onClick={hideCanvas}
                                >
                                    <i className='fa fa-regular fa-solid fa-xmark text-color-sq-dark fa-xl'/>
                                </button>
                            </div>
                          

                        </div>
                        <div className='notification-list'>
                            {
                                notifications?.length 
                                ?(
                                    notifications.map((n,i)=>(
                                        <Notification key={n.id} _notification={n} cb={{
                                            fetchNotificationsByProject,
                                            set_notifications
                                        }}/>
                                    ))
                                ): "No new notifications"

                            }
                          

                        </div>
                    </div>
                    
                </div>
                </div>
  
        </div>
    )
}

  
  export default SidebarOffset;
  
  
  
  
  
  
  

