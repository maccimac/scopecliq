import axios from 'axios'
import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../store/user-store';
import { storeProject} from '../store/project-store';

export const MilestoneCard = ({
    milestone,
    cb
    // dark=false,
    // className


}) => {
    const api = global.config.API;
    const project = useSelector(storeProject);

    const [editMode, setEditMode] = useState(false);
    const [modelName, set_modelName] = useState(milestone.name)
    const [modelDescription, set_modelDescription] = useState(milestone.description)
    const [modelPercentage, set_modePercentage] = useState(milestone.budget_percentage)

    const addMilestone = async () =>{
        const payloadDesc = {
            project_id: project.id,
            name: modelName,
            description: modelDescription,
            budget_percentage: modelPercentage
        }
        const res = await axios.post(`${api}/milestones/add/${project.id}`, payloadDesc, {
            headers: {
              "Content-Type": "application/json",
            },
        });
        if(res.status===200){
            cb.getMilestones()
        }
    }

    const updateMilestone = async () =>{
        const payloadDesc = {

            ...milestone,
            name: modelName,
            description: modelDescription,
            budget_percentage: modelPercentage
        }
        const res = await axios.post(`${api}/milestones/update/${milestone.id}`, payloadDesc, {
            headers: {
              "Content-Type": "application/json",
            },
        });
        if(res.status===200){
            setEditMode(false)
            cb.getMilestones()
        }
    }


    return(
        <div className='sq-milestone-card'>
            {!editMode 
            ?(
            <div className='milestone-display'>
                <div className='mb-2'>
                    <span className="label">Milestone {milestone.position+1}: &nbsp;</span>
                    <span className="title">{milestone.name}</span>
                    <i onClick={()=>{setEditMode(true)}} className="fa-solid sq-btn-icon fa-pencil text-color-sq-gold m-1 fa-xs"></i>
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
                    <input className='sq-input w-100' 
                        value={modelName} 
                        onChange={(e)=>{
                            set_modelName(e.target.value)
                        }}
                        placeholder=''
                    ></input>
                </div>
                <div class="sq-input-group mb-2">
                    <div className='label'>Description</div>
                    <textarea className='sq-textarea w-100' placeholder='What will this milestone accomplish?' 
                        value={modelDescription}
                        onChange={(e)=>{
                            set_modelDescription(e.target.value)
                        }}
                    ></textarea>
                </div>

                <div className='d-flex w-100 align-items-end justify-content-between'>
                    <div className='sq-input-group'>
                        <div className='label'>Budget Perecentage</div>
                        <input type="number" className='sq-input w-25' placeholder='10' 
                            value={modelPercentage}
                            onChange={(e)=>{
                                set_modePercentage(e.target.value)
                            }}
                        ></input> <span className=''>%</span>
                        <br/>
                        <small>&nbsp; ${} of Project Budget</small>
                     </div>
                     <div onClick={updateMilestone} className='sq-btn bg-sq-gold-mid text-center'>Update</div>   
                     <div onClick={addMilestone} className='sq-btn bg-sq-gold-mid text-center'>Add</div> 
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


