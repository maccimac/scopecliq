import axios from 'axios'
import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../store/user-store';

export const OrganizationCard = ({
    organization,
    dark=false,
    className

}) => {
    const api = global.config.API;

    return(
        <div className={`
            sq-organization-card
            ${dark && 'dark'}
            ${className}
        `} >
            <div className='project-organization'>
                <h3 className='text-head mb-3'>{organization.organization_name}</h3>
                <div className='project-client'>
                    <div className='sq-grid'>
                        <span className='text-prop'>Name</span>
                        <span>
                            <strong>{organization.contact_name}</strong>, {organization.contact_about}
                        </span> 
                    </div>
                    
                    <div className='sq-grid'>
                        <span className='text-prop'>Email</span>
                        <span>{organization.contact_email}</span> 
                    </div>
                    <div className='sq-grid'>
                        <span className='text-prop'>Phone</span>
                        <span>{organization.contact_number}</span> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrganizationCard;