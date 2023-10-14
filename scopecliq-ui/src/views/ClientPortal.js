import axios from 'axios'
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import  DashboardLayout  from '../modules/DashboardLayout';
import PortalLogin from '../modules/PortalLogin';

const ClientPortal = () => {
    const api = global.config.API
    const { domain } = useParams();
    const [project, set_project] = useState(null)
    const [ passwordValid, set_passswordValid] = useState(false)

    const projId = 2;

    const fetchProjectByDomain = async() =>{
        const res = await axios.get(api+ '/projects/portal/' + domain)
        console.log(res)
        set_project(res.data)
        // setDeliverables(res.data)
        // updateMileStoneStatus(res.data)
    }

    const verifyPassword = async(string) =>{
        if( !project || !string || !string.length) return;
        if(string == project.portal_password){
            set_passswordValid(true)
        }
        

    }


    useEffect(()=>{
        fetchProjectByDomain()
    }, [])

    return(
        <div className="sq-outter-frame">
            {/* <DashboardLayout> */}
            {/* { domain } */}
            
                {passwordValid ?
                (<DashboardLayout/>) : (<PortalLogin
                    project={project}
                    verifyPassword={verifyPassword} 
                />)}
                
            {/* </DashboardLayout> */}
        </div>
    )
}
export default ClientPortal;

