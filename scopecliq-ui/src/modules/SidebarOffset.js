import axios from 'axios'
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../store/user-store';
import { storeProject } from '../store/project-store';
import { connect } from 'react-redux';

import Notification from '../components/Notification';
import ProjectCard from '../components/ProjectCard';

const SidebarOffset = () => {
    const api = global.config.API;
    const clientMode = useSelector(isClient);
    const [sidebarMode, set_sidebarMode] = useState('NOTIFICATIONS')
    const project= useSelector(storeProject);
    const [showOffcanvas, setShowOffcanvas] = useState(clientMode); // Set the initial state to true to show the Offcanvas

    const fetchNotificationsByProject = async() =>{
        if(!project) return
        const res = await axios.get(api+ '/notifications/project/' + project.id)
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
  },[project])


    return(
        <div className={`
        sq-sidebar-offcanvas
        ${showOffcanvas && 'sq-sidebar-offcanvas--open'}
        `}>
            <div className="sq-btn btn-menu mt-2 me-2 bg-sq-lav-dark" onClick={toggleOffcanvas}>
                <i className="fa-solid fa-bars"></i>
            </div>
            <div className={'offcanvas offcanvas-end ' + ( showOffcanvas ? 'show' : '')} data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel"
            //  onClick={hideCanvas}
            >
                <div className="offcanvas-header">
                    <div className='d-flex'>
                        <button
                            className='sq-btn-icon bg-transparent'
                            onClick={hideCanvas}
                        >
                            <i className='fa fa-regular fa-solid fa-xmark text-color-sq-dark fa-xl'/>
                        </button>
                    </div>

                </div>
                <div className={`
                    offcanvas-body p-0
                    offcanvas-body--${sidebarMode}
                `}>
                    {sidebarMode=='NOTIFICATIONS' && (
                    <div className='mode-notifications'>
                        <div className='notifications px-2'>
                            <div className='d-flex justify-content-between mb-4 align-items-center mt-3 mx-2'>
                                <h2 className='mb-0'>
                                    Notifications
                                </h2>
                                <div className='d-flex'>
                                    <button
                                        className='sq-btn-icon bg-transparent me-4'
                                        onClick={fetchNotificationsByProject}
                                    >
                                        <i className='fa fa-regular fa-solid fa-sync text-color-sq-gold-mid'/>
                                    </button>
                                    &nbsp;

                                    {/* <div className='px-4'></div> */}

                                    {/* <button
                                        className='sq-btn-icon bg-transparent'
                                        onClick={hideCanvas}
                                    >
                                        <i className='fa fa-regular fa-solid fa-xmark text-color-sq-dark fa-xl'/>
                                    </button> */}
                                </div>
                            </div>
                            <div className='notification-list p-2'>
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
                        <div>
                            {project && <ProjectCard 
                                project={project}
                                collapsed
                                dark
                            >
                                <div className='d-flex justify-content-end'>
                                    <button className='sq-link text-color-sq-green' onClick={()=>{
                                        set_sidebarMode('PROJECT_DETAILS')
                                    }}>
                                        Go to project details &nbsp;
                                        <i className='fa-solid fa-regular fa-arrow-right'/>
                                    </button>
                                </div>
                               
                            </ProjectCard>}
                        </div>
                    </div>)}

                    {sidebarMode=='PROJECT_DETAILS' && (
                        
                        <div className='mode-project-details'>
                            <div className='d-flex mt-4 ms-2'>
                                <button className='sq-link text-color-sq-green' onClick={()=>{
                                    set_sidebarMode('NOTIFICATIONS')
                                }}>
                                    <i className='fa-solid fa-regular fa-arrow-left'/> &nbsp;
                                    Go to notifications &nbsp;
                                    
                                </button>
                            </div>

                            {project && (<ProjectCard 
                                project={project}
                                full
                                dark
                            >
                                <div className='d-flex'>
                                    <div className='sq-btn'>
                                        Edit
                                    </div>
                                    
                                </div>
                            </ProjectCard>)}
                        </div>
                    )}
                    
                </div>
                </div>
  
        </div>
    )
}

  
  export default SidebarOffset;
  
  
  
  
  
  
  

