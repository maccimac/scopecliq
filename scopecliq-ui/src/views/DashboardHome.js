import axios from 'axios'
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { isClient, setAsClient, setAsConsultant } from '../store/user-store';
import { setProject } from '../store/project-store';
import { currentUserId } from '../store/login-store';


import  DashboardHomeLayout  from '../modules/DashboardHome/DashboardHomeLayout';

const DashboardHome = () => {
    const api = global.config.API
    const dispatch = useDispatch();
    const userId = useSelector(currentUserId)
    const [projects, set_projects] = useState(null)
    const [yourOrg, set_yourOrg] = useState(null)

    const fetchAllProjects = async() =>{
        const res = await axios.get(api+ '/projects')
        set_projects(res.data)
    }

    const fetchConsultantOrg = async() =>{
        const res = await axios.get(api+ '/organizations/consultant/'+userId)
        set_yourOrg(res.data)
    }

    useEffect(()=>{
        dispatch(setAsConsultant())
        fetchAllProjects()
        fetchConsultantOrg();
    }, [])


    return(
        <div className="sq-outter-frame">
            {projects && <DashboardHomeLayout 
                projects={projects}
                yourOrg={yourOrg}    
            />}
            
        </div>
    )
}
export default DashboardHome;

