import axios from 'axios'
import { useState, useEffect } from "react";
import logo from '../assets/img/logo@2x.png'
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../store/user-store';

export const NavBar = () => {
    const api = global.config.API;
    const clientMode = useSelector(isClient);

    return(
        <div class="sq-navigation p-3 bg-sq-white">
            <div class="d-flex flex-column col-lg-2 col-sm-4 col-6">
                <img src={logo} class="w-auto mb-1"></img >
                <span className={
                    `sub
                        ${clientMode ? 'text-color-sq-lav' : 'text-color-sq-green'}
                    `
                }>{clientMode ? 'Client Portal' : 'Consultant Dashboard'}</span>
            </div>
            
        </div>
    )
}

export default NavBar;