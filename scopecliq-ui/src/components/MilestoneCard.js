import axios from 'axios'
import {DateTime} from 'luxon'
import { useState, useEffect } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../store/client-store';
import { storeProject} from '../store/project-store';
import { updateNotif } from '../store/notif-store';
import { showSnackbarMessage} from '../store/snackbar-store';
import Menu from '@mui/material/Menu';

export const MilestoneCard = ({
    milestone,
    cb,
    milestoneStatus="",
    index,
    edit
}) => {
    const api = global.config.API;
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const project = useSelector(storeProject);
    const clientMode = useSelector(isClient)

    const [editMode, setEditMode] = useState(edit);
    const [modelName, set_modelName] = useState(milestone.name)
    const [modelDescription, set_modelDescription] = useState(milestone.description)
    const [modelPercentage, set_modePercentage] = useState(milestone.budget_percentage)
    const [modelDue, set_modelDue] = useState(milestone.datetime_due)

    const [anchorEl, setAnchorEl] = useState(null);


    const open = Boolean(anchorEl);
    const handelMenuClick = (event) => {
        event.preventDefault()
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const createNotification = async (payload) =>{
  
        const _payload = {
            read_at: null,
            project_id: milestone.project_id,
            milestone_id: milestone.id,
            description: milestone.name,
            ...payload,
        }
        try{   
            await axios.post(`${api}/notifications/project/${project.id}/add`, _payload, {
                headers: {
                  "Content-Type": "application/json",
                },
            })
            setTimeout(()=>{
                dispatch(updateNotif())
            },0)
        }catch(e){
            console.log(e)
        }
       
    }
    
    const addMilestone = async () =>{
        const payloadDesc = {
            project_id: project.id,
            name: modelName,
            description: modelDescription,
            budget_percentage: modelPercentage,
            datetime_due: modelDue,
        }
        try{
            const res = await axios.post(`${api}/milestones/add/${project.id}`, payloadDesc, {
                headers: {
                  "Content-Type": "application/json",
                },
            });
            console.log(res)
            
            if(res.status===200){
                createNotification({
                    milestone_id: res.data,
                    description: modelName,
                    type: 'CHANGE',
                    status: 'CREATED',
                }) 
                cb.updateMilestonesPositions(res.data)
            }
        }catch(e){
            console.log(e)
            dispatch(showSnackbarMessage({
                status: "error",
                message: e.response.data.message
            }))
        }

    }

    const updateMilestone = async () =>{
        const payloadDesc = {
            ...milestone,
            name: modelName,
            description: modelDescription,
            budget_percentage: modelPercentage,
            datetime_due: modelDue
        }
        const res = await axios.post(`${api}/milestones/update/${milestone.id}`, payloadDesc, {
            headers: {
              "Content-Type": "application/json",
            },
        });
        if(res.status===200){
            setEditMode(false)
            cb.getMilestones()
            dispatch(showSnackbarMessage({message: "Milestone updated"}))
            createNotification({
                type: 'CHANGE',
                status: 'MADE'
            }) 
        }
    }

    const deleteMilestone = async() =>{
        handleMenuClose()
        try{
            const res = await axios.post(`${api}/milestones/delete/${milestone.id}`, {}, {
                headers: {
                  "Content-Type": "application/json",
                },
            });
            if(res.data.status == 'success'){
                createNotification({
                    type: 'CHANGE',
                    status: 'DELETED',
                    milestone_id: res.data.milestone_id,
                })
                setTimeout(()=>{
                    cb.getMilestones()
                }, 100) 
                
                
            }else{
                cb.getMilestones()
                dispatch(showSnackbarMessage({
                    status: 'error',
                    message: "Milestone does not exist"
                }))
            }

        }catch(e){
            console.log(e)
            dispatch(showSnackbarMessage({
                status: 'error',
                message: e.response.data.message 
            }))
        }        
    }

    const parseDate = (dateString) => {
        if(!dateString) return <i>No due date</i>;
        const date = DateTime.fromFormat(dateString, 'yyyy-MM-dd HH:mm:ss' )
        return date.toFormat('MMM dd, yyyy')
     
    }


    return(
        <div className='sq-milestone-card'>
            {!editMode 
            ?(
            <div className='milestone-display'>
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
                        :( <div className='d-flex'>
                                <div className='sq-btn-icon'>
                                    <i onClick={()=>{setEditMode(true)}} className="fa-solid  fa-pen-to-square text-color-sq-gold m-1 fa-xs"></i>
                                </div>

                                {milestone.id && (<div className='sq-btn-icon'  onClick={(evt)=>{
                                    handelMenuClick(evt)
                                    }}>
                                    <i className="fa-solid fa-ellipsis-vertical text-color-sq-light m-1 fa-xs"
                                        id="demo-positioned-button"
                                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    ></i>
                                </div>)}
                               
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
                                    {milestoneStatus == 'complete' && (
                                        <Link to={"/invoice/" + milestone.id} className='sq-menu-item d-flex w-100'>
                                            Go to invoice
                                        </Link>
                                    )}
                                    <div onClick={deleteMilestone}>
                                        <div className="sq-menu-item" >Delete milestone</div>
                                    </div>
                                </Menu>

                            </div>



                        ) }
                       
                        
                    </div>    
                </div>
                <div onClick={()=>{
                    !clientMode && setEditMode(true)
                }} >
                    <div className='mb-2'>
                        <span className="label">Milestone {index+1}: &nbsp;</span>
                        <span className="title">{milestone.name}</span>
                        
                    </div>
                    <div className='mb-2'>
                        <p>{milestone.description}
                        </p>                
                    </div>
                    {milestone.datetime_due && 
                        <div className='mb-2'>
                                <p>
                                    <span className="label">Target date: &nbsp;</span>
                                    {parseDate(milestone.datetime_due)}
                                </p>
                        </div>
                    }
                    <div className='mb-2'>
                            <p>
                                <span className="label">Fee: &nbsp;</span>
                                {milestone.budget_percentage}% of budget
                            </p>
                    </div>
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

                <div className='label'>
                        Due Date (Optional)
                </div>
                <input type="date" className='sq-input w-100 mb-2'
                    value={modelDue} 
                    onChange={(e)=>{
                        set_modelDue(e.target.value)
                    }}
                ></input>

                <div className='d-flex w-100 align-items-end justify-content-between'>
                    <div className='sq-input-group'>
                        <div className='label'>Budget Percentage</div>
                        <input type="number" className='sq-input w-25' placeholder='10' 
                            value={modelPercentage}
                            onChange={(e)=>{
                                set_modePercentage(e.target.value)
                            }}
                        ></input> <span className=''>%</span>
                        <br/>
                        <small>&nbsp; ${} of Project Budget</small>
                     </div>
                     
                     {
                        milestone && milestone.id 
                        ? ( 
                            <div className='d-flex align-items-center'>
                                 <span className="sq-link me-2" onClick={()=>{setEditMode(false)}} >Cancel</span> 
                        
                                <div onClick={updateMilestone} className='sq-btn bg-sq-gold-mid text-center'>Update</div>
                            </div>   
                        )
                        :( 
                            <div className='d-flex align-items-center'>
                                 <span className="sq-link me-2" onClick={cb.removeMilestoneWithoutId} >Cancel</span> 
                                <div onClick={addMilestone} className='sq-btn bg-sq-gold-mid text-center'>Add</div>   
                            </div>
                        )  
                     }
                    
                </div>

            </div>
            )}        
        </div>

    )

}

export default MilestoneCard;


