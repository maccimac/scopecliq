import axios from 'axios'
import { useState, useEffect } from "react";
import logo from '../assets/img/logo@2x.png'

export const Deliverable = ({status="COMPLETED", isConsultant=true, isEdit, description, image} ) => {
    const api = global.config.API
    const classNamesCompleted = " sq-deliverable--completed bg-sq-white"
    const [classNameState, setClassNameState]  = useState(classNamesCompleted)


    return(
        <div className={'sq-deliverable rounded py-3 px-2 mb-2' + classNameState}>
            <div className='d-flex'>
                <div className='status'>
                    <i className="fa-regular fa-circle-check color-sq-green fa-md m-1"></i>
                </div>
                
                <div className="ms-1">
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