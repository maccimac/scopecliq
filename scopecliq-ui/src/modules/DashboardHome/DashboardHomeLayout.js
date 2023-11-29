import axios from 'axios'
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isClient} from '../../store/client-store';
import { storeProject, setProject} from '../../store/project-store';
import { currentUserId, currentUserOrg, setUserId, setUserOrg} from '../../store/login-store';
import { showSnackbarMessage} from '../../store/snackbar-store';

import Modal from '@mui/material/Modal';
import NavBar from '../../components/NavBar';
import ProjectEdit from '../ProjectEdit';
import OrganizationCardSmall from '../../components/OrganizationCardSmall';

import DashboardHomeSidebar from './DashboardHomeSidebar';
import SidebarOffset from '../../components/SidebarOffset';
import SidebarOffsetOrganizationEdit from './SidebarOffsetOrganizationEdit';
import {ProjectCard} from '../../components/ProjectCard'
import OrganizationCard from '../../components/OrganizationCard';


const DashboardHomeLayout = ({
    // projects=[],
}) => {
    const api = global.config.API
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userId = useSelector(currentUserId)
    const userOrg = useSelector(currentUserOrg)

    const [modelCreateOpen, set_modalCreateOpen] = useState(false)
    const [showEditOrg, set_showEditOrg] = useState(false)
    const [projects, set_projects] = useState([])

    const fetchAllProjectsByConsultant = async() =>{
        const res = await axios.get(api+ '/projects/consultant-user-id/' + userId)
        set_projects(res.data)
    }

    const fetchConsultantOrg = async() =>{
        try{
            const res = await axios.get(api+ '/organizations/consultant/' + userId)
            dispatch(setUserOrg(res.data))
            console.log(res)
        }catch(e){
            console.log(e)
        }
       
    }

       
    const logout = () => {
        dispatch(setUserId(null))
        navigate("/")
    }

    const onOrgUpdate = () =>{
        set_showEditOrg(false)
        fetchConsultantOrg()

    }

    useEffect(()=>{
        if(!userId){
            navigate("/")
        }

        fetchConsultantOrg();
        fetchAllProjectsByConsultant();
        
    },[])



    return(
        <div className='sq-dashboard-home'>
            <div className="sq-body">
                <div className="container-fluid px-0">
                    <NavBar>
                        <div className='d-flex w-100 justify-content-end py-3 align-items-center'>
                            { userId &&                 
                                <div className='align-items-center sq-link text-color-sq-lav-muted mx-4' onClick={logout}>
                                    <i className="fa-solid fa-arrow-right-from-bracket me-1"></i>  Logout
                                </div>
                            }
      
                            { userOrg &&                         
                                <OrganizationCardSmall
                                    organization={userOrg}
                                    onClick={()=>{
                                        set_showEditOrg(true)
                                    }}
                                />
                            }

                        </div>
                    
                    </NavBar>

                    <div className="sq-content row mh-100">
                        <div className="col-md-3 mh-100">
                            <DashboardHomeSidebar className="w-100 h-100"/>
                        </div>
                        <div className='col-md-9 mt-4'>
                            <div className='pe-4'>
                                <div className='d-flex justify-content-between mb-4 align-items-center'>
                                    <div>
                                        <h3>🔨 Dive in existing projects </h3>
                                        {/* <div>Sort by most recent</div> */}
                                    </div>

                                    <div 
                                        className='sq-btn sq-btn-outline rounded d-flex align-items-center me-2'
                                        onClick={()=>{
                                            set_modalCreateOpen(true)
                                        }}
                                    >
                                        <span className='h3 text-color-sq-lav me-2 mb-0'>
                                            🚀 Start a new project
                                        </span>
                                    </div>
                                </div>
                                <div className='row'>
                                    {projects.map(p => (
                                        <div className="col-md-6" key={p.id}>
                                            <ProjectCard  
                                                collapsed
                                                project={p}
                                            />
                                        </div>
                                    ))}

                                </div>
                            </div>   
                        </div>
                    </div>
                    <Modal 
                        open={modelCreateOpen} 
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        className=''
                    >
                        <div className='sq-modal-new-project d-flex align-items-center justify-content-center h-100'>
                            
                            <div className="sq-modal-new-project__modal bg-sq-lav-darker my-auto p-2 rounded">
                                <div className='d-flex justify-content-end'>
                                    <button
                                    className='sq-btn-icon bg-transparent'
                                    onClick={()=>{set_modalCreateOpen(false)}}
                                    >
                                        <i className='fa fa-regular fa-solid fa-xmark text-color-sq-white fa-xl'/>
                                    </button>
                                </div>
                                <div>
                                    <ProjectEdit/>
                                </div>
                                
                            </div>

                        </div>
                    </Modal>
                </div>
            </div>
            {showEditOrg &&
                <SidebarOffsetOrganizationEdit
                    showHeader={false}
                    show={showEditOrg}
                    organization={userOrg}
                    onClose={()=>{
                        set_showEditOrg(false)
                    }}
                    cb={
                       { onUpdate: onOrgUpdate}
                    }
                />
            }
            
        </div>
    )
}

export default DashboardHomeLayout;