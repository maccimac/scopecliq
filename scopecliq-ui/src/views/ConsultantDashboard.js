import axios from 'axios'
import { useState, useEffect } from "react";
import  DashboardLayout  from './../modules/DashboardLayout';

const ConsultantDashboard = () => {
    const api = global.config.API
    const projId = 2;
    return(
        <div class="sq-outter-frame">
            <DashboardLayout>
                Main content
            </DashboardLayout>
        </div>
    )
}
export default ConsultantDashboard;

