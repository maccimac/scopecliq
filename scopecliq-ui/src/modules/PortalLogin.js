import axios from 'axios'
import { useState, useEffect } from "react";
import NavBar from '../components/NavBar';

const PortalLogin = ({verifyPassword, project}) => {
    const api = global.config.API
    const [passwordModel, set_passwordModel] = useState("")
    const [passwordStatus, set_passwordStatus] = useState(null)

    const submit = () =>{
        verifyPassword(passwordModel)
        set_passwordModel("")
    }

    return(
        <div class="sq-portal-login">
            <NavBar/>
            <div className='portal__body p-4'>
            <h2 className='mb-3'>
                {(project && project.name) ? 
                    ( <>
                        Welcome to {project.name}'s Project Portal 
                    </>):  'Portal Login'
                } 
                
            </h2>
            <div className='title mb-2'> Please enter your password</div>
            <input className="sq-textarea mb-2 me-2" type="password" value={passwordModel} onChange={e => {
                set_passwordModel(e.target.value)
            }}placeholder='Password'/>
            <button className='sq-btn' onClick={submit}>Enter</button>
            </div>


        </div>
    )
}
export default PortalLogin;

