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
            ${clientMode ? 'bg-sq-white' : 'bg-sq-lav-darker'}
        `
        }>
            <div className="d-flex col-8 align-items-center">
                <Link to="/">
                    <img src={logo} className="sq-logo-sm w-auto mb-1 me-3" alt="scopecliq-logo"></img >
                </Link>
                <span className={
                    `sub
                        ${clientMode ? 'text-color-sq-lav' : 'text-color-sq-green'}
                    `
                }>{clientMode ? 'Client Portal' : 'Consultant Dashboard'}</span>

                {clientMode && clientOrg && consultantOrg &&
                        <div className='d-flex ms-2 mt-1 sub align-items-center text-color-sq-lighter'>
                            
                                &nbsp; <i className='fa-solid fa-plus mx-2'></i>  &nbsp; 
                                <span className='text-color-sq-med'>{clientOrg.organization_name}</span> 
                                &nbsp; <i className='fa-solid fa-plus mx-2'></i> &nbsp; 
                                <span className='text-color-sq-med'>{consultantOrg.organization_name}</span> 
                            
                        </div>
                }

            </div>
            
            {
                  // <div className='col-lg-6 d-flex '>
                    //     <OrganizationCardSmall
                    //         className="me-2 w-50"
                    //         organization={clientOrg}/>
                    //     <OrganizationCardSmall className="w-50"
                    //         organization={consultantOrg}/>
                    // </div>
            }


            


            <div className='d-flex w-100 align-item-center'>
               {children}
            </div>
            

            
            
        </div>
    )
}

export default NavBar;