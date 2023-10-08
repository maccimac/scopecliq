import axios from 'axios'
import { useState, useEffect } from "react";
import logo from '../assets/img/logo@2x.png'

export const NavBar = (isConsultant=true) => {
    const api = global.config.API
    return(
        <div class="sq-navigation row find-me p-3">
            <div class="d-flex flex-column col-lg-2 col-sm-4 col-6">
                <img src={logo} class="w-auto"></img>
                <span class="sub">{isConsultant ? 'Consultant Dashboard' : 'Client Portal'}</span>
            </div>
            
        </div>
    )
}

export default NavBar;