import axios from 'axios'
import { useState, useEffect } from "react";
import NavBar from '../components/NavBar';

const PortalLogin = ({set_passswordValid, project}) => {
    const api = global.config.API
    const [passwordModel, set_passwordModel] = useState("")
    const [passwordStatus, set_passwordStatus] = useState(null)

    const verifyPassword = async(string) =>{
        if( !project || !string || !string.length) return;
        if(string == project.portal_password){
            set_passswordValid(true)
        }else{
            set_passwordStatus("The password does not match")
        }
    }

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
                <dov className='color-sq-tomato font-size-10'>{passwordStatus}</dov>
            </div>

        </div>
    )
}
export default PortalLogin;

