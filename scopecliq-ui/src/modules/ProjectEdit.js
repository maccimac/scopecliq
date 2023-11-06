import axios from 'axios'
import { useState, useEffect } from "react";
import logo from '../assets/img/logo@2x.png'
import OrganizationCardEdit from '../components/OrganizationCardEdit';

export const ProjectEdit = (isConsultant=true) => {
    const api = global.config.API

    const [organizationId, set_organizationId] = useState(0)
    const [organizations, set_organizations] = useState([
        {
            id: 0,
            organization_name: "Create new organization" 
        }
    ])

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

    useEffect(()=>
    {
        fetchAllOrganizations()
    }, [])


    return(
        <div>
            <div className='organization mb-4'>
                <h2>
                    Client
                </h2>
                <div className='sub mb-2'>Existing Organization</div>
                <select 
                    class="form-select sq-input form-select-sm" 
                    aria-label=".form-select-sm example"
                    value={organizationId}
                    onChange={(e)=>{
                        set_organizationId(e.target.value)
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
              />

            )}

            </div>

            <div className='project'>
                <h2>
                    Project Details
                </h2>
                <div className='sub mb-2'>Existing Organization</div>

            </div>
          


        </div>
    )
}

export default ProjectEdit;