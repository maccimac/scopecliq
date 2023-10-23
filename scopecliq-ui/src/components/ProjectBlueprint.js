import axios from 'axios'
import { useState, useEffect } from "react";
import logo from '../assets/img/logo@2x.png'
import Milestone from './Milestone';
import placeholder1 from '../assets/img/placeholder-1.png'
import placeholder2 from '../assets/img/placeholder-2.png'
import placeholder3 from '../assets/img/placeholder-3.png'
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../store/user-store';
import { storeProject} from '../store/project-store';


export const ProjectBlueprint = ({isConsultant}) => {
    const api = global.config.API
    const [milestones, set_milestones] = useState([])
    const project = useSelector(storeProject)

    const getMilestones = async() => {
        const res = await axios.get(api+  '/milestones/project/'+ project.id )
        set_milestones(res.data)
    }

    useEffect(()=>{
        if(project){
            getMilestones()    
        }        
    }, [project])


    return(
        <div class="sq-project-blueprint">
            { milestones.map( (m,i)=>(
                 <Milestone
                    key={m.id}
                    milestone={m}
                    cb={{getMilestones}}
                    index={i}
                 />
             ))}
        </div>
    )
}

export default ProjectBlueprint;