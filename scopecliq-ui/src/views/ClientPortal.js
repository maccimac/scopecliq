import axios from 'axios'
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import  DashboardLayout  from '../modules/DashboardLayout';
import PortalLogin from '../modules/PortalLogin';

const ClientPortal = () => {
    const api = global.config.API
    const { domain } = useParams();
    const [project, set_project] = useState(null)
    const [ passwordValid, set_passswordValid] = useState(true)

    const fetchProjectByDomain = async() =>{
        const res = await axios.get(api+ '/projects/portal/' + domain)
        console.log('proj', res.data)
        set_project(res.data)
        // setDeliverables(res.data)
        // updateMileStoneStatus(res.data)
    }


    useEffect(()=>{
        fetchProjectByDomain()
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

