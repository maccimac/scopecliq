import * as React from 'react';
import axios from 'axios'
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../store/client-store';
import { storeProject} from '../store/project-store';
import { updateNotif } from '../store/notif-store';
import { showSnackbarMessage} from '../store/snackbar-store';
import Menu from '@mui/material/Menu';


export const Deliverable = ({
    deliverable,
    cb,
    cancelNewDeliverable, 
    index
} ) => {
    const api = global.config.API;
    const dispatch = useDispatch();
    const clientMode = useSelector(isClient);
    const project = useSelector(storeProject);

    const [editMode, setEditMode]  = useState(deliverable.is_new);
    const [newMode, setnNewMode]  = useState(deliverable.is_new);
    const [statusModel, setStatusModel]  = useState(deliverable.status);
    const [descriptionModel, setDescriptionModel]  = useState(deliverable.description);
    const [descriptionModelEdit, setDescriptionModelEdit]  = useState(deliverable.description);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handelMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    const statusClassNames = {
        COMPLETE: {
            outterClass: " sq-deliverable--complete bg-sq-lightest ",
            icon: "fa-circle-check text-color-sq-green "
        },
        INCOMPLETE: {
            outterClass: " sq-deliverable--incomplete bg-sq-lav-light border-sq-lav ",
            icon: "fa-circle text-color-sq-lav"
        },
        CANCELLED: {
            outterClass: " sq-deliverable--cancelled bg-sq-light ",
            icon: "fa-circle-xmark text-color-sq-med"
        },
    }
    
    const [classNameState, setClassNameState]  = useState(null)
    const [statusIcon, setStatusIcon]  = useState(null)

    const toggleComplete = async () => {
        if (clientMode) return;
        const status = (statusModel === 'COMPLETE') ? 'INCOMPLETE' : 'COMPLETE'; 
        const res = await axios.post(api + `/deliverables/update/${deliverable.id}/status/${status}`)
        if(res.status === 200){
            setStatusModel(status)
            resolveClassStyleByStatus(status)
            cb.fetchDeliverableByMilestone()
            setTimeout(()=>{
                // const withUpdate = true;
                // cb.updateMilestoneStatus(withUpdate)
            }, 1000)
        }
        const payloadNotification = {
            type: "STATUS_UPDATE",
            status,
        }
        createNotification(payloadNotification);
    } 

    const createNotification = async (payload) => {
        const _payload = {
            ...deliverable,
            deliverable_id: deliverable.id,
            read_at: null,
            type: "",
            status: "",
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

    const enableEdit = () => {
        if(clientMode) return;
        setEditMode(true);
        setClassNameState(statusClassNames[statusModel].outterClass + ( ' sq-deliverable--edit '));
    } 
    const finishEdit = () => {
        setEditMode(false);
        setClassNameState(statusClassNames[statusModel].outterClass);
    } 

    const updateDescription = async () =>{
        const payloadDesc = {
            description: descriptionModelEdit
        }
        const res = await axios.post(`${api}/deliverables/edit/${deliverable.id}`, payloadDesc, {
            headers: {
              "Content-Type": "application/json",
            },
        });
        if(res.status===200){
            setDescriptionModel(descriptionModelEdit)
        }
        createNotification({
                extra: "The description has been changed",
                type: "CHANGE",
                status: "MADE",
        })     
        finishEdit()
    }

    const saveNewDeliverable = async () => {
        const payload = {
            description: descriptionModelEdit,
            position: index
        }
        const res = await axios.post(`${api}/deliverables/add/milestone/${deliverable.milestone_id}`, payload, {
            headers: {
              "Content-Type": "application/json",
            },
        });
        const newItem = res.data
        if(res.data && res.status===200){
            createNotification({
                    ...newItem,
                    deliverable_id: newItem.id,
                    type: "CHANGE",
                    status: "CREATED",
            })

            setnNewMode(false)
            setEditMode(false)
            setDescriptionModel(descriptionModelEdit)
            finishEdit()
            cb.saveAllPositions()        
            cb.fetchDeliverableByMilestone()
        }
    }

    const deleteDeliverable = async () => {
        try{
            const res = await axios.post(`${api}/deliverables/delete/${deliverable.id}`, {}, {
                headers: {
                  "Content-Type": "application/json",
                },
            });
            if(res.status == 200){
                createNotification({
                    type: "CHANGE",
                    status: "DELETED",
                })
                dispatch(showSnackbarMessage({
                    message: "Deliverable deleted"
                }))            
                cb.fetchDeliverableByMilestone()
                cb.saveAllPositions()
            }    
        }catch(e){
            dispatch(showSnackbarMessage({
                status: 'error',
                message: e.response.data.message 
            }))

        }
        

        

    }
    const resolveClassStyleByStatus = (statusModel) =>{
        setClassNameState(statusClassNames[statusModel].outterClass + (editMode && ' sq-deliverable--edit '));
        setStatusIcon(statusClassNames[statusModel].icon);
    }


  



    useEffect(()=>{
        resolveClassStyleByStatus(statusModel);
    }, [])
    
    useEffect(()=>{
        resolveClassStyleByStatus(statusModel);
    },[deliverable] )

    return(
        <div className={ classNameState + ' sq-deliverable rounded py-2 px-2 mb-2'} data-deliverable-id={deliverable.id}>
            <div className='d-flex w-100'>
                <div className='status sq-btn-icon no-hover pt-1' onClick={toggleComplete}>
                    <i className={statusIcon + ' fa-regular fa-md m-1 cursor-pointer sq-client--curser-def' }></i>
                </div>
                
                <div className="ms-1 mt-1 flex-fill">
                    <p onClick={enableEdit} className='description w-100'>{descriptionModel}</p>
                    {editMode && (
                        <textarea placeholder="Type a description" className='description-edit' rows="4" 
                            onChange={(e)=>{
                                setDescriptionModelEdit(e.target.value)
                            }}
                            value={descriptionModelEdit}
                            cols="100"></textarea>
                    )}
                    
                </div>

                {
                    newMode 
                    ?(
                        <div className='d-flex mt-1 new-deliverable'>
                            <div onClick={(e)=>{saveNewDeliverable(e.target.value)}} className='sq-btn-icon'>
                                <i  className="fa-solid  fa-save text-color-sq-green m-1 fa-xs "></i>
                            </div>
                            <div onClick={cancelNewDeliverable} className='sq-btn-icon'>
                                <i  className="fa-solid fa-cancel text-color-sq-tomato-light m-1 fa-xs "></i>
                            </div>
                            
                        </div>                  
                    )
                    :(
                        editMode
                        ?(
                            <div className='d-flex mt-1'>
                                <div className="sq-btn-icon" onClick={(e)=>{updateDescription(e.target.value)}}>
                                    <i  className="fa-solid  fa-save text-color-sq-green m-1 fa-xs"></i>
                                </div>
                                <div className="sq-btn-icon"  onClick={finishEdit}>
                                    <i className="fa-solid  fa-cancel text-color-sq-tomato-light m-1 fa-xs"></i>
                                </div>
                            </div>
                        )
                        :(
                            <div className='d-flex sq-client--hide'>
                                <div className='sq-btn-icon'  onClick={enableEdit}>
                                    <i className="fa-solid fa-regular fa-pen-to-square text-color-sq-gold m-1 fa-xs"></i>
                                </div>
                                <div className='sq-btn-icon'  onClick={handelMenuClick}>
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
                                    <div >
                                        {/* <div onClick={handleMenuClose} className="sq-menu-item" >Complete with message</div>
                                        <div onClick={handleMenuClose} className="sq-menu-item" >Cancel deliverable</div> */}
                                        <div onClick={deleteDeliverable} className="sq-menu-item" >Delete deliverable</div>
                                    </div>
                                </Menu>
                            </div>
                        )

                    )
                }


                
            </div>
            {
                deliverable.image && (
                    <div className='my-2 ms-2 px-3'>
                        <div className='rounded image image--small w-100' style={{
                            backgroundImage: `url(${deliverable.image})`
                            }}>
                        </div>
                    </div>
                )

            }
            
        </div>
    )
}

export default Deliverable;