import axios from 'axios'
import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../store/user-store';

export const OrganizationCardEdit = ({
    organization,
    dark=false,
    className,
    cb

}) => {
    const api = global.config.API;
    const [modelOrganizationName, set_modelOrganizationName] = useState('')
    const [modelContactName, set_modelContactName] = useState('')
    const [modelContactEmail,  set_modelContactEmail] = useState('')
    const [modelContactAbout, set_modelContactAbout] = useState('')
    const [ modelContactNumber, set_modelContactNumber] = useState('')

    

    useEffect(()=>{
        cb.set_organization({
            organization_name: modelOrganizationName,
            contact_name: modelContactName,
            contact_email: modelContactEmail,
            contact_number: modelContactNumber,
            contact_about: modelContactAbout,
        })

    }, [
        modelOrganizationName,
        modelContactName,
        modelContactEmail,
        modelContactNumber,
        modelContactAbout
    ])


    return(
        <div className={`
            sq-organization-card
            ${dark && 'dark'}
            ${className}
        `} >
        <div class="sq-input-group mb-2">
            
            <div>
                <hr/>
                <div className='sub mb-2'>New Organization</div>
                <div className='label'>
                    Organization
                </div>
                <input className='sq-input w-100 mb-2 mb-2' 
                            value={modelOrganizationName} 
                            onChange={(e)=>{
                                set_modelOrganizationName(e.target.value)
                            }}
                            placeholder='Organization Name'
                ></input>
                <div className='label'>
                    Your contact
                </div>
                <input className='sq-input w-100 mb-2 mb-2' 
                            value={modelContactName} 
                            onChange={(e)=>{
                                set_modelContactName(e.target.value)
                            }}
                            placeholder='Contact Name'
                ></input>
                <div className='d-flex'>
                    <input className='sq-input w-100 mb-2 me-2' 
                                value={modelContactEmail} 
                                onChange={(e)=>{
                                    set_modelContactEmail(e.target.value)
                                }}
                                placeholder='Contact Email'
                    ></input>
                    <input className='sq-input w-100 mb-2' 
                            value={modelContactNumber} 
                            onChange={(e)=>{
                                set_modelContactNumber(e.target.value)
                            }}
                            placeholder='Contact Number'
                    ></input>
                </div>
                
                <input className='sq-input w-100 mb-2' 
                    value={modelContactAbout} 
                    onChange={(e)=>{
                        set_modelContactAbout(e.target.value)
                    }}
                    placeholder='Contact About or Role'
                ></input>
            </div>
        
            </div>
            
        </div>
    )
}

export default OrganizationCardEdit;