import axios from 'axios'
import { useState, useEffect } from "react";
import logo from '../assets/img/sq-logo.svg'
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isClient} from '../store/client-store';
import { storeProject } from '../store/project-store';
import { currentUserId, setUserId } from '../store/login-store';
import { Link } from "react-router-dom";
import OrganizationCardSmall from './OrganizationCardSmall';

export const NavBar = ({children}) => {
    const api = global.config.API;
    const clientMode = useSelector(isClient);
    const project = useSelector(storeProject)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const userId = useSelector(currentUserId)
    const [consultantOrg, set_consultantOrg] = useState(null)
    const [clientOrg, set_clientOrg] = useState(null)


    const fetchProjectOrganizationById = async () => {
        if(!project) return;
        const res = await axios.get(api+ '/organizations/'+project.organization_id)
        console.log(res)
        set_clientOrg(res.data)
    }

    const fetchConsultantOrg = async() =>{
        try{
            const res = await axios.get(api+ '/organizations/consultant/' + project.consultant_user_id)
            dispatch(set_consultantOrg(res.data))
            console.log(res)
        }catch(e){
            console.log(e)
        }
       
    }

    useEffect(()=>{
        if(!project) return
        if(!consultantOrg){
            fetchProjectOrganizationById()
        }
        if(!consultantOrg){
            fetchConsultantOrg()
        }
    },[project])


    return(
        <div className={`
            sq-navigation p-3 d-flex align-items-center justify-content-between
            ${clientMode ? 'sq-navigation--client bg-sq-white' : 'sq-navigation--consultant bg-sq-lav-darker'}
        `
        }>
            <div className="d-flex w-75 align-items-center" style={{}}>
                <Link to="/">
                    <img src={logo} className="sq-logo-sm w-auto mb-1 me-3" alt="scopecliq-logo"></img >
                </Link>
                <div className={
                    `sub
                        ${clientMode ? 'text-color-sq-lav' : 'text-color-sq-green'}
                    `
                }>{clientMode ? 'Client Portal' : 'Consultant Dashboard'}</div>

            {clientMode && clientOrg && consultantOrg &&
                  <div className='d-flex sub align-items-center'>
                            &nbsp; <i className='fa-solid fa-plus mx-2'></i>  &nbsp; 
                                <span className='text-color-sq-med'>{clientOrg.organization_name}</span> 
                                &nbsp; <i className='fa-solid fa-plus mx-2'></i> &nbsp; 
                                <span className='text-color-sq-med'>{consultantOrg.organization_name}</span> 
                    </div>
            }

            </div>
            
            <div className='d-flex w-100 align-item-center justify-content-end'>
            {/* {clientOrg && consultantOrg &&
                     <>
                     <div className='d-flex py-4 p-3'>
                        <OrganizationCardSmall
                            className="me-2 w-auto"
                            organization={clientOrg}/>
                        <OrganizationCardSmall className="w-auto"
                            organization={consultantOrg}/>
                    </div>
                     </>
                } */}

               {children}

           


            </div>

            
            

            
            
        </div>
    )
}

export default NavBar;