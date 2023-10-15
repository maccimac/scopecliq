import axios from 'axios'
import { useState, useEffect } from "react";
import Deliverable from './Deliverable';

import placeholder1 from '../assets/img/placeholder-1.png'
import placeholder2 from '../assets/img/placeholder-2.png'
import placeholder3 from '../assets/img/placeholder-3.png'
import BtnAdd from './BtnAdd';
import { useDispatch, useSelector} from 'react-redux';
import { isClient } from '../store/user-store';


export const Milestone = ({isConsultant=true, milestoneId=1, position, title, description, image, fee}) => {
    const api = global.config.API;
    const clientMode = useSelector(isClient);

    const [milestoneStatus, setMilestoneStatus] = useState('complete')
    const [deliverables, setDeliverables] = useState([])

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
        })
    }

    useEffect(()=>{
        fetchDeliverableByMilestone()
    }, [])

    return(
        <div class={`sq-milestone--${milestoneStatus} ${clientMode && 'sq-milestone--client-mode'}  sq-milestone col-1 col-sm-4 col-lg-3 rounded my-2 p-4 mx-2`}>
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
            {!clientMode && <BtnAdd cb={()=>{addNewDeliverable(-1)}}/> }
                { deliverables.map( (d,i)=>(
                    <div class="deliverable-set" key={i}>
                        <Deliverable
                            key={i}
                            deliverableId={d.id}
                            status={d.status}
                            description={d.description}
                            position={i}
                            milestoneId={milestoneId}
                            isNew={d.is_new}
                            cancelNewDeliverable={()=>{
                                cancelNewDeliverable(i)
                            }}
                            saveAllPositions={saveAllPositions}
                            updateMilestoneStatus={()=>{
                                updateMileStoneStatus(deliverables)
                            }}
                            fetchDeliverableByMilestone={fetchDeliverableByMilestone}
 
                        />
                        {!clientMode && <BtnAdd cb={()=>{addNewDeliverable(i)}}/> }
                    </div>
                ))}
                {/* <Deliverable
                    status="INCOMPLETE"
                    description="Complete deliverable"
                />
                <Deliverable
                    status="COMPLETE"
                    description="Complete deliverable. incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
                    image={placeholder2}
                />
                 <Deliverable
                    status="CANCELLED"
                    description="Complete deliverable. incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
                /> */}

            </div>

            
            
        </div>
    )
}

export default Milestone;