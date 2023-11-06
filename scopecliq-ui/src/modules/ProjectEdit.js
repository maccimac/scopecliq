import axios from 'axios'
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';
import { currentUserId } from '../store/login-store';

import OrganizationCardEdit from '../components/OrganizationCardEdit';

export const ProjectEdit = (isConsultant=true) => {
    const api = global.config.API
    const origin = window.location.origin;
    const navigate = useNavigate()

    const userId = useSelector(currentUserId)

    const [organizationId, set_organizationId] = useState(0)
    const [organizations, set_organizations] = useState([
        {
            id: 0,
            organization_name: "Create new organization" 
        }
    ])
    const [organization, set_organization] = useState(null)

    const [project, set_project] = useState(null)
    const [modelProjectName, set_modelProjectName] = useState('')
    const [modelProjectAbout, set_modelProjectAbout] = useState('')
    const [modelProjectBudget, set_modelProjectBudget] = useState(null)
    const [modelProjectDomain, set_modelProjectDomain] = useState('')
    const [modelProjectPassword, set_modelProjectPassword] = useState('')
    const [modelProjectTerms, set_modelProjectTerms] = useState('')
  

    const fetchAllOrganizations = async() =>{
        const res = await axios.get(api+ '/organizations')
        console.log(res.data)
        set_organizations(
            [{
                id: 0,
                organization_name: "Create new organization" 
            },
            ... res.data
        ])
    }
    const onOrganizationChange= evt =>{
        set_organizationId(evt.target.value)
        const org = organizations.find(o=>{
            return o.id == evt.target.value
        })
        set_organization(org)
    }

    const createProjectFull = async () =>{
    
        if(organizationId==0){
            const res = await axios.post(`${api}/organizations/add/${userId}`, organization, {
                headers: {
                  "Content-Type": "application/json",
                },
            });
            set_organization({
                ...organization,
                organization_id: res.data
            })
            set_organizationId(res.data)
            console.log('no org', res)
            if(res){
                createProject(res.data)
            }
        }else{
            console.log('existing org')
            createProject(organizationId)
        }

    }

    const createProject = async(orgId) =>{
        const res = await axios.post(`${api}/projects/add/${orgId}`, project, {
            headers: {
              "Content-Type": "application/json",
            },
        });
        console.log(res.data)
        navigate(`/dashboard/${res.data}`)
    }

    useEffect(()=>
    {
        fetchAllOrganizations()
    }, [])

    useEffect(()=>{
        set_project({
            organization_id: organization ? organization.id : null,
            name: modelProjectName,
            about: modelProjectAbout,
            budget: modelProjectBudget,
            portal_domain: modelProjectDomain,
            portal_password: modelProjectPassword,
            terms: modelProjectTerms,
        })

    }, [
        modelProjectName,
        modelProjectAbout,
        modelProjectBudget,
        modelProjectDomain,
        modelProjectPassword,
        modelProjectTerms,
    ])


    return(
        <div className='project-edit'>
            <div className=''>
                <div className='organization mb-4 w-100 me-4'>
                
                    <h2>
                        Client  {organization && organization.organization_name}
                    </h2>
                    <div className='sub mb-2'>Existing Organization</div>
                    <select 
                        class="form-select sq-input form-select-sm" 
                        aria-label=".form-select-sm example"
                        value={organizationId}
                        onChange={(e)=>{onOrganizationChange(e)
                        }}
                        
                    >
                        {organizations.map((o, i)=>(
                            <option 
                                key={o.id} value={o.id}
                            >
                                {o.organization_name}
                            </option>
                        ))}
            
                    </select>
                        {organizationId==0 && (
                                <OrganizationCardEdit
                                dark
                                className="mt-2"
                                cb={{set_organization}}
                            />

                        )}
                </div>

                <div className='project w-100'>
                    <h2>
                        Project
                    </h2>
                    {/* <div className='sub mb-2'>Existing Organization</div> */}

                    <div className='label'>
                        General Details
                    </div>
                    <input className='sq-input w-100 mb-2 mb-2' 
                        value={modelProjectName} 
                        onChange={(e)=>{
                            set_modelProjectName(e.target.value)
                        }}
                        placeholder='Project Name'
                    ></input>
                    <textarea placeholder="About the Project" className='sq-textarea w-100' rows="4" 
                        onChange={(e)=>{
                            set_modelProjectAbout(e.target.value)
                        }}
                        value={modelProjectAbout}
                        cols="100"
                    ></textarea>
                    <div className='sq-input d-flex w-100 mb-2 bg-sq-white text-color-sq-mid '>
                        <span>$</span> <input type="number" className='border-0 outline-0'
                        style={{flexGrow: 1}} 
                        value={modelProjectBudget} 
                        onChange={(e)=>{
                            set_modelProjectBudget(e.target.value)
                        }}
                        placeholder='Project Budget'
                    ></input>
                    </div>
                    
                    <div className='label'>
                        Portal information
                    </div>
                    <div className='d-flex'>
                        <div
                            className='sq-input d-flex align-items-center
                                mb-2 w-75 
                                bg-sq-white text-color-sq-mid 
                                font-size-12 me-2'
                        >
                            <span className='text-color-sq-light'>{origin}/portal/</span>
                             
                            <input className='border-0 outline-0 text-color-sq-lav-dark' 
                                value={modelProjectDomain} 
                                onChange={(e)=>{
                                    set_modelProjectDomain(e.target.value)
                                }}
                                placeholder='Portal Domain'
                            ></input>
                        </div>
                        <input className='sq-input w-25 mb-2' 
                            value={modelProjectPassword} 
                            onChange={(e)=>{
                                set_modelProjectPassword(e.target.value)
                            }}
                            placeholder='Portal Password'
                        ></input>
                    </div>

                    <div className='label'>
                        Terms
                    </div>
                    
                    <textarea placeholder="Terms and Conditions" className='sq-textarea w-100' rows="4" 
                        onChange={(e)=>{
                            set_modelProjectTerms(e.target.value)
                        }}
                        value={modelProjectTerms}
                        cols="100"
                    ></textarea>
                </div>
            </div>
      

            <div className='d-flex justify-content-end'>
                <button className='sq-btn' onClick={createProjectFull}>
                    Add
                </button>
            </div>
          


        </div>
    )
}

export default ProjectEdit;