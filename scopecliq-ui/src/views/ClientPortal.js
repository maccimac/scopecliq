import axios from 'axios'
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import  DashboardLayout  from '../modules/DashboardLayout';
import PortalLogin from '../modules/PortalLogin';

import { useDispatch, useSelector} from 'react-redux';
import { isClient, setAsClient, setAsConsultant } from '../store/user-store';
import { currentUser } from '../store/login-store';
import { setProject} from '../store/project-store';

const ClientPortal = () => {
    const api = global.config.API

    const dispatch = useDispatch()
    // const curUser = useSelector(currentUser);
    const client = useSelector(isClient);


    const { domain } = useParams();
    const [project, set_project] = useState(null)
    const [ passwordValid, set_passswordValid] = useState(true)


    const fetchProjectByDomain = async() =>{
        const res = await axios.get(api+ '/projects/portal/' + domain)
        const proj = res.data
        console.log(res.data)
        set_project(proj)
        dispatch(setProject(res.data))
    }


    useEffect(()=>{
        fetchProjectByDomain()
        dispatch(setAsClient())
    }, [])

    return(
        <div className="sq-outter-frame">
            
                {passwordValid ?
                (<DashboardLayout
                    isConsultant={false}
                    project={project}
                />) : (<PortalLogin
                    project={project}
                    set_passswordValid={set_passswordValid}
                />)}
                
        </div>
    )
}
export default ClientPortal;

