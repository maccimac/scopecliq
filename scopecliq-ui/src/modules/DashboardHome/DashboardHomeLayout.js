import axios from 'axios'
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isClient} from '../../store/user-store';
import { storeProject} from '../../store/project-store';
import { currentUserId} from '../../store/login-store';
import { showSnackbarMessage} from '../../store/snackbar-store';

import Modal from '@mui/material/Modal';
import NavBar from '../../components/NavBar';
import ProjectEdit from '../ProjectEdit';
import OrganizationCardSmall from '../../components/OrganizationCardSmall';


import DashboardHomeSidebar from './DashboardHomeSidebar';
import {ProjectCard} from '../../components/ProjectCard'
import OrganizationCard from '../../components/OrganizationCard';


const DashboardHomeLayout = ({
    projects=[],
    yourOrg
}) => {
    const api = global.config.API
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const project= useSelector(storeProject)
    const userId=useSelector(currentUserId)
    const [modelCreateOpen, set_modalCreateOpen] = useState(false)

    function modalCreateOnClose(){
        set_modalCreateOpen('false')        
    }

    useEffect(()=>{
        if(!userId){
            navigate("/")
        }
    },[])


    return(
        <div class="sq-body sq-dashboard-home">
            <div class="container-fluid px-0">
                <NavBar>
                    <div className='d-flex w-100 justify-content-end py-3'>
                        <OrganizationCardSmall
                            organization={yourOrg}
                        >

                        </OrganizationCardSmall>

                    </div>
                   
                </NavBar>
                <div className="sq-content row mh-100">
                    <div class="col-md-3 mh-100">
                        <DashboardHomeSidebar className="w-100 h-100"/>
                    </div>
                    <div className='col-md-9 mt-3'>
                        <div className='pe-4'>
                            <div className='d-flex justify-content-between mb-4 align-items-center'>
                                <div>
                                    <h3>🔨 Dive in existing projects </h3>
                                    {/* <div>Sort by most recent</div> */}
                                </div>

                                <div 
                                    className='sq-btn  sq-btn-outline rounded d-flex align-items-center me-2 py-4'
                                    onClick={()=>{
                                        set_modalCreateOpen(true)
                                    }}
                                >
                                    <span className='font-size-18 text-color-sq-lav me-2'>
                                        🚀 Start a new project
                                    </span>
                                    <div className='sq-btn-add no-hover'> +
                                    </div>

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
                        
                        <div className="sq-modal-new-project__modal bg-sq-lav-dark my-auto p-2 rounded">
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
    )
}

export default DashboardHomeLayout;