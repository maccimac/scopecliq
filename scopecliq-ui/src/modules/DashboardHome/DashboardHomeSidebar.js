import axios from 'axios'
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../../store/user-store';
import { currentUserId } from '../../store/login-store';

import OrganizationCard from '../../components/OrganizationCard';
import { Tooltip } from '@mui/material';

const DashboardHomeSidebar = ({className, project}) => {
    const api = global.config.API;
    const clientMode = useSelector(isClient);
   
    const dispatch = useDispatch();
    const userId = useSelector(currentUserId)
    // const [projects, set_projects] = useState(null)
    const [organization, set_organization] = useState(null)
    const [projectStats, set_projectStats] = useState({
      open: 0,
      due: 0,
      pending: 0,
      complete: 0
    })
    const [milestoneStats, set_milestoneStats] = useState({
      open_milestones_id: [],
      deliverables_open_milestones_all: 0,
      deliverables_open_milestones_complete: 0,
      open_milestones_due: 0,
      deliverables_completed_all: 0
      // 'open_milestones' => [],
      // 'deliverables_completed_open_milestones'=> 0,
      // 'open_milestones_due' => 0,
      // 'deliverables_completed_all' => 0  
    })

  const fetchProjectStats = async() =>{
    try{
      const res = await axios.get(`${api}/analytics/${userId}/projects`);
      console.log(res)
      set_projectStats(res.data)
    }catch(e){
      console.log(e)
    }  
  
  }

  const fetchMilestoneStats = async() =>{
    try{
      const res = await axios.get(`${api}/analytics/${userId}/milestones`);
      console.log(res)
      set_milestoneStats(res.data)
    }catch(e){
      console.log(e)
    }  
  
  }
    


    const fetchConsultantOrg = async() =>{
        const res = await axios.get(api+ '/organizations/consultant/'+userId)
        set_organization(res.data)
    }

    useEffect(()=>{
        // dispatch(setAsConsultant)
        // fetchAllProjects()
        // fetchConsultantOrg();
        fetchProjectStats()
        fetchMilestoneStats()
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
                  {projectStats.open}
                </span>
                <div className='p mt-0'>
                  Open projects
                </div>
              </div>
              <div className='sq-stat-card d-flex flex-column justify-content-center align-items-center p-2 bg-sq-tomato-lightest rounded w-50 me-2 text-center'>
                <span className='h2 text-color-sq-tomato mb-0'>
                  {projectStats.due}
                </span>
                <div className='p mt-0'>
                  Open projects due next 30 days
                </div>
              </div>
              
            </div>
            <div className='d-flex align-items-stretch mb-2'>
              <div className='sq-stat-card d-flex flex-column justify-content-center align-items-center p-2 bg-sq-lav-light rounded w-50 text-center me-2'>
                <span className='h2 text-color-sq-lav-muted mb-0'>
                  {projectStats.pending}
                </span>
                <div className='p mt-0'>
                  Pending projects / not started
                </div>
              </div>
              <div className='sq-stat-card d-flex flex-column justify-content-center align-items-center p-2  rounded w-50 text-center me-2'>
                <p>
                  <strong className='text-color-sq-green-mid'>{projectStats.complete}</strong> total completed projects
                </p>
              </div>
            </div>
          </div>
          <hr/>
          <div className='my-4'>
            <h4>Milestones and Deliverables</h4>
            <div className='d-flex align-items-stretch mb-2'>
              <div className='sq-stat-card d-flex flex-column justify-content-center align-items-center p-2 bg-sq-lav-light rounded w-50 me-2 text-center'>
                <div className='sq-stat-card-info-holder'>
                  <Tooltip title="
                    Once you have completed one Deliverable in a milestone, it is now considered an open milestone.
                  ">
                    <div className='sq-btn-icon'>
                      <i className='fa-solid fa-question'/>
                    </div>
                  </Tooltip>
                </div>
    
                <span className='h2 text-color-sq-lav-mid mb-0'>
                  {milestoneStats.open_milestones_id.length}
                </span>
                <div className='p mt-0'>
                  Ongoing milestones
                </div>
              </div>
              <div className='sq-stat-card d-flex flex-column justify-content-center align-items-center p-2 bg-sq-green-light rounded w-50 text-center me-2'>
                <div className='h2 mb-0'>
                  <span className='text-color-sq-green-mid'>{milestoneStats.deliverables_open_milestones_complete}</span> 
                  <span className='h3 h3-light text-color-sq-light'>&nbsp; of &nbsp;</span>
                  <span className='text-color-sq-green-muted'>{milestoneStats.deliverables_open_milestones_all}</span>
                </div>
                <div className='p mt-0'>
                  Deliverables completed from open milestones
                </div>
              </div>
            </div>
            <div className='d-flex align-items-stretch mb-2'>
              <div className='sq-stat-card d-flex flex-column justify-content-center align-items-center p-2 bg-sq-tomato-lightest rounded w-50 me-2 text-center'>
              <div className='sq-stat-card-info-holder'>
                  <Tooltip title="
                    Due milestones in ongoing projects. Completed milestones are not considered due.  
                  ">
                    <div className='sq-btn-icon'>
                      <i className='fa-solid fa-question'/>
                    </div>
                  </Tooltip>
                </div>
                <span className='h2 text-color-sq-tomato mb-0'>
                  {projectStats.due}
                </span>
                <div className='p mt-0'>
                  Due milestone in the next 30 days 
                </div>
              </div>
              <div className='sq-stat-card d-flex flex-column justify-content-center align-items-center p-2  rounded w-50 text-center me-2 d-flex'>
                <p>
                  <strong className='text-color-sq-green-mid'>{milestoneStats.deliverables_completed_all}</strong> total completed deliverables
                </p>
              </div>
            </div>
          </div>
          <hr/>
          <div className='my-4'>
            <h4>Invoice and Payments</h4>
            <div className='d-flex align-items-stretch mb-2'>
                <div className='sq-stat-card d-flex flex-column justify-content-center align-items-center p-2 bg-sq-green-light rounded w-50 text-center me-2'>
                  <div className='h2 mb-0'>
                    <span className='text-color-sq-green-mid'>3</span> 
                    {/* <span className='h3 h3-light text-color-sq-light'>&nbsp; out of &nbsp;</span>
                    <span className='text-color-sq-green-muted'>10</span> */}
                  </div>
                  <div className='p mt-0'>
                    Completed milestones ready to be invoiced
                  </div>
                </div>
                <div className='sq-stat-card d-flex flex-column justify-content-center align-items-center p-2 bg-sq-lightest rounded w-50 text-center me-2'>
                  <div className='h2 mb-0'>
                    <span className='text-color-sq-green-mid'>3</span> 
                    {/* <span className='h3 h3-light text-color-sq-light'>&nbsp; out of &nbsp;</span>
                    <span className='text-color-sq-green-muted'>10</span> */}
                  </div>
                  <div className='p mt-0'>
                    Invoices paid this month
                  </div>
                </div>

            </div>
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
            <div className='sq-stat-card d-flex flex-column justify-content-center align-items-center p-2 bg-sq-lightest rounded w-100 mb-2 text-center me-2'>
                <div className='h2 mb-0'>
                  <span className='text-color-sq-green-muted'>$ 1,650</span> 
                </div>
                <div className='p mt-0'>
                  Total revenue unpaid from sent invoices
                </div>
            </div>
            {/* <div className='d-flex align-items-stretch mb-2'>
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
            </div> */}
          </div>

          </div>

        </div>
    )
}

  export default DashboardHomeSidebar;
  
  
  
  
  
  
  

