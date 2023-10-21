import axios from 'axios'
import { useState, useEffect } from "react";
import NavBar from '../components/NavBar';
import Sidebar from './Sidebar';
import ProjectBlueprint from '../components/ProjectBlueprint';
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../store/user-store';
import { storeProject} from '../store/project-store';


const DashboardLayout = () => {
    const api = global.config.API
    const project=(useSelector(storeProject))

    return(
        <div class="sq-dashboard-portal">
            <div class="sq-body">
                <NavBar/>
                <div class="sq-content h-100 ">
                    <div className='px-4'>
                        <h2 className='ms-2 mt-2'>Your Project Blueprint: &nbsp;
                            <span className='text-color-sq-lav-dark'>{project.name}</span>
                        </h2>
                    </div>
                    
                    <ProjectBlueprint project={project}/>
                </div>
            </div>
                <Sidebar/>
        </div>
    )
}

export default DashboardLayout;