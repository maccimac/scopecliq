import axios from 'axios'
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../store/user-store';
import { storeProject} from '../store/project-store';

export const Deliverable = ({
    deliverable,
    cb,
    cancelNewDeliverable, 
    index
} ) => {
    const api = global.config.API;
    const clientMode = useSelector(isClient);
    const project = useSelector(storeProject);

    const [editMode, setEditMode]  = useState(deliverable.is_new);
    const [newMode, setnNewMode]  = useState(deliverable.is_new);
    const [statusModel, setStatusModel]  = useState(deliverable.status);
    const [descriptionModel, setDescriptionModel]  = useState(deliverable.description);
    const [descriptionModelEdit, setDescriptionModelEdit]  = useState(deliverable.description);

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
        }
        const payloadNotification = {
            type: "STATUS_UPDATE",
            status,
        }
        createNotification(payloadNotification);
    } 

    const createNotification = async (_payload) =>{
        const status = (statusModel === 'COMPLETE') ? 'INCOMPLETE' : 'COMPLETE'; 
        const payload = {
            ...deliverable,
            read_at: null,
            type: 'STATUS_UPDATE',
            status,
            ..._payload,
        }
        await axios.post(`${api}/notifications/project/${project.id}/add`, payload, {
            headers: {
              "Content-Type": "application/json",
            },
        });


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
            type: "CHANGE",
            status: "MADE",
            extra: "The description has been changes"
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
        if(res.status===200){
            setnNewMode(false)
            setEditMode(false)
            setDescriptionModel(descriptionModelEdit)
            finishEdit()
            createNotification({
                ...newItem,
                type: "CHANGE",
                status: "CREATED",
                extra: "A new deliverable has been added to the deliverable"
            })
            cb.saveAllPositions()        
            cb.fetchDeliverableByMilestone()
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
        <div className={ classNameState + ' sq-deliverable rounded py-3 px-2 mb-2'} data-deliverable-id={deliverable.id}>
            <div className='d-flex w-100'>
                <div className={'status '} onClick={toggleComplete}>
                    <i className={statusIcon + ' fa-regular fa-md m-1 sq-btn-icon sq-client--curser-def' }></i>
                </div>
                
                <div className="ms-1 flex-fill">
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
                            <i onClick={(e)=>{saveNewDeliverable(e.target.value)}} className="fa-solid sq-btn-icon fa-save text-color-sq-green m-1 fa-xs "></i>
                            <i onClick={cancelNewDeliverable} className="fa-solid sq-btn-icon fa-cancel text-color-sq-tomato-light m-1 fa-xs "></i>
                        </div>                  
                    )
                    :(
                        editMode
                        ?(
                            <div className='d-flex mt-1'>
                                <i onClick={(e)=>{updateDescription(e.target.value)}} className="fa-solid sq-btn-icon fa-save text-color-sq-green m-1 fa-xs"></i>
                                <i onClick={finishEdit} className="fa-solid sq-btn-icon fa-cancel text-color-sq-tomato-light m-1 fa-xs"></i>
                            </div>
                        )
                        :(
                            <div className='d-flex mt-1 sq-client--hide'>
                                <i className="fa-solid sq-btn-icon fa-pen-to-square text-color-sq-gold m-1 fa-xs" onClick={enableEdit}></i>
                                <i className="fa-solid sq-btn-icon fa-ellipsis-vertical text-color-sq-light m-1 fa-xs"></i>
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