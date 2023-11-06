import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';


import { Routes, Route, Navigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';

import Home from './views/Home.js';
import ConsultantDashboard from './views/ConsultantDashboard.js';
import DashboardHome from './views/DashboardHome.js';
import ClientPortal from './views/ClientPortal';



const App = () => {  
  const snackbar = {
    open: true,
    message: "hello"
  }
  return (
    <div className="scopecliq">
      <Routes>
        <Route path="/" element={<Navigate replace to='/dashboard' />}/>
        <Route path="/dashboard/:projectId" element={<ConsultantDashboard/>}/>
        <Route path="/dashboard" element={<DashboardHome/>}/>
        <Route path="/portal/:domain" element={<ClientPortal/>}/>

        <Route path="/test" element={<Home/>}/>
      </Routes>
      
      {/* <Home/> */}

      <Snackbar
                    open={snackbar.open}
                >
                    <div>{snackbar.message}</div>
            </Snackbar>

    </div>
  );
}

export default App;
