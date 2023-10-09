import axios from 'axios'
import { useState, useEffect } from "react";
import Deliverable from './Deliverable';

import placeholder1 from '../assets/img/placeholder-1.png'
import placeholder2 from '../assets/img/placeholder-2.png'
import placeholder3 from '../assets/img/placeholder-3.png'


export const Milestone = ({isConsultant=true, milestoneId=1, position, title, description, image, fee}) => {
    const api = global.config.API;
    const [deliverables, setDeliverables] = useState([])

    const fetchDeliverableByMilestone = async() =>{
        const res = await axios.get(api+'c'+ milestoneId)
        console.log(res.data)
        setDeliverables(res.data)
    }

    // ON RUN
    // [] set milestone status depending on deliverable status

    useEffect(()=>{
        fetchDeliverableByMilestone()
    }, [])

    return(
        <div class="sq-milestone col-4 border-sq-lighter rounded bg-sq-lightest my-2 p-4 mx-3">
            <div class="sub color-sq-green mb-2">
                Complete
            </div>
            <div className='mb-2'>
                    <span className="label">Milestone {position}: &nbsp;</span>
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
                {deliverables.map( (d,i)=>(
                    <Deliverable
                    status={d.status}
                    description={d.description}/>
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