import axios from 'axios'
import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../store/user-store';
import { storeProject} from '../store/project-store';
import Menu from '@mui/material/Menu';

export const MilestoneCard = ({
    milestone,
    cb,
    milestoneStatus="",
    index,
    edit
}) => {
    const api = global.config.API;
    const project = useSelector(storeProject);
    const clientMode = useSelector(isClient)

    const [editMode, setEditMode] = useState(edit);
    const [modelName, set_modelName] = useState(milestone.name)
    const [modelDescription, set_modelDescription] = useState(milestone.description)
    const [modelPercentage, set_modePercentage] = useState(milestone.budget_percentage)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handelMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };


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
            cb.updateMilestonesPositions()
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
            <div className='milestone-display' 
                onClick={()=>{
                    !clientMode && setEditMode(true)
            }} >
                <div className='d-flex justify-content-between'>
                    <div className="sub mb-2 milestone-status">
                        {milestoneStatus}
                    </div>
                    <div className='d-flex'>
                        {clientMode 
                        ?(
                            <div>
                                <div className='sq-btn-icon' onClick={handelMenuClick}>
                                <i className="fa-solid fa-ellipsis-vertical text-color-sq-light m-1 fa-xs"
                                    id="demo-positioned-button"
                                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                ></i>
                                </div>      
                                <Menu
                                    id="demo-positioned-menu"
                                    aria-labelledby="demo-positioned-button"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleMenuClose}
                                    anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                    }}
                                    className='sq-menu'
                                >
                                    <div onClick={handleMenuClose}>
                                        <div className="sq-menu-item">I have a question</div>
                                    </div>
                                </Menu>
                            </div>
                        )
                        :( <div className='sq-btn-icon'>
                                <i onClick={()=>{setEditMode(true)}} className="fa-solid  fa-pen-to-square text-color-sq-gold m-1 fa-xs"></i>
                            </div>
                        ) }
                       
                        
                    </div>    

                    

                   
                </div>
                <div className='mb-2'>
                    <span className="label">Milestone {index+1}: &nbsp;</span>
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
                {/* <span className="label">Milestone {index+1}</span> */}
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
                     <span className="sq-link" onClick={()=>{setEditMode(false)}} >Cancel</span>  
                     {
                        milestone && milestone.id 
                        ? ( <div onClick={updateMilestone} className='sq-btn bg-sq-gold-mid text-center'>Update</div>   
                        )
                        :( <div onClick={addMilestone} className='sq-btn bg-sq-gold-mid text-center'>Add</div>   
                        )  
                     }
                    
                </div>

            </div>
            )}
        
        </div>

    )

}

export default MilestoneCard;


