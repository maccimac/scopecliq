import axios from 'axios'
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../../store/user-store';
import { storeProject } from '../../store/project-store';
import { connect } from 'react-redux';

import Notification from '../../components/Notification';

const DashboardHomeSidebar = ({className, project}) => {
    const api = global.config.API;
    const clientMode = useSelector(isClient);
    // const aProject= useSelector(storeProject);



  useEffect(()=>{
    // fetch all projects
    // set storeProject to null
  },[])


    return(
        <div className={'sq-sidebar ' + className}>
         Sidebar

  
        </div>
    )
}

  export default DashboardHomeSidebar;
  
  
  
  
  
  
  

