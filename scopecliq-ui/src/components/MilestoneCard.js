import axios from 'axios'
import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../store/user-store';

export const MilestoneCard = ({
    milestone
    // dark=false,
    // className

}) => {
    const api = global.config.API;
    const [editMode, setEditMode] = useState(true);
    const [modelName, set_modelName] = useState(milestone.name)
    const [modelDescription, set_modelDescription] = useState(milestone.description)
    const [modelPercentage, set_modePercentage] = useState(milestone.budget_percentage)

    return(
        <div className='sq-milestone-card'>
            {!editMode 
            ?(
            <div className='milestone-display'>
                <div className='mb-2'>
                    <span className="label">Milestone {milestone.position+1}: &nbsp;</span>
                    <span className="title">{milestone.name}</span>
                </div>
                <div className='mb-2'>
                    <p>{milestone.description}
                    </p>                
                </div>
                <div className='mb-2'>
                        <p>
                            <span className="label">Fee: &nbsp;</span>
                            {milestone.budget_percentage}% of budget
                        </p>
                </div>
            </div>
            ) : (
            <div className='milestone-edit'>
                <div class="sq-input-group mb-2">
                    <div className='label'>Milestone Name</div>
                    <input className='sq-input w-100' value={modelName} placeholder=''></input>
                </div>
                <div class="sq-input-group mb-2">
                    <div className='label'>Description</div>
                    <textarea className='sq-textarea w-100' placeholder='What will this milestone accomplish?' value={modelDescription}></textarea>
                </div>

                <div className='d-flex w-100 align-items-end justify-content-between'>
                    <div className='sq-input-group'>
                        <div className='label'>Budget Perecentage</div>
                        <input className='sq-input w-25' placeholder='10' value={modelPercentage}></input> <span className=''>%</span>
                        <br/>
                        <small>&nbsp; ${} of Project Budget</small>
                     </div>  
                     <div className='sq-btn bg-sq-gold-mid text-center'>Save Milestone</div> 
                </div>
                {/* <div className='my-4'>
                    <div className='sq-btn bg-sq-gold-mid'>Save Milestone</div>
                </div>     */}
                

            </div>
            )}
        
        </div>

    )

}

export default MilestoneCard;


