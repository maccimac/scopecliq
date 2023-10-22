import axios from 'axios'
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../../store/user-store';
// import { storeProject } from '../../store/project-store';
import { currentUserId } from '../../store/login-store';
// import { connect } from 'react-redux';

// import Notification from '../../components/Notification';
import OrganizationCard from '../../components/OrganizationCard';

const DashboardHomeSidebar = ({className, project}) => {
    const api = global.config.API;
    const clientMode = useSelector(isClient);
   
    const dispatch = useDispatch();
    const userId = useSelector(currentUserId)
    // const [projects, set_projects] = useState(null)
    const [organization, set_organization] = useState(null)


    const fetchConsultantOrg = async() =>{
        const res = await axios.get(api+ '/organizations/consultant/'+userId)
        set_organization(res.data)
    }

    useEffect(()=>{
        // dispatch(setAsConsultant)
        // fetchAllProjects()
        fetchConsultantOrg();
    }, [])

    return(
        <div className={'sq-sidebar mt-5 ' + className}>
          <div className='your-organization my-2 p-4 pb-5 bg-sq-lav-dark'>
            <h2 className='text-color-sq-lav-muted my-3'>Your Organization</h2>
            {organization && (
                <OrganizationCard dark organization={organization}/>
            )}
            <div className='d-flex justify-content-end mt-2'>
              <button className='sq-btn'>Edit your organization</button>
            </div>
          </div>

        </div>
    )
}

  export default DashboardHomeSidebar;
  
  
  
  
  
  
  

