import axios from 'axios'
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showSnackbarMessage } from '../store/snackbar-store';
import { setUserId, currentUserId } from '../store/login-store';
import { setAsClient, setAsConsultant } from '../store/client-store';
import OrganizationCardEdit from './../components/OrganizationCardEdit'
import Modal from '@mui/material/Modal';
import logo from '../assets/img/sq-logo.svg'
import splash from '../assets/img/splash.png'

const Home = () => {
    const api = global.config.API
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userId = useSelector(currentUserId)
    const [modelEmail,  set_modelEmail] = useState('')
    const [modelPassword, set_modelPassword] = useState('')
    const [modelPasswordVerify, set_modelPasswordVerify] = useState('')
    const [modeRegister, set_modeRegister]=useState(false)
    const [showCreateOrg, set_showCreateOrg] = useState(false)
    const [organization, set_organization] = useState(null)
    const [loading, set_loading] = useState(false)

   
    const login =  async() => {
        dispatch(setUserId(null))
        try {
            const response = await axios.post(api+ '/user/login', {
                // email: 'doug@douglasdevs.com',
                // password: 'pass1234'
                // email: 'web@webcrafterinc.com',
                // password: 'scopecliq_v1'
                email: modelEmail,
                password: modelPassword
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
    
            console.log(response); // Log the response data

            if(response.data.status === 'success'){
                dispatch(setUserId(response.data.user_id))
                navigate('/dashboard/')
            }
            // You can perform actions based on the response here, e.g., redirect on success
    
        } catch (error) {
            console.log(error)
            dispatch(showSnackbarMessage({
                status: "error",
                message:  error.response.data.message || error.message
            }))
        }
     }

     

     const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    const isRegistrationValid = async (payload) =>{
        // frontend validation
         if(!validateEmail(modelEmail)){
            dispatch(showSnackbarMessage({
                status: "error",
                message: "Email is invalid"
            }))
            return false;
        }

        if(modelPassword.length < 8){
            dispatch(showSnackbarMessage({
                status: "error",
                message: "Password should be 8 characters long"
            }))
            return false;
        }

        if(modelPassword !== modelPasswordVerify){
            dispatch(showSnackbarMessage({
                status: "error",
                message: "Password verification does not match"
            }))
            return false;
        }

        // backend validation
        let returnVal = false
    
        try{
            const res = await axios.post( api + '/user/validate', payload, {
                headers: {
                    "Content-Type": "application/json",
                }
            });


            if(res.status === 'success'){
                return returnVal = true
            }

    
        }catch(e){
            console.log(e)
            dispatch(showSnackbarMessage({
                status: "error",
                message:  e.response.data.message || e.message
            }))

            return false;
        }finally{
            return returnVal
        }
    }

    const isOrganizationValid = () =>{

        if(!organization) return false;
        if(!validateEmail(organization.contact_email)){
            dispatch(showSnackbarMessage({
                status: "error",
                message: "Organization contact email is invalid"
            }))
            return false;
        }
        if(organization.organization_name.length < 1
           || organization.contact_name.length < 1
           || organization.contact_about.length < 1
           || organization.contact_number.length < 1
        ){
            dispatch(showSnackbarMessage({
                status: "error",
                message: "Make sure all fields are filled"
            }))
            return false;
        }
        return true
    }

     const initRegister = async() => {
        dispatch(setUserId(null))
        if(!isRegistrationValid(({
                email: modelEmail,
                password: modelPassword
            }))){ return }else{
                set_showCreateOrg(true) 
            }        
     }

     const register =  async() => {
        if(!isRegistrationValid({
            email: modelEmail,
            password: modelPassword
        })){ return }
        if(!isOrganizationValid()){ return } 
        console.log('attempting registration...')
        try {
            const response = await axios.post(api+ '/user/register', {
                name: organization.contact_name,
                email: modelEmail,
                password: modelPassword
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
    
            if(response?.data?.status==='success'){   
                const userId = response.data.user_id
                dispatch(setUserId(userId))
                dispatch(showSnackbarMessage({
                    message: "Account created"
                }))
                await createOrganization(userId)
            } 
        } catch (error) {
            console.log(error)

            dispatch(showSnackbarMessage({
                status: "error",
                message: "Error creating your account: " +  error.response.data.message || error.message 
            }))
        }
     }

     const createOrganization = async (userId) => {
        if(!isOrganizationValid()){ return } 
        try{
            const res = await axios.post(`${api}/organizations/add/${userId}`, organization, {
                headers: {
                "Content-Type": "application/json",
                },
            });
            set_organization({
                ...organization,
                organization_id: res.data
            })
            dispatch(showSnackbarMessage({
                message: "Organization created. Navigating to your dashboard."
            }))
            navigate("/dashboard")
        }catch(e){
            console.log(e)
            dispatch(showSnackbarMessage({
                status: 'error',
                message: "Error creating your organization" + e.response.data.message ||  e.message
            }))
        }

     }


    useEffect(()=>{
        if(userId){
            navigate('/dashboard/')
        }
    }, []);


    useEffect(()=>{
        set_organization(
            {...organization,
            contact_email: modelEmail}
        )
    }, [modelEmail])



    return (
        <div className='sq-home'>
                <div className='p-4 sq-navigation container-fluid bg-transparent'>
                    <div className='col-md-2'>
                        <img src={logo} className="sq-logo-md w-auto mb-1 me-3" alt="scopecliq-logo"></img >
                    </div>
                </div>
                {/* <NavBar/> */}
                <div className='sq-body container align-items-center'>
                    <div className='row align-items-center'>
                        <div className='col-12 col-md-5 col-lg-6'>
                            <h1 className='mb-3'>
                                A Freelancing Toolkit for your Emerging Business
                            </h1>
                            <h3 className='h3-light mb-4'>ScopeCliq is a straightforward freelancing toolkit that helps you focus on your core tasks by reducing client update requests, improving client alignment, and supporting project + account management.</h3>
                            <div className='bg-sq-lav-light w-75 sq-outter-shadow mb-4 p-3 rounded'>
                                <div className='sub mb-2'>
                                    Demo Login Credentials
                                </div>
                                <div className='sq-grid font-size-11 w-75'>
                                    <strong>Email:</strong>
                                    <div className=''>doug@douglasdevs.com</div>
                                </div>
                                <div className='sq-grid font-size-11 w-75'>
                                    <strong>Password:</strong>
                                    <div className=''>pass1234</div>
                                </div>
                            </div>
                            <div>
                                <h3 className='h3-light'>
                                    {modeRegister ? 'Register' : 'Login'}
                                </h3>
                                <div className=''>
                                    <input className='sq-input w-75 mb-2 me-2' 
                                                value={modelEmail} 
                                                onChange={(e)=>{
                                                    set_modelEmail(e.target.value)
                                                }}
                                                placeholder='Email'
                                    ></input>
                                    <br/>
                                    <input type="password" className='sq-input w-75 mb-2' 
                                            value={modelPassword} 
                                            onChange={(e)=>{
                                                set_modelPassword(e.target.value)
                                            }}
                                            placeholder='Password'
                                    ></input>
                                    <br/>
                                    {
                                        modeRegister &&
                                        <input type="password" className='sq-input w-75 mb-2' 
                                            value={modelPasswordVerify} 
                                            onChange={(e)=>{
                                                set_modelPasswordVerify(e.target.value)
                                            }}
                                                placeholder='Verify Password'
                                        ></input>
                                    }

                                </div>
                            </div>
                            {
                                !modeRegister ?
                                <div className='d-flex align-items-center'>
                                    <button className='sq-btn me-2' onClick={login}>
                                        Login
                                    </button>
                                    <p>
                                        No account yet? &nbsp; 
                                        <a className='sq-link' onClick={()=>{
                                            set_modeRegister(true)
                                        }}>
                                            Register
                                        </a>
                                    </p>
                                    
                                </div>
                                :
                                <div className='d-flex align-items-center mb-5'>
                                    <button className='sq-btn me-2' onClick={initRegister}>
                                        Register
                                    </button>
                                    <p>
                                        Already have an account? &nbsp;
                                        <a className='sq-link' onClick={()=>{
                                        set_modeRegister(false)
                                    }}>
                                        Login
                                    </a>
                                    </p>
                                    
                            </div>
                            }
                        
                        </div>
                        <div className='col-12 col-md-7 col-lg-6 d-flex align-items-center text-center p-3'>
                            <img src={splash} className="w-100 mt-5"></img >
                        </div>
                    </div>

                </div>

                <Modal
                    open={showCreateOrg}
                    onClose={()=>{
                        set_showCreateOrg(false)
                    }}
                    className='d-flex align-items-center fill-width justify-content-center outline-none border-none'
                >
                    <div className='outline-none border-none'>
                        <div className='bg-sq-white rounded p-4'>
                            <div className='d-flex justify-content-space-between'>
                                <h3 className='me-4'>
                                    Tell us more about your business to continue
                                </h3>
                                <div>
                                    <button
                                            className='sq-btn-icon bg-transparent'
                                            onClick={()=>{
                                                set_showCreateOrg(false)
                                            }}
                                        >
                                            <i className='fa fa-regular fa-solid fa-xmark text-color-sq-dark fa-xl'/>
                                        </button>
                                </div>
                            </div>

                            <div>
                            <div className='sub mb-2'>Your Login Details</div>
                                <div className='label'>
                                    Your Email
                                </div>
                                <div className=''>
                                    <input className='sq-input w-75 mb-2 me-2' 
                                                value={modelEmail} 
                                                onChange={(e)=>{
                                                    set_modelEmail(e.target.value)
                                                }}
                                                placeholder='Email'
                                    ></input>
                                    <br/>
                                    <div className='label'>
                                        Your Password
                                    </div>
                                    <div className='d-flex'>
                                        <input type="password" className='sq-input w-50 me-2 mb-2' 
                                                value={modelPassword} 
                                                onChange={(e)=>{
                                                    set_modelPassword(e.target.value)
                                                }}
                                                placeholder='Password'
                                        ></input>
                                        <input type="password" className='sq-input w-50 mb-2' 
                                            value={modelPasswordVerify} 
                                            onChange={(e)=>{
                                                set_modelPasswordVerify(e.target.value)
                                            }}
                                                placeholder='Verify Password'
                                        ></input>

                                    </div>
                                </div>
                            </div>
                            
                            <OrganizationCardEdit
                                cb={{
                                    set_organization
                                }}
                                organization={
                                    {contact_email: modelEmail}
                                }
                            />

                            <div className='d-flex'>
                                <button className='sq-btn' onClick={register}>
                                    {loading ? 'Loading...' : 'Register as Consultant'}
                                </button>
                            </div>

                            
                        </div>
                    </div>

                </Modal>
          
             
        </div>    
    )
    
}


export default Home;