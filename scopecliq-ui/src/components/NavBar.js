import axios from 'axios'
import { useState, useEffect } from "react";
import logo from '../assets/img/logo@2x.png'
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../store/user-store';
import { Link } from "react-router-dom";

export const NavBar = () => {
    const api = global.config.API;
    const clientMode = useSelector(isClient);

    return(
        <div class={`sq-navigation p-3 d-flex align-items-center  ${clientMode ? 'bg-sq-white' : 'bg-sq-lav-dark'}`}>
            <div class="d-flex flex-column col-lg-2 col-sm-4 col-6">
                <img src={logo} className="sq-logo w-auto mb-1"></img >
                <span className={
                    `sub
                        ${clientMode ? 'text-color-sq-lav' : 'text-color-sq-green'}
                    `
                }>{clientMode ? 'Client Portal' : 'Consultant Dashboard'}</span>
            </div>

            <div className='d-flex'>
                {/* { clientMode 
                ? <a href="/dashboard/2" className='sq-btn'>Visit Consultant Dashboard</a>
                : <a href="/portal/siesta" className='sq-btn'>Visit Client Portal</a>
                }
                 */}
            </div>
            
        </div>
    )
}

export default NavBar;