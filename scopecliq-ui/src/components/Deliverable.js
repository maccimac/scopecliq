import axios from 'axios'
import { useState, useEffect } from "react";
import logo from '../assets/img/logo@2x.png'

export const Deliverable = ({status="COMPLETE", isConsultant=true, isEdit, description, image} ) => {
    const api = global.config.API

    const statusClassNames = {
        COMPLETE: {
            outterClass: " sq-deliverable--complete bg-sq-white",
            icon: "fa-circle-check color-sq-green"
        },
        INCOMPLETE: {
            outterClass: " sq-deliverable--incomplete bg-sq-lav-light border-sq-lav",
            icon: "fa-circle color-sq-lav"
        },
        CANCELLED: {
            outterClass: " sq-deliverable--cancelled bg-sq-light",
            icon: "fa-circle-xmark color-sq-med"
        },
    }
    

    const [classNameState, setClassNameState]  = useState(statusClassNames[status].outterClass)

    const [statusIcon, setStatusIcon]  = useState(statusClassNames[status].icon)




    return(
        <div className={ classNameState + ' sq-deliverable rounded py-3 px-2 mb-2'}>
            <div className='d-flex w-100'>
                <div className='status'>
                    <i className={statusIcon + ' fa-regular fa-md m-1'}></i>
                </div>
                
                <div className="ms-1 flex-fill">
                    <p className='description'>{description}</p>
                </div>

                <div className='d-flex mt-1'>
                    <i className="fa-solid fa-pen-to-square color-sq-gold m-1 fa-xs"></i>
                    <i className="font-size-6 fa-solid fa-bars color-sq-light m-1 fa-xs"></i>
                </div>
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