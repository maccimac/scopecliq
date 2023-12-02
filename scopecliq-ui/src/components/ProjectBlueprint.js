import axios from 'axios'
import { useState, useEffect } from "react";
import logo from '../assets/img/logo@2x.png'
import Milestone from './Milestone';
import placeholder1 from '../assets/img/placeholder-1.png'
import placeholder2 from '../assets/img/placeholder-2.png'
import placeholder3 from '../assets/img/placeholder-3.png'
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../store/client-store';
import { storeProject} from '../store/project-store';
import { showSnackbarMessage } from '../store/snackbar-store';


export const ProjectBlueprint = ({isConsultant}) => {
    const api = global.config.API
    const dispatch = useDispatch();
    const [milestones, set_milestones] = useState([])
    const project = useSelector(storeProject)
    const clientMode  = useSelector(isClient)

    const emptyMilestone = {
        'project_id' : project.id,
        'position' : 0,
        'name' : '',
        'description' : "",
        'budget_percentage': 0,
        'status_completion' : 'PENDING',
        'status_invoice' : null,

    }

    const getMilestones = async() => {
        try{
            const res = await axios.get(api+  '/milestones/project/'+ project.id )
            set_milestones(res.data)
            console.log(res.data)
            if(!res.data.length){
                set_milestones([emptyMilestone])
            }

        }catch(e){
            dispatch(showSnackbarMessage({
                status: 'error',
                message: e.response.data.message 
            }))
        }
    }

    const addMilestone  = (position=0) => {
        let milestoneArrCopy = milestones;
        milestoneArrCopy.splice(position, 0, emptyMilestone);
        set_milestones([
            ...milestoneArrCopy
        ])
    }

    const removeMilestoneWithoutId = () => {
        let milestoneArrCopy = milestones;
        milestoneArrCopy = milestoneArrCopy.filter((m,i)=>(m.id > 0))
        set_milestones([
            ...milestoneArrCopy
        ])
    }

    const updateMilestonesPositions = async (newId) =>{

        [...milestones].map((m, i)=>{
            console.log(m)
            if(m.id){
                const res = axios.post(`${api}/milestones/update-position/${m.id}/${i}`);
                // set_milestones(res.data)
            }else{
                const res = axios.post(`${api}/milestones/update-position/${newId}/${i}`);
            }

            if(i == milestones.length-1){
                getMilestones()
            }
            
        })
    } 

    const scrollToOngoing = () => {
        const divOngoing = document.querySelector('.sq-milestone--ONGOING');
        if(divOngoing){
            const holder = document.querySelector('.project-blueprint-holder');
            holder.scrollTo({
                behavior: "smooth",
                left: divOngoing.getBoundingClientRect().left - 10,
            })
        }
       

    }

    useEffect(()=>{
        if(project){
            getMilestones()    
            setTimeout(()=>{
                scrollToOngoing()
            }, 800)
            setTimeout(()=>{
                scrollToOngoing()
            }, 1600)
            setTimeout(()=>{
                scrollToOngoing()
            }, 3600)
        }        
    }, [project])


    return(
        <>
        {project && (<div className="sq-project-blueprint d-flex">
            {!clientMode && (<div className='mt-5 sq-btn-add__holder'>
                <div className="sq-btn-add sq-btn-add--milestone"  onClick={addMilestone}>
                        <i className="fa-solid fa-plus"></i>
                </div>
            </div>)}
            { milestones && milestones.length>0 && milestones.map( (m,i)=>(
                <div className='d-flex' key={m.id}>
                    <Milestone
                        milestone={m}
                        cb={{getMilestones, updateMilestonesPositions, removeMilestoneWithoutId}}
                        index={i}
                        edit={true}
                    />
                    {
                        !clientMode && (
                            <div className='mt-5 sq-btn-add__holder' onClick={()=>{addMilestone(i+1)}}>
                                <div className="sq-btn-add sq-btn-add--milestone" >
                                        <i className="fa-solid fa-plus"></i>
                                </div>
                            </div>
                        )
                    }
                    
                 </div>
             ))}
        </div>)}
        </>
    )
}

export default ProjectBlueprint;