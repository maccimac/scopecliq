import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../store/client-store';
import { notifControl, updateNotif } from '../store/notif-store';
import { storeProject, setProject } from '../store/project-store';
import { connect } from 'react-redux';

import Notification from '../components/Notification';
import ProjectCard from '../components/ProjectCard';
import OrganizationCardSmall from '../components/OrganizationCardSmall';

const SidebarOffsetBlueprint = ({project}) => {
    const api = global.config.API;
    const dispatch = useDispatch()
    const clientMode = useSelector(isClient)
    const notifUpdate = useSelector(notifControl)
    const [sidebarMode, set_sidebarMode] = useState('NOTIFICATIONS')
    // const project = useSelector(storeProject);
    const [showOffcanvas, setShowOffcanvas] = useState(clientMode); // Set the initial state to true to show the Offcanvas
    const [clientOrg, set_clientOrg] = useState(null)
    const { domain, projectId } = useParams();

    const fetchProject = async () => {
       console.log({domain, projectId})
       if(domain){
        const res = await axios.get(api+ '/projects/portal/' + domain)
        dispatch(setProject(res.data))
       }else if(projectId){
        const res = await axios.get(api+ '/projects/' + projectId)
        dispatch(setProject(res.data))
       }
    }

    const fetchNotificationsByProject = async() =>{
        if(!project) return
        const res = await axios.get(api+ '/notifications/project/' + project.id)
        set_notifications(res.data)
    }

    const fetchOrganizationById = async () => {
        if(!project) return;
        const res = await axios.get(api+ '/organizations/'+project.organization_id)
        console.log(res)
        set_clientOrg(res.data)
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
    if(!project){
        fetchProject()
    }
  },[])

  useEffect(()=>{
    // if(!project){
    //     fetchProject()
    // }
    fetchOrganizationById()
    fetchNotificationsByProject()
  },[project])

  useEffect(()=>{
    fetchNotificationsByProject()
  },[notifUpdate])


    return(
        <div className={`
        sq-sidebar-offcanvas
        ${showOffcanvas && 'sq-sidebar-offcanvas--open'}
        `}>
            <div className="sq-btn btn-menu mt-4 me-3 bg-sq-lav-dark" onClick={toggleOffcanvas}>
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
                            <div className='d-flex justify-content-between mb-2 mt-3 mx-2'>
                                <div>
                                    <h3 className='mb-1 find'>
                                        { clientMode ? 'Notifications' : "Client's Unread Notifications"} 
                                        
                                    </h3>
                                    <p className='text-color-sq-light'>See your project activities and mark read to acknowledge</p>
                                </div>

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
                                    ): <p>No new notifications</p>

                                }
                            

                            </div>
                        </div>
                        <div className='offset-footer'>
                            {clientOrg &&
                                <div onClick={()=>{
                                    set_sidebarMode('PROJECT_DETAILS')
                                }}>
                                    <OrganizationCardSmall
                                        organization={clientOrg}
                                        className='w-100 d-flex justify-content-space-between'
                                    />
                                    <div className='d-flex mt-1 justify-content-center'>
                                        <button className='sq-link text-color-sq-lav-light-bright'>
                                            Go to project details &nbsp;
                                            <i className='fa-solid fa-regular fa-arrow-right'/>
                                        </button>
                                    </div>
                                </div>
                            }
                            {/* {project && <ProjectCard 
                                project={project}
                                collapsed
                                dark
                            >
                                <div className='d-flex justify-content-end'>
                                    <button className='sq-link text-color-sq-green' onClick={()=>{
                                        set_sidebarMode('PROJECT_DETAILS')
                                    }}>
                                        Go to project detaimodels &nbsp;
                                        <i className='fa-solid fa-regular fa-arrow-right'/>
                                    </button>
                                </div>
                               
                            </ProjectCard>} */}

                        </div>
                    </div>)}

                    {sidebarMode=='PROJECT_DETAILS' && (
                        
                        <div className='mode-project-details'>
                            <div className='d-flex mt-4 ms-2'>
                                <button className='sq-link text-color-sq-lav-light-bright' onClick={()=>{
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

  
  export default SidebarOffsetBlueprint;
  
  
  
  
  
  
  

