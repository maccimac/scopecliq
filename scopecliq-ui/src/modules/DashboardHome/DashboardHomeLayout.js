import axios from 'axios'
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../../store/user-store';
import { storeProject} from '../../store/project-store';
import { currentUserId} from '../../store/user-store';
import Modal from '@mui/material/Modal';
import NavBar from '../../components/NavBar';
import ProjectEdit from '../ProjectEdit';


import DashboardHomeSidebar from './DashboardHomeSidebar';
import {ProjectCard} from '../../components/ProjectCard'


const DashboardHomeLayout = ({
    projects=[]
}) => {
    const api = global.config.API
    const project=(useSelector(storeProject))
    const [modelCreateOpen, set_modalCreateOpen] = useState(false)

    function modalCreateOnClose(){
        set_modalCreateOpen('false')
    }

    

    return(
        <div class="sq-dashboard-home">
            <div class="container-fluid px-0">
                <NavBar/>
                <div className="sq-content row mh-100">
                    <div class="col-md-3 mh-100">
                        <DashboardHomeSidebar className="w-100 h-100"/>
                    </div>
                    <div className='col-md-9 py-4 mt-5'>
                        <div className='pe-4'>
                            <div className='d-flex justify-content-between mb-4'>
                                <div>
                                    <h2>🔨 Dive in existing projects </h2>
                                    {/* <div>Sort by most recent</div> */}
                                </div>

                                <div 
                                    className='sq-btn  sq-btn-outline d-flex align-items-center me-2'
                                    onClick={()=>{
                                        set_modalCreateOpen(true)
                                    }}
                                >
                                    <span className='font-size-18 text-color-sq-lav'>
                                        🚀 Start a new project
                                    </span>

                                </div>
                            </div>
                            <div className='row'>
                                {projects.map(p => (
                                    <div className="col-md-6">
                                    <ProjectCard
                                        key={p.id}
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
                >
                    <div className='d-flex  align-items-center justify-content-center h-100'>
                        
                        <div className="bg-sq-lav-dark my-auto p-2 rounded">
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