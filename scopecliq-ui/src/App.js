import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';


import { Routes, Route, Navigate } from "react-router-dom";
// import React, { useState } from "react";

import Home from './views/Home.js';
import ConsultantDashboard from './views/ConsultantDashboard.js';
import ClientPortal from './views/ClientPortal';



const App = () => {  
  return (
    <div className="scopecliq">
      <Routes>
        <Route path="/" element={<Navigate replce to='/portal/siesta' />}/>
        <Route path="/dashboard/:projectId" element={<ConsultantDashboard/>}/>
        <Route path="/portal/:domain" element={<ClientPortal/>}/>
      </Routes>
      
      {/* <Home/> */}
    </div>
  );
}

export default App;
