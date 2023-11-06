import axios from 'axios'
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { currentUserId } from '../store/login-store';

import OrganizationCardEdit from '../components/OrganizationCardEdit';

export const ProjectEdit = (isConsultant=true) => {
    const api = global.config.API
    const userId = useSelector(currentUserId)

    const [organizationId, set_organizationId] = useState(0)
    const [organizations, set_organizations] = useState([
        {
            id: 0,
            organization_name: "Create new organization" 
        }
    ])
    const [organization, set_organization] = useState(null)

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

    const createProject = async () =>{
        console.log({organization})

        const res = await axios.post(`${api}/organizations/add/${userId}`, organization, {
            headers: {
              "Content-Type": "application/json",
            },
        });
        console.log(res)
    }

    useEffect(()=>
    {
        fetchAllOrganizations()
    }, [])


    return(
        <div>
            <div className='organization mb-4'>
               
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

            <div className='project'>
                <h2>
                    Project Details
                </h2>
                <div className='sub mb-2'>Existing Organization</div>

            </div>


            <div>
                <button className='sq-btn' onClick={createProject}>
                    Add
                </button>
            </div>
          


        </div>
    )
}

export default ProjectEdit;