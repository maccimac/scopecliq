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
                ${dark && 'dark'}
                ${className}
            `} 
            onClick={onClick} 
        >
            <div className='d-flex align-items-center'>
                <div className='org-logo'>
                    <img src="https://webcrafterinc.com/img/brand/webcrafter-logo.png"/>
                </div>
                <div>
                    <div className='h3 text-color-sq-lightest mb-0'>
                    </div>
                    <div className='p text-color-sq-light'>
                        {organization.contact_name}, {organization.contact_email}
                    </div>

                </div>
                <div className='d-flex align-items-center'>
                    <div className='sq-btn-icon'>
                     <i className="fa-solid fa-chevron-down"></i>
                    </div>
                    
                </div>

            </div>
            {/* <div className='project-organization'>
                <h2 className='text-head mb-3'>{organization.organization_name}</h2>
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
            </div> */}
        </div>
    )
}

export default OrganizationCardSmall;