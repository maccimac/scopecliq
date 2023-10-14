import axios from 'axios'
import { useState, useEffect } from "react";
import  DashboardLayout  from './../modules/DashboardLayout';

const ConsultantDashboard = () => {
    const api = global.config.API
    const projId = 2;
    const [project, set_project] = useState(null)

    const fetchProjectById = async() =>{
        const res = await axios.get(api+ '/projects/' + projId)
        console.log(res)
        set_project(res.data)
        // setDeliverables(res.data)
        // updateMileStoneStatus(res.data)
    }


    useEffect(()=>{
        fetchProjectById()
    }, [])


    return(
        <div class="sq-outter-frame">
            {project && <DashboardLayout project={project} isConsultant={true}/>}
            
        </div>
    )
}
export default ConsultantDashboard;

