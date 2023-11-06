import axios from 'axios'
import { useState, useEffect } from "react";
import Deliverable from './Deliverable';
import MilestoneCard from './MilestoneCard';

import placeholder1 from '../assets/img/placeholder-1.png'
import placeholder2 from '../assets/img/placeholder-2.png'
import placeholder3 from '../assets/img/placeholder-3.png'
import BtnAdd from './BtnAdd';
import { useDispatch, useSelector} from 'react-redux';
import { isClient } from '../store/user-store';


export const Milestone = ({ milestone, index, image, cb, edit=true}) => {
    const api = global.config.API;
    const clientMode = useSelector(isClient);

    const [milestoneStatus, setMilestoneStatus] = useState('complete')
    const [deliverables, setDeliverables] = useState([])
    const [editMode, set_editMode] = useState(edit)


    const fetchDeliverableByMilestone = async() =>{
        const res = await axios.get(api+ '/deliverables/milestone/' + milestone.id)
        setDeliverables(res.data)
        
    }
    const updateMilestoneStatus = () => {
        let statArr = []
        deliverables.forEach(d => {
            statArr.push(d.status)
        });
        if (!statArr.length){
            setMilestoneStatus('pending');
            return;
        }
        if(statArr.includes('INCOMPLETE')){
            if(statArr.includes('COMPLETE')){
                setMilestoneStatus('started')
            }else{
                setMilestoneStatus('pending')
            }
        }else{
            setMilestoneStatus('complete')
            
        }
    }

    const addNewDeliverable =(index)=> {
        const newDeliverable = {
            id: null,
            description:"",
            position: 0,
            status: "INCOMPLETE",
            is_new: true,
            milestone_id: milestone.id,
        }
        setDeliverables([])
        let deliverabesCopy = [...deliverables];
        deliverabesCopy.splice(index+1, 0, newDeliverable)
        setTimeout(()=>{
            setDeliverables([...deliverabesCopy])
        }, 0)
    }


    const cancelNewDeliverable = (index) => {
        setDeliverables([])
        let deliverabesCopy = [...deliverables];
        deliverabesCopy.splice(index, 1)
        setTimeout(()=>{
            setDeliverables([...deliverabesCopy])
        }, 0)
    }
    const saveAllPositions =  () =>{
        deliverables.map( async (d,i) =>{
            const res = await axios.post(api + `/deliverables/update/${d.id}/position/${i}`)
            console.log(res)
        })


    }

    useEffect(()=>{
        fetchDeliverableByMilestone()
    }, [])

    useEffect(()=>{
        const isNewArr = deliverables.map(d => d.is_new);
        set_editMode(isNewArr.includes(true))
        updateMilestoneStatus()
    }, [deliverables])

    return(
        <div className={`sq-milestone--${milestoneStatus} ${clientMode && 'sq-milestone--client-mode'} sq-milestone rounded my-2 p-4 mx-2`} data-milestone-id={milestone}>
           
            <MilestoneCard
                key={milestone.id}
                milestoneStatus={milestoneStatus} 
                milestone={milestone} 
                cb={{getMilestones: cb.getMilestones, updateMilestonesPositions: cb.updateMilestonesPositions }}
                index={index}
                edit={!milestone.id}
            />
           
            {image && (
                <div className='mb-2'>
                <div className='rounded image image--med w-100 p-4' style={{
                    backgroundImage: `url(${image})`
                    }}>
                </div>
            </div>
            )}
            
            <hr/>
            {milestone.id && (
                <div className='mb-2'>
                    <span className="label">Deliverables: </span>
                </div>
            ) }
            
            <div className='deliverables-list'>
            {!clientMode &&!editMode && <BtnAdd cb={()=>{addNewDeliverable(-1)}}/> }
                { milestone.id && deliverables.map( (d,i)=>(
                    <div className="deliverable-set" key={d.id}>
                        <Deliverable
                            key={d.id}
                            deliverable={d}
                            index={i}
                            cb={{
                                saveAllPositions,
                                fetchDeliverableByMilestone,
                                // updateMilestoneStatus
                            }}
                            cancelNewDeliverable={()=>{
                                cancelNewDeliverable(i)
                            }}
                        />
                        {!clientMode && !editMode && <BtnAdd cb={()=>{addNewDeliverable(i)}}/> }
                    </div>
                ))}
            </div>

            
            
        </div>
    )
}

export default Milestone;