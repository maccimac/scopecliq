import axios from 'axios'
import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../store/client-store';

export const OrganizationCardSmall = ({
    organization,
    dark=false,
    className,
    onClick

}) => {
    // const api = global.config.API;

    if(organization) return(
        <div 
            className={`
                sq-organization-card-small
                d-flex align-items-center
                ${dark && 'dark'}
                ${className}
            `} 
            onClick={onClick} 
        >
            
                {
                    organization?.organization_logo &&
                    <div className='org-logo me-1'>
                        <img src={organization?.organization_logo}/>
                    </div>
                }
                
                <div className='mx-1 w-100'>
                    <div className='h3 mb-0'>
                        {organization.organization_name}
                    </div>
                    <div className=''>
                        {organization.contact_name}, {organization.contact_email}
                    </div>

                </div>
                <div className='d-flex align-items-center mx-1'>
                    {/* <div className='sq-btn-icon'>
                     <i className="fa-solid fa-chevron-down"></i>
                    </div> */}
                </div>
        </div>
    )
}

export default OrganizationCardSmall;