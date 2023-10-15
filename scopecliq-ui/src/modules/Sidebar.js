import axios from 'axios'
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../store/user-store';

import Notification from '../components/Notification';

const Sidebar = ({project}) => {
    const api = global.config.API;
    const clientMode = useSelector(isClient);
    const [showOffcanvas, setShowOffcanvas] = useState(false); // Set the initial state to true to show the Offcanvas

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


    const [notifications, set_notifications] = useState([notifInvoiceSent, notifItemChanged, notifDeliverableComplete])

  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };
  const hideCanvas = () => {
    setShowOffcanvas(false);
  };


    return(
        <div className="sq-sidebar">
            <div className="sq-btn btn-menu mt-4 me-3 bg-sq-green" onClick={toggleOffcanvas}>
                <i className="fa-solid fa-bars"></i>
            </div>
            <div className={'offcanvas offcanvas-end ' + ( showOffcanvas ? 'show' : '')} data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel"
            //  onClick={hideCanvas}
            >
                <div className="offcanvas-header">
                    {/* <h5 className="offcanvas-title" id="staticBackdropLabel">Offcanvas</h5>
                     */}
                     <span></span>
                     <button  className="btn-close" onClick={hideCanvas}
                    ></button>

                     {/* </button>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"
                    onClick={hideCanvas}
                    ></button> */}
                </div>
                <div className="offcanvas-body">
                    <div>
                        <h2>
                            Notifications
                        </h2>
                        <div className='notification-list'>
                            {
                                notifications?.length 
                                ?(
                                    notifications.map((n,i)=>(
                                        <Notification key="i" _notification={n}/>
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
export default Sidebar;

