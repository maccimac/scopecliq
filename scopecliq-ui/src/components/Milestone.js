import axios from 'axios'
import { useState, useEffect } from "react";
import Deliverable from './Deliverable';

import placeholder1 from '../assets/img/placeholder-1.png'
import placeholder2 from '../assets/img/placeholder-2.png'
import placeholder3 from '../assets/img/placeholder-3.png'
import BtnAdd from './BtnAdd';
import { useDispatch, useSelector} from 'react-redux';
import { isClient } from '../store/user-store';


export const Milestone = ({ milestone, milestoneId=1, position, title, description, image, fee}) => {
    const api = global.config.API;
    const clientMode = useSelector(isClient);

    const [milestoneStatus, setMilestoneStatus] = useState('complete')
    const [deliverables, setDeliverables] = useState([])
    const [editMode, set_editMode] = useState(false)

    const fetchDeliverableByMilestone = async() =>{
        const res = await axios.get(api+ '/deliverables/milestone/' + milestoneId)
        setDeliverables(res.data)
        updateMileStoneStatus(res.data)
    }
    const updateMileStoneStatus = (arr) => {
        let statArr = []
        arr.forEach(d => {
            statArr.push(d.status)
        });
        if (!statArr.length){
            setMilestoneStatus('PENDING');
            return;
        }
        if(statArr.includes('INCOMPLETE')){
            if(statArr.includes('COMPLETE')){
                setMilestoneStatus('started')
            }else{
                setMilestoneStatus('pending')
            }
        }
    }

    const addNewDeliverable =(index)=> {
        const newDeliverable = {
            id: null,
            description:"",
            position: 0,
            status: "INCOMPLETE",
            is_new: true,
            milestone_id: milestoneId,
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

            // if(res.status == 200 && i == deliverables.length-1){
            //     fetchDeliverableByMilestone()
            // }
        })


    }

    useEffect(()=>{
        fetchDeliverableByMilestone()
    }, [])

    useEffect(()=>{
        const isNewArr = deliverables.map(d => d.is_new);
        set_editMode(isNewArr.includes(true))
    }, [deliverables])

    return(
        <div class={`sq-milestone--${milestoneStatus} ${clientMode && 'sq-milestone--client-mode'}  sq-milestone col-1 col-sm-4 col-lg-3 rounded my-2 p-4 mx-2`} data-milestone-id={milestoneId}>
            <div class="sub mb-2 milestone-status">
                {milestoneStatus}
            </div>
            <div className='mb-2'>
                    <span className="label">Milestone {position+1}: &nbsp;</span>
                    <span className="title">{title}</span>
            </div>
            <div className='mb-2'>
                <p>{description}
                </p>                
            </div>
            <div className='mb-2'>
                    <p>
                        <span className="label">Fee: &nbsp;</span>
                        {fee}% of budget
                    </p>
            </div>
            {image && (
                <div className='mb-2'>
                <div className='rounded image image--med w-100 p-4' style={{
                    backgroundImage: `url(${image})`
                    }}>
                </div>
            </div>
            )}
            
            <hr/>
            <div className='mb-2'>
                <span class="label">Deliverables: </span>
            </div>
            <div className='deliverables-list'>
            {!clientMode &&!editMode && <BtnAdd cb={()=>{addNewDeliverable(-1)}}/> }
                { deliverables.map( (d,i)=>(
                    <div class="deliverable-set" key={d.id}>
                        <Deliverable
                            key={d.id}
                            deliverable={d}
                            deliverableId={d.id}
                            status={d.status}
                            description={d.description}
                            position={d.position}
                            milestoneId={milestone.id}
                            isNew={d.is_new}
                            cancelNewDeliverable={()=>{
                                cancelNewDeliverable(i)
                            }}
                            saveAllPositions={saveAllPositions}
                            updateMilestoneStatus={()=>{
                                updateMileStoneStatus(deliverables)
                            }}
                            fetchDeliverableByMilestone={fetchDeliverableByMilestone}
                            cb={{}}
                            index={i}
 
                        />
                        {!clientMode && !editMode && <BtnAdd cb={()=>{addNewDeliverable(i)}}/> }
                    </div>
                ))}
            </div>

            
            
        </div>
    )
}

export default Milestone;