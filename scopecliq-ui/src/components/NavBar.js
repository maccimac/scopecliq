import axios from 'axios'
import { useState, useEffect } from "react";
import logo from '../assets/img/sq-logo.svg'
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isClient} from '../store/user-store';
import { currentUserId, setUserId } from '../store/login-store';
import { Link } from "react-router-dom";

export const NavBar = ({children}) => {
    const api = global.config.API;
    const clientMode = useSelector(isClient);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const userId = useSelector(currentUserId)

    const logout = () => {
        dispatch(setUserId(null))
        navigate("/")
        
    }

    return(
        <div className={`
            sq-navigation p-3 d-flex align-items-center justify-content-between
            ${clientMode ? 'bg-sq-white' : 'bg-sq-lav-dark'}
        `
        }>
            <div className="d-flex col-lg-4 col-sm-4 col-6 align-items-center">
                <Link to="/">
                    <img src={logo} className="sq-logo-sm w-auto mb-1 me-3"></img >
                </Link>
                <span className={
                    `sub
                        ${clientMode ? 'text-color-sq-lav' : 'text-color-sq-green'}
                    `
                }>{clientMode ? 'Client Portal' : 'Consultant Dashboard'}</span>
            </div>

            <div className='d-flex w-100 align-item-center'>
               {children}
            </div>
            {
                userId && 
                <div className='d-flex mt-1'>
                    <div className='d-inline-flex align-items-center sq-link text-color-sq-lav-muted ms-4' onClick={logout}>
                        <i class="fa-solid fa-arrow-right-from-bracket me-1"></i>  Logout
                    </div>
                </div>
            }

            
            
        </div>
    )
}

export default NavBar;