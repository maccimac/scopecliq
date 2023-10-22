import axios from 'axios'
import { useState, useEffect } from "react";
import NavBar from '../../components/NavBar';
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../../store/user-store';
import { storeProject} from '../../store/project-store';
import DashboardHomeSidebar from './DashboardHomeSidebar';
import {ProjectCard} from '../../components/ProjectCard'


const DashboardHomeLayout = ({
    projects=[],
    
}) => {
    const api = global.config.API
    const project=(useSelector(storeProject))
    console.log(projects)

    return(
        <div class="sq-dashboard-home">
            <div class="sq-body container-fluid px-0">
                <NavBar/>
                <div className="sq-content row mh-100">
                    <div class="col-md-4 mh-100">
                        <DashboardHomeSidebar className="w-100 h-100"/>
                    </div>
                    <div className='col-md-8 py-4'>
                        <div>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <h2>🔨 Dive in existing projects </h2>
                                    {/* <div>Sort by most recent</div> */}
                                </div>

                                <div className='me-2'>
                                    <h2>
                                        🚀 Start a new project
                                    </h2>

                                </div>
                            </div>
                            <div className='row'>
                                {projects.map(p => (
                                    <div className="col-md-6">
                                    <ProjectCard
                                        key={p.id}
                                        project={p}
                                    />
                                    </div>
                                ))}

                            </div>
                         </div>   
                    </div>
                    
                    {/* <ProjectBlueprint project={project}/> */}
                </div>
            </div>
                {/* <Sidebar/> */}
        </div>
    )
}

export default DashboardHomeLayout;