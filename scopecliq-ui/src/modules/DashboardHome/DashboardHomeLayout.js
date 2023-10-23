import axios from 'axios'
import { useState, useEffect } from "react";
import NavBar from '../../components/NavBar';
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../../store/user-store';
import { storeProject} from '../../store/project-store';
import { currentUserId} from '../../store/user-store';


import DashboardHomeSidebar from './DashboardHomeSidebar';
import {ProjectCard} from '../../components/ProjectCard'


const DashboardHomeLayout = ({
    projects=[],
    
}) => {
    const api = global.config.API
    const project=(useSelector(storeProject))

    // const [yourOrg, set_yourOrg] = useState(null)

    // const fetchConsultantOrg = async() =>{
    //     const res = await axios.get(api+ '/organizations/consultant/'+userId)
    //     set_yourOrg(res.data)
    // }

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

                                <div className='me-2'>
                                    <h2 className='sq-link font-size-18'>
                                        🚀 Start a new project
                                    </h2>

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
            </div>
        </div>
    )
}

export default DashboardHomeLayout;