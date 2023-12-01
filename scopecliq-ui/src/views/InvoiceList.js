import axios from 'axios'
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';

import { isClient, setAsClient, setAsConsultant} from '../store/client-store';
import { storeProject, setProject} from '../store/project-store';
import { showSnackbarMessage} from '../store/snackbar-store';

import Invoice from '../components/Invoice';
import NavBar from '../components/NavBar';
import SidebarOffsetBlueprint from '../modules/SidebarOffsetBlueprint';



const InvoiceList = () => {
    const api = global.config.API
    const dispatch = useDispatch();

    const clientMode = useSelector(isClient)
    const project=(useSelector(storeProject))
    const { domain, projectId } = useParams();

    const [invoices, set_invoices] = useState([]);
    const [milestones, set_milestones] = useState([]);
    

    const getProject = async () =>{
        try{
            if(projectId && projectId !== project?.id){
                const res = await axios.get(api+ '/projects/' + projectId)
                dispatch(setProject(res.data))
            }else if(domain && domain !== project?.domain){
                const res = await axios.get(api+ '/projects/portal/' + domain)
                dispatch(setProject(res.data))
            }
        }catch(e){
            dispatch(showSnackbarMessage({
                status: 'error',
                message: e.response.data.message 
            }))
        }

    }

    const getMilestones = async() => {
        if(!project) return
        try{
            const res = await axios.get(api+  '/milestones/project/'+ project.id )
            set_milestones(res.data)
            // console.log(res.data)
        }catch(e){
            dispatch(showSnackbarMessage({
                status: 'error',
                message: e.response.data.message 
            }))
        }
        
    }


    const getInvoices = async () => {
        if(!project) return
        try{
            const res = await axios.get(api+ '/invoices/project/' + project.id)
            set_invoices(res.data)

        }catch(e){
            dispatch(showSnackbarMessage({
                status: 'error',
                message: e.response.data.message 
            }))
        }
    }

    useEffect(()=>{
        if(domain){
            dispatch(setAsClient())
        }else if(projectId){
            dispatch(setAsConsultant())
        }
        dispatch(setProject(null))
        getProject()
        // getInvoices()
    },[])
    useEffect(()=>{
        console.log('proj change')
        getMilestones()
    },[project])



    return(
        <div class="sq-dashboard-portal">
            <div class="sq-body">
                <NavBar>
                    {/* <div className='sq-link'>Your Invoices</div> */}
                </NavBar>
                <div className="sq-content h-100">

                    {project && (<div className='project-header pt-2 my px-3'>
                        <strong className='font-size-11'>
                            <Link to={
                                clientMode ? `/portal/${project?.portal_domain}` : `/dashboard/${project?.id}`
                                } className='sq-link text-color-sq-med pb-0'>
                                <i class="fa-solid fa-regular fa-arrow-left me-2 fa-xs"/>
                                Back to Project
                            </Link>
                        </strong>   
                        <h2 className='mt-2'>Invoices: &nbsp;
                            <strong className='text-color-sq-lav-dark'>{project && project.name}</strong>
                        </h2> 
                    </div>)}

                    <div className='mx-5'>
                        {milestones.map((m, i)=>(
                            <div key={i}>
                                <Invoice
                                    propMilestoneId={m.id}
                                    milestone={m}
                                />
                            </div>
                        ))}
                        
                    </div>
                    
                </div>
            </div>
            {/* <SidebarOffsetBlueprint/> */}
        </div>
    )
}

export default InvoiceList;