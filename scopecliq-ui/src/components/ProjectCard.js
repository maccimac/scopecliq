import axios from 'axios'
import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../store/user-store';
import {OrganizationCard} from './OrganizationCard'

export const ProjectCard = ({
    project,
    children,
    floating=true,
    dark=false,
    full=false,
    collapsed=false,
}) => {
    const api = global.config.API;
    // const clientMode = useSelector(isClient);
    const origin = window.location.origin;

    const [organization, set_organization] = useState({
        name: ''
    })
    const [isCollapsed, set_isCollapsed] = useState(collapsed); 
    const [progress, set_progress] = useState(0);

    const fetchOrganizationById = async () => {
        if(!project.organization_id) return;
        const res = await axios.get(api+ '/organizations/'+project.organization_id)
        set_organization(res.data)
    }

    const fetchProgressByProjectId = async() => {
        try{
            const res = await axios.get(`${api}/analytics/project/${project.id}/progress`);
            if(res.data){
                const progressNum = res.data;
                const inPercent = parseFloat((100*progressNum).toFixed(0));
                set_progress(inPercent)
            }
        }catch(e){
            console.log(e)
        }
    }

    const parseAmount = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }


    const resolveStatus = (progress) =>{
        if(progress==0){
            return (
                <div className='d-flex w-100 justify-content-between sub '>
                    <div>
                        Not started
                    </div>
                    <div>
                        {progress}%
                    </div>
                </div>
            )
        }else if(progress == 100){
            return (
                <div className='d-flex w-100 justify-content-between sub text-color-sq-green'>
                    <div>
                        Complete
                    </div>
                    <div>
                    {progress}%
                    </div>
                </div>
            )
            

        }else{
            return (
                <div className='d-flex w-100 justify-content-between sub text-color-sq-lav'>
                    <div>
                        Ongoing
                    </div>
                    <div>
                    {progress}%
                    </div>
                </div>
            )
        }

    }

    useEffect(()=>{
        fetchOrganizationById()
        fetchProgressByProjectId()
      },[project])
    
    return(
    <div>
        { project?.id && project?.organization_id &&  (<div className={`
            sq-project-card p-3 rounded mb-4
            ${dark && 'dark'}
            ${full && 'sq-project-card--full'}
        `}>
            {full && (<div className='project-title me-3'>
                    <h3 className='text-head'>{project.name}</h3>
                </div>)}
            <div className='project-header-stats d-flex justify-content-between mb-3'>
                {resolveStatus(progress)}
            </div>
            {!full && (<div className='project-title'>
                    <h3 className='text-head'>{project.name}</h3>
                </div>)}
            <div className='project-body project-body--collapsed mt-4'>
                <div className='sq-grid'>
                    <div className='text-prop'>Brief</div>
                    <div>{project.about}</div>
                </div>
                <div className='sq-grid'>
                    <div className='text-prop'>Total budget</div>
                    <div>${parseAmount(project.budget)}</div>
                </div>
                
                {isCollapsed && (<div className='sq-grid'>
                    <div className='text-prop'>Client</div>
                    <div>
                    <strong>{organization.contact_name}</strong>, {organization.organization_name}
                    </div>
                </div>)}

                {!isCollapsed && (<div className='more-details'>
                    <OrganizationCard className="mt-3" organization={organization}/>

                    {full && (
                    <div>
                        <div className='project-portal my-5'>
                            <div className='d-flex align-items-center w-100 justify-content-between mb-3'>
                                <h2 className='text-head mb-0'>Dedicated Portal</h2>
                                <a className='sq-link' href={'/portal/'+project.portal_domain}>Go to portal</a>
                            </div>
                            
                            <div className='project-client'>
                                <div className='sq-grid'>
                                    <span className='text-prop'>URL</span>
                                    <span>{origin}/portal/{project.portal_domain}</span> 
                                </div>
                                <div className='sq-grid align-items-center'>
                                    <span className='text-prop'>Password</span>
                                    <input disabled type="password" className='sq-input w-auto' value={project.portal_password}/> 
                                </div>
                            </div>
                        </div>    
                        <div className='project-terms my-5'>        
                            <h2 className='text-head mb-1'>
                                Terms and Conditions
                            </h2>
                            <textarea className='sq-textarea sq-textarea--terms w-100 terms-and-conditions' disabled>
                                {project.terms}
                            </textarea>
                        </div>
                    </div>
                    )}
                </div>)}

                

            </div>
            <div className='project-footer w-100 mt-4'>
                {children ? children
                :(<div className='d-flex w-100 justify-content-between align-items-center'>
                    {
                        isCollapsed 
                        ? (<span className='sq-link' onClick={()=>{
                            set_isCollapsed(false)
                        }}>
                            Show more
                            &nbsp; <i className='fa-solid fa-regular fa-chevron-down'></i>
                        </span>)
                        : <span className='sq-link' onClick={()=>{
                            set_isCollapsed(true)
                        }}>
                            Collapse
                            &nbsp; <i className='fa-solid fa-regular fa-chevron-up'></i>
                        </span>
                    }
                    <div className='d-flex align-items-center '>
                        {!isCollapsed && (<Link to={"/dashboard/" + project.id + "/invoices"} className='sq-link text-color-sq-green me-3'>
                            View invoices
                        </Link>)}

                        <Link to={"/dashboard/" + project.id } className='sq-btn sq-btn--green'>
                            Go to project
                        </Link>
                    </div>
                </div>)}
            </div>


        </div>)}
    </div>
    )
    
}

export default ProjectCard;