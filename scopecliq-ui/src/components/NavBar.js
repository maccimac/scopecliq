import axios from 'axios'
import { useState, useEffect } from "react";
import logo from '../assets/img/logo@2x.png'
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../store/user-store';
import { Link } from "react-router-dom";

export const NavBar = ({children}) => {
    const api = global.config.API;
    const clientMode = useSelector(isClient);

    return(
        <div className={`
            sq-navigation p-3 d-flex align-items-center justify-content-between
            ${clientMode ? 'bg-sq-white' : 'bg-sq-lav-dark'}
        `
        }>
            <div class="d-flex col-lg-4 col-sm-4 col-6 align-items-center">
                <Link to="/">
                    <img src={logo} className="sq-logo w-auto mb-1 me-3"></img >
                </Link>
                <span className={
                    `sub
                        ${clientMode ? 'text-color-sq-lav' : 'text-color-sq-green'}
                    `
                }>{clientMode ? 'Client Portal' : 'Consultant Dashboard'}</span>
            </div>

            <div className='d-flex'>
               {children}
            </div>
            
        </div>
    )
}

export default NavBar;