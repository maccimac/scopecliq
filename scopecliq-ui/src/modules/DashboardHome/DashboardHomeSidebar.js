import axios from 'axios'
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../../store/user-store';
import { currentUserId } from '../../store/login-store';

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
        <div className={'sq-sidebar bg-sq-white mt-0 ' + className}>
          <div className='sq-stats-holder p-4 pb-5'>
          <h3 className=''>📈 KPI Summaries</h3>
          <div className='my-4'>
            <h4>Projects</h4>
            <div className='d-flex align-items-stretch mb-2'>
              <div className='sq-stat-card d-flex flex-column justify-content-center align-items-center p-2 bg-sq-lav-light rounded w-50 me-2 text-center'>
                <span className='h2 text-color-sq-lav-mid mb-0'>
                  3
                </span>
                <div className='p mt-0'>
                  Open projects
                </div>
              </div>
              <div className='sq-stat-card d-flex flex-column justify-content-center align-items-center p-2 bg-sq-lav-light rounded w-50 text-center me-2'>
                <span className='h2 text-color-sq-lav-muted mb-0'>
                  3
                </span>
                <div className='p mt-0'>
                  Pending Projects
                </div>
              </div>
            </div>
            <div className='d-flex align-items-stretch mb-2'>
              <div className='sq-stat-card d-flex flex-column justify-content-center align-items-center p-2 bg-sq-tomato-lightest rounded w-50 me-2 text-center'>
                <span className='h2 text-color-sq-tomato mb-0'>
                  3
                </span>
                <div className='p mt-0'>
                  Due projects this month
                </div>
              </div>
              <div className='sq-stat-card d-flex flex-column justify-content-center align-items-center p-2  rounded w-50 text-center me-2'>
                <p>
                  <strong className='text-color-sq-green-mid'>40</strong> total completed milestones
                </p>
              </div>
            </div>
          </div>
          <hr/>
          <div className='my-4'>
            <h4>Milestones and Deliverables</h4>
            <div className='d-flex align-items-stretch mb-2'>
              <div className='sq-stat-card d-flex flex-column justify-content-center align-items-center p-2 bg-sq-lav-light rounded w-50 me-2 text-center'>
                <span className='h2 text-color-sq-lav-mid mb-0'>
                  3
                </span>
                <div className='p mt-0'>
                  Open milestones
                </div>
              </div>
              <div className='sq-stat-card d-flex flex-column justify-content-center align-items-center p-2 bg-sq-green-light rounded w-50 text-center me-2'>
                <div className='h2 mb-0'>
                  <span className='text-color-sq-green-mid'>3</span> 
                  <span className='h3 h3-light text-color-sq-light'>&nbsp; out of &nbsp;</span>
                  <span className='text-color-sq-green-muted'>10</span>
                </div>
                <div className='p mt-0'>
                  Deliverables completed from open milestones
                </div>
              </div>
            </div>
            <div className='d-flex align-items-stretch mb-2'>
              <div className='sq-stat-card d-flex flex-column justify-content-center align-items-center p-2 bg-sq-tomato-lightest rounded w-50 me-2 text-center'>
                <span className='h2 text-color-sq-tomato mb-0'>
                  3
                </span>
                <div className='p mt-0'>
                  Due projects this month
                </div>
              </div>
              <div className='sq-stat-card d-flex flex-column justify-content-center align-items-center p-2  rounded w-50 text-center me-2 d-flex'>
                <p>
                  <strong className='text-color-sq-green-mid'>40</strong> total completed milestones
                </p>
              </div>
            </div>
          </div>
          <hr/>
          <div className='my-4'>
            <h4>Invoice and Payments</h4>
            <div className='sq-stat-card d-flex flex-column justify-content-center align-items-center p-2 bg-sq-lightest rounded w-100 mb-2 text-center me-2'>
                <div className='h2 mb-0'>
                  <span className='text-color-sq-green-mid'>6</span> 
                  <span className='h3 h3-light text-color-sq-light'>&nbsp; out of &nbsp;</span>
                  <span className='text-color-sq-green-muted'>24</span>
                </div>
                <div className='p mt-0'>
                  of open invoices paid
                </div>
            </div>
            <div className='sq-stat-card d-flex flex-column justify-content-center align-items-center p-2 bg-sq-lightest rounded w-100 mb-2 text-center me-2'>
                <div className='h2 mb-0'>
                  <span className='text-color-sq-green-mid'>$ 2,400</span> 
                </div>
                <div className='p mt-0'>
                  Total revenue received this month
                </div>
            </div>
            <div className='d-flex align-items-stretch mb-2'>
              <div className='sq-stat-card d-flex flex-column justify-content-center align-items-center p-2 bg-sq-lav-light rounded w-50 me-2 text-center'>
                <span className='h2 text-color-sq-lav-mid mb-0'>
                  3
                </span>
                <div className='p mt-0'>
                  Open projects
                </div>
              </div>
              <div className='sq-stat-card d-flex flex-column justify-content-center align-items-center p-2 bg-sq-lav-light rounded w-50 text-center me-2'>
                <span className='h2 text-color-sq-lav-muted mb-0'>
                  3
                </span>
                <div className='p mt-0'>
                  Pending Projects
                </div>
              </div>
            </div>
            <div className='d-flex align-items-stretch mb-2'>
              <div className='sq-stat-card d-flex flex-column justify-content-center align-items-center p-2 bg-sq-tomato-lightest rounded w-50 me-2 text-center'>
                <span className='h2 text-color-sq-tomato mb-0'>
                  3
                </span>
                <div className='p mt-0'>
                  Due projects this month
                </div>
              </div>
              <div className='sq-stat-card d-flex flex-column justify-content-center align-items-center p-2  rounded w-50 text-center me-2'>
                
              </div>
            </div>
          </div>
              

          
          </div>

        </div>
    )
}

  export default DashboardHomeSidebar;
  
  
  
  
  
  
  

