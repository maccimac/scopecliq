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
        console.log('ms', res)
        set_milestones(res.data)
    }

    // useEffect(()=>{
    //     getMilestones()
    // }, [])

    useEffect(()=>{
        console.log({project})
        if(project){
            getMilestones(project.id)    
        }
        
    }, [project])


    return(
        <div class="sq-project-blueprint p-4 d-flex bg-sq-lightest">
            { milestones.map( (m,i)=>(
                 <Milestone
                 title={m.name}
                 description={m.description}
                 position={m.position}
                 fee={m.budget_percentage}
                 milestoneId={m.id} 
                 projectId={m.project_id}
                 />
             ))}
            {/* <Milestone
                title="Negotiation"
                description="This is the milestone description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ul"
                position="1"
                fee="0"
                
            />
             <Milestone
                title="Discovery"
                description="This is the milestone description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ul"
                position="2"
                fee="25"
                image={placeholder1}
            />
            
            <Milestone
                title="Conceptualization"
                position="3"
                fee="10"
            /> */}
            <div class="col-6">

            </div>
        </div>
    )
}

export default ProjectBlueprint;