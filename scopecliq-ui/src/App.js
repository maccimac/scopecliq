import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';

import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';

import Snackbar from '@mui/material/Snackbar';

import Home from './views/Home.js';
import ConsultantDashboard from './views/ConsultantDashboard.js';
import DashboardHome from './views/DashboardHome.js';
import ClientPortal from './views/ClientPortal';
import Invoice from './components/Invoice';

import { storeSnackbar, resetSnackbarMessage } from './store/snackbar-store';
import { useEffect } from 'react';



const App = () => {  
  const dispatch = useDispatch();
  const snackbar = useSelector(storeSnackbar);

  useEffect(()=>{
    if(snackbar.show){
      setTimeout(()=>{
        dispatch(resetSnackbarMessage())
      }, 5000)  
    }
      }, [snackbar])


  return (
    <div className="scopecliq">
      <Routes>
        <Route path="/" element={<Navigate replace to='/dashboard' />}/>
        <Route path="/dashboard/:projectId" element={<ConsultantDashboard/>}/>
        <Route path="/dashboard" element={<DashboardHome/>}/>
        <Route path="/portal/:domain" element={<ClientPortal/>}/>
        <Route path="/invoice/:invoiceId" element={<Invoice/>}/>
        <Route path="/test" element={<Home/>}/>
      </Routes>
      
      {/* <Home/> */}

      <Snackbar open={snackbar.show}>
        <div className={`
          sq-outter-shadow border-sq-light px-3 py-2 rounded text-color-sq-white font-size-14
          ${!snackbar.status && ' bg-sq-gold-mid  '}
          ${snackbar.status == 'error' && ' bg-sq-tomato-light '}
          `
      }>{snackbar.message}</div>
      </Snackbar>

    </div>
  );
}

export default App;
