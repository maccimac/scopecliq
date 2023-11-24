import axios from 'axios'
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { isClient, setAsClient, setAsConsultant } from '../store/user-store';
import { currentUserId } from '../store/login-store';
import { setProject } from '../store/project-store';


import  DashboardPortalLayout  from '../modules/DashboardPortalLayout';

const ConsultantDashboard = () => {
    const api = global.config.API
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const userId = useSelector(currentUserId)

    const [project, set_project] = useState(null)
    const { projectId } = useParams();

    const fetchProjectById = async() =>{
        const res = await axios.get(api+ '/projects/' + projectId)
        set_project(res.data)
        dispatch(setProject(res.data))
    }


    useEffect(()=>{
        if(!userId){
            navigate("/")
        }
        dispatch(setAsConsultant)
        fetchProjectById()
    }, [])


    return(
        <div class="sq-outter-frame">
            {project && <DashboardPortalLayout isConsultant={true}/>}
            
        </div>
    )
}
export default ConsultantDashboard;

