import axios from 'axios'
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { isClient, setAsClient, setAsConsultant } from '../store/user-store';
import { setProject } from '../store/project-store';


import  DashboardHomeLayout  from '../modules/DashboardHome/DashboardHomeLayout';

const DashboardHome = () => {
    const api = global.config.API
    const dispatch = useDispatch();

    const [projects, set_projects] = useState(null)

    const fetchAllProjects = async() =>{
        const res = await axios.get(api+ '/projects')
        set_projects(res.data)
    }

    useEffect(()=>{
        dispatch(setAsConsultant)
        fetchAllProjects()
    }, [])


    return(
        <div class="sq-outter-frame">
            {projects && <DashboardHomeLayout projects={projects}/>}
            
        </div>
    )
}
export default DashboardHome;

