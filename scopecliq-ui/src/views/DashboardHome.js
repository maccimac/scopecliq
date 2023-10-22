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

    const [project, set_project] = useState(null)
    const { projectId } = useParams();

    const fetchProjectById = async() =>{
        const res = await axios.get(api+ '/projects/' + projectId)
        set_project(res.data)
        dispatch(setProject(res.data))
    }


    useEffect(()=>{
        dispatch(setAsConsultant)
        fetchProjectById()
    }, [])


    return(
        <div class="sq-outter-frame">
            {project && <DashboardHomeLayout/>}
            
        </div>
    )
}
export default DashboardHome;
