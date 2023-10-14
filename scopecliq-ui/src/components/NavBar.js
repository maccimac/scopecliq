import axios from 'axios'
import { useState, useEffect } from "react";
import logo from '../assets/img/logo@2x.png'

export const NavBar = (isConsultant=true, withSidebar) => {
    return(
        <div class="sq-navigation p-3 bg-sq-white">
            <div class="d-flex flex-column col-lg-2 col-sm-4 col-6">
                <img src={logo} class="w-auto"></img >
                <span class="sub">{isConsultant ? 'Consultant Dashboard' : 'Client Portal'}</span>
            </div>
            
        </div>
    )
}

export default NavBar;