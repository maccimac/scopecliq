import axios from 'axios'
import { useState, useEffect } from "react";
import NavBar from '../components/NavBar';
import { storeProject} from '../store/project-store';
import { useDispatch, useSelector} from 'react-redux';
import { setAsClient} from '../store/user-store';


const PortalLogin = ({set_passswordValid}) => {
    const api = global.config.API
    
    const dispatch = useDispatch()
    const project = useSelector(storeProject)


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

    useEffect(()=>{
        dispatch(setAsClient())
    }, [])

    return(
        <div className="sq-portal-login sq-body">
            <NavBar/>
            <div className='portal__body p-4'>
            <h2 className='mb-3'>
                {(project && project.name) ? 
                    ( <>
                        Welcome to {project.name}'s Project Portal 
                    </>):  'Portal Login'
                }  
            </h2>
            <div className='title mb-1'> Please enter your password</div>
            <div className='font-size-10 text-color-sq mb-2'>(The password is <strong>{project && project.portal_password}</strong>)</div>
            <input className="sq-textarea mb-2 me-2" type="password" value={passwordModel} onChange={e => {
                set_passwordModel(e.target.value)
            }}placeholder='Password'/>
            <button className='sq-btn ' onClick={submit}>Enter</button>
            <div className='text-color-sq-tomato font-size-10'>{passwordStatus}</div>
            </div>

        </div>
    )
}
export default PortalLogin;

