import axios from 'axios'
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { isClient, setAsClient, setAsConsultant } from '../store/client-store';
import { setProject } from '../store/project-store';
import { currentUserId, currentUserOrg, setUserOrg } from '../store/login-store';


import  DashboardHomeLayout  from '../modules/DashboardHome/DashboardHomeLayout';

const DashboardHome = () => {
    const api = global.config.API
    const dispatch = useDispatch();
    // const navigate = useNavigate()
    const userId = useSelector(currentUserId)
    const [projects, set_projects] = useState(null)
    // const [yourOrg, set_yourOrg] = useState(null)

    // const fetchAllProjects = async() =>{
    //     const res = await axios.get(api+ '/projects')
    //     set_projects(res.data)
    // }

    const fetchAllProjectsByConsultant = async() =>{
        const res = await axios.get(api+ '/projects/consultant-user-id/' + userId)
        set_projects(res.data)
    }

    const fetchConsultantOrg = async() =>{
        try{
            const res = await axios.get(api+ '/organizations/consultant/' + userId)
            dispatch(setUserOrg(res.data))
            console.log(res)
        }catch(e){
            console.log(e)
        }
       
    }

    useEffect(()=>{
        dispatch(setAsConsultant())
        // fetchAllProjects()
        fetchAllProjectsByConsultant()
        fetchConsultantOrg();
    }, [])


    return(
        <div className="sq-outter-frame">
            {projects && <DashboardHomeLayout 
                projects={projects}
                // yourOrg={yourOrg}    
            />}
            
        </div>
    )
}
export default DashboardHome;

