import axios from 'axios'
import { useState, useEffect } from "react";

import { useNavigate } from 'react-router-dom';
import { isClient} from '../store/user-store';
import { storeProject} from '../store/project-store';
import { currentUserId, setUserId } from '../store/login-store';

import { Link } from "react-router-dom";

import NavBar from '../components/NavBar';
import SidebarOffset from './SidebarOffset';
import ProjectBlueprint from '../components/ProjectBlueprint';
import { useDispatch, useSelector} from 'react-redux';
import ProjectEdit from './ProjectEdit';


const DashboardPortalLayout = () => {
    const api = global.config.API
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const clientMode = useSelector(isClient)
    const project=(useSelector(storeProject))
    const userId = (useSelector(currentUserId))
    
    const logout = () => {
        dispatch(setUserId(null))
        navigate("/")
    }

    return(
        <div class="sq-dashboard-portal">
            <div class="sq-body">
                <NavBar>
                    <div className='d-flex w-100 align-items-center justify-content-end'>
                        <Link 
                            to={
                                clientMode ? `/portal/${project?.portal_domain}/invoices` : `/dashboard/${project?.id}/invoices`
                            } 
                            className='d-inline sq-link  text-color-sq-green'
                        >
                            <i class="fa-solid fa-receipt me-1"></i> Your Invoices
                        </Link>

                        {
                            userId &&                 
                            <div className='d-inline-flex align-items-center sq-link text-color-sq-lav-muted ms-4' onClick={logout}>
                                <i class="fa-solid fa-arrow-right-from-bracket me-1"></i>  Logout
                            </div>
                   
                        }
                    </div>
                   
                </NavBar>
                <div class="sq-content h-100">
                    
                    <div className='project-blueprint-holder'>
                        <div className='project-header pt-2 my px-3'>
                            {!clientMode && (
                                <strong className='font-size-11'>
                                    <Link to="/dashboard" className='sq-link text-color-sq-black pb-0'>
                                        <i class="fa-solid fa-regular fa-arrow-left me-2 fa-xs"/>
                                        Back to dashboard
                                    </Link>
                                </strong>   
                            )}
                            <h3 className='mt-2 h3-light'>Your Project Blueprint: &nbsp;
                                <strong className='text-color-sq-lav-dark'>{project && project.name}</strong>
                            </h3>
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

export default DashboardPortalLayout;