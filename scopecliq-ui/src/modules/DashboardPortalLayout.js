import axios from 'axios'
import { useState, useEffect } from "react";

import { isClient} from '../store/user-store';
import { storeProject} from '../store/project-store';

import { Link } from "react-router-dom";

import NavBar from '../components/NavBar';
import SidebarOffset from './SidebarOffset';
import ProjectBlueprint from '../components/ProjectBlueprint';
import { useDispatch, useSelector} from 'react-redux';
import ProjectEdit from './ProjectEdit';


const DashboardLayout = () => {
    const api = global.config.API
    const clientMode = useSelector(isClient)
    const project=(useSelector(storeProject))
    console.log(project)

    return(
        <div class="sq-dashboard-portal">
            <div class="sq-body">
                <NavBar>
                    <div className='sq-link'>Your Invoices</div>
                </NavBar>
                <div class="sq-content h-100">
                    
                    <div className='project-blueprint-holder'>
                        <div className='project-header pt-2 my px-3'>
                            {!clientMode && (
                                <strong className='font-size-11'>
                                    <Link to="/dashboard" className='sq-link text-color-sq-med pb-0'>
                                        <i class="fa-solid fa-regular fa-arrow-left me-2 fa-xs"/>
                                        Back to dashboard
                                    </Link>
                                </strong>   
                            )}
                            <h2 className='mt-2'>Your Project Blueprint: &nbsp;
                                <strong className='text-color-sq-lav-dark'>{project && project.name}</strong>
                            </h2>
                        </div>
                        {
                            project ? (<ProjectBlueprint project={project}/>) : "Loading..."
                        }
                        
                    </div>
                </div>
            </div>
            <SidebarOffset/>
        </div>
    )
}

export default DashboardLayout;