import axios from 'axios'
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
// import  DashboardLayout  from '../modules/DashboardPortalLayout';
import InvoiceList from './InvoiceList';
import PortalLogin from '../modules/PortalLogin';

import { useDispatch, useSelector} from 'react-redux';
import { isClient, setAsClient, setAsConsultant } from '../store/client-store';
import { currentUserId } from '../store/login-store';
import { storeProject, setProject} from '../store/project-store';

const InvoiceListLogin = () => {
    const api = global.config.API

    const dispatch = useDispatch()

    const client = useSelector(isClient);
    const userId = useSelector(currentUserId)
    const _project = useSelector(storeProject);


    const { domain } = useParams();
    const [project, set_project] = useState(null)
    const [ passwordValid, set_passswordValid] = useState(false)


    const fetchProjectByDomain = async() =>{
        const res = await axios.get(api+ '/projects/portal/' + domain)
        set_project(res.data)
        dispatch(setProject(res.data))
    }


    useEffect(()=>{
        fetchProjectByDomain()
        dispatch(setAsClient())
    }, [])




    return(<>        {
            userId ? 
                <InvoiceList/>
            :
            <div className="sq-outter-frame">
                    
                    {passwordValid ?
                    (<InvoiceList
                    />) : (<PortalLogin
                        set_passswordValid={set_passswordValid}
                    />)}
                    
            </div> 
        }
    
    </>
)}
export default InvoiceListLogin;

