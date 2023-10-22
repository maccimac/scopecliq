import axios from 'axios'
import { useState, useEffect } from "react";
import logo from '../assets/img/logo@2x.png'
import Milestone from './Milestone';
import placeholder1 from '../assets/img/placeholder-1.png'
import placeholder2 from '../assets/img/placeholder-2.png'
import placeholder3 from '../assets/img/placeholder-3.png'

export const ProjectBlueprint = ({isConsultant, project}) => {
    const api = global.config.API
    const [milestones, set_milestones] = useState([])

    const getMilestones = async(projectId) => {
        const res = await axios.get(api+  '/milestones/project/'+ projectId )
        set_milestones(res.data)
    }

    useEffect(()=>{
        if(project){
            getMilestones(project.id)    
        }        
    }, [project])


    return(
        <div class="sq-project-blueprint">
            { milestones.map( (m,i)=>(
                 <Milestone
                    key={m.id}
                    milestone={m}
                    title={m.name}
                    description={m.description}
                    position={m.position}
                    fee={m.budget_percentage}
                    milestoneId={m.id} 
                    projectId={m.project_id}
                    isConsultant={isConsultant}
                 />
             ))}
        </div>
    )
}

export default ProjectBlueprint;