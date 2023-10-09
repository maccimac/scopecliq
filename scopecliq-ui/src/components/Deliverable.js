import axios from 'axios'
import { useState, useEffect } from "react";
import logo from '../assets/img/logo@2x.png'

export const Deliverable = ({
    deliverableId, status="COMPLETE", isConsultant=true,  
    description, image, position,
    milestoneId,
    isNew=false, 
    cancelNewDeliverable, saveAllPositions, updateMilestoneStatus
} ) => {
    const api = global.config.API;
    const [editMode, setEditMode]  = useState(isNew);
    const [newMode, setnNewMode]  = useState(isNew);
    const [statusModel, setStatusModel]  = useState(status);
    const [descriptionModel, setDescriptionModel]  = useState(description);
    const [descriptionModelEdit, setDescriptionModelEdit]  = useState(description);

    const statusClassNames = {
        COMPLETE: {
            outterClass: " sq-deliverable--complete bg-sq-lightest ",
            icon: "fa-circle-check color-sq-green"
        },
        INCOMPLETE: {
            outterClass: " sq-deliverable--incomplete bg-sq-lav-light border-sq-lav ",
            icon: "fa-circle color-sq-lav"
        },
        CANCELLED: {
            outterClass: " sq-deliverable--cancelled bg-sq-light ",
            icon: "fa-circle-xmark color-sq-med"
        },
    }
    

    const [classNameState, setClassNameState]  = useState(null)
    const [statusIcon, setStatusIcon]  = useState(null)

    const toggleComplete = async () => {
        const status = (statusModel=='COMPLETE') ? 'INCOMPLETE' : 'COMPLETE'; 
        const res = await axios.post(api + `/deliverables/update/${deliverableId}/status/${status}`)
        // const res = await axios.post(`${api}/deliverables/update/1`, {status}, {
        //         headers: {
        //           "Content-Type": "application/json",
        //         },
        //     });
        console.log(res)
        if(res.status==200){
            setStatusModel(status)
            resolveClassStyleByStatus(status)
            updateMilestoneStatus()
        }      
    } 

    const enableEdit = () => {
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
        const res = await axios.post(`${api}/deliverables/edit/${deliverableId}`, payloadDesc, {
            headers: {
              "Content-Type": "application/json",
            },
        });
        console.log(res)
        if(res.status==200){
            setDescriptionModel(descriptionModelEdit)
        }
        finishEdit()
    }

    const saveNewDeliverable = async () => {
    
        const payload = {
            description: descriptionModelEdit
        }

        const res = await axios.post(`${api}/deliverables/add/milestone/${milestoneId}`, payload, {
            headers: {
              "Content-Type": "application/json",
            },
        });
        console.log(res)
        setnNewMode(false)
        setEditMode(false)
        setDescriptionModel(descriptionModelEdit)
        finishEdit()
        saveAllPositions()
        updateMilestoneStatus()

    }

    const resolveClassStyleByStatus = (statusModel) =>{
        setClassNameState(statusClassNames[statusModel].outterClass + (editMode && ' sq-deliverable--edit '));
        setStatusIcon(statusClassNames[statusModel].icon);
    }

    useEffect(()=>{
        resolveClassStyleByStatus(status);
    }, [])
    
    useEffect(()=>{
        resolveClassStyleByStatus(status);
    }, position)

    return(
        <div className={ classNameState + ' sq-deliverable rounded py-3 px-2 mb-2'}>
            <div className='d-flex w-100'>
                <div className='status' onClick={toggleComplete}>
                    <i className={statusIcon + ' fa-regular fa-md m-1 sq-btn-icon'}></i>
                </div>
                
                <div className="ms-1 flex-fill">
                    <p onClick={enableEdit} className='description w-100'>{descriptionModel}</p>
                    {editMode && (
                        <textarea placeholder="Type a description" className='description-edit' rows="4" 
                            onChange={(e)=>{
                                setDescriptionModelEdit(e.target.value)
                            }}
                        cols="100">{descriptionModel}</textarea>
                    )}
                    
                </div>

                {
                    newMode 
                    ?(
                        <div className='d-flex mt-1 new-deliverable'>
                            <i onClick={(e)=>{saveNewDeliverable(e.target.value)}} className="fa-solid sq-btn-icon fa-save color-sq-green m-1 fa-xs"></i>
                            <i onClick={cancelNewDeliverable} className="fa-solid sq-btn-icon fa-cancel color-sq-tomato-light m-1 fa-xs"></i>
                        </div>                  
                    )
                    :(
                        editMode
                        ?(
                            <div className='d-flex mt-1'>
                                <i onClick={(e)=>{updateDescription(e.target.value)}} className="fa-solid sq-btn-icon fa-save color-sq-green m-1 fa-xs"></i>
                                <i onClick={finishEdit} className="fa-solid sq-btn-icon fa-cancel color-sq-tomato-light m-1 fa-xs"></i>
                            </div>
                        )
                        :(
                            <div className='d-flex mt-1'>
                                <i className="fa-solid sq-btn-icon fa-pen-to-square color-sq-gold m-1 fa-xs" onClick={enableEdit}></i>
                                <i className="fa-solid sq-btn-icon fa-bars color-sq-light m-1 fa-xs"></i>
                            </div>
                        )

                    )
                }


                
            </div>
            {
                image && (
                    <div className='my-2 ms-2 px-3'>
                        <div className='rounded image image--small w-100' style={{
                            backgroundImage: `url(${image})`
                            }}>
                        </div>
                    </div>
                )

            }
            
        </div>
    )
}

export default Deliverable;