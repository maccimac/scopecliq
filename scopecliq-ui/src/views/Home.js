import axios from 'axios'
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showSnackbarMessage } from '../store/snackbar-store';
import { setUserId, setLogin } from '../store/login-store';
import OrganizationCardEdit from './../components/OrganizationCardEdit'
import Modal from '@mui/material/Modal';
import logo from '../assets/img/sq-logo.svg'
import splash from '../assets/img/splash.png'

const Home = () => {
    const api = global.config.API
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [modelEmail,  set_modelEmail] = useState('')
    const [modelPassword, set_modelPassword] = useState('')
    const [modelPasswordVerify, set_modelPasswordVerify] = useState('')
    const [modeRegister, set_modeRegister]=useState(false)

    const [showCreateOrg, set_showCreateOrg] = useState(false)

    const [organization, set_organization] = useState(null)

   
    const login =  async() => {
        try {
            const response = await axios.post(api+ '/user/login', {
                // email: 'doug@douglasdevs.com',
                // password: 'pass1234'

                email: 'web@webcrafterinc.com',
                password: 'scopecliq_v1'

                // email: modelEmail,
                // password: modelPassword
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
                message: error.message || error.response.message
            }))

            if (error.response) {
                // The request was made, but the server responded with an error status
                console.error(error.response.data);
                console.error(error.response.status);
                console.error(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error(error.request);
            } else {
                // Something happened in setting up the request that triggered an error
                console.error('Error', error.message);
            }
        }
     }

     const findOrganization = () =>{

     }

     const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

     const initRegister = async() => {
        
        if(!validateEmail(modelEmail)){
            dispatch(showSnackbarMessage({
                status: "error",
                message: "Email is invalid"
            }))
            return;
        }

        if(modelPassword !== modelPasswordVerify){
            dispatch(showSnackbarMessage({
                status: "error",
                message: "Password verification does not match"
            }))
            return;
        }
        
        set_showCreateOrg(true)
     }


     const register =  async() => {


        try {
            const response = await axios.post(api+ '/user/register', {
                email: modelEmail,
                password: modelPassword
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
    
            console.log(response.data); // Log the response data
            if(response?.data?.status==='success'){
                
                const userId = response.data.user_id
                dispatch(setUserId(userId))

                dispatch(showSnackbarMessage({
                    message: "Account created"
                }))
                await createOrganization(userId)
            }
            // You can perform actions based on the response here, e.g., redirect on success
    
        } catch (error) {

            dispatch(showSnackbarMessage({
                status: "error",
                message: error.message || error.response.message
            }))


            if (error.response) {
                // The request was made, but the server responded with an error status
                console.error(error.response.data);
                console.error(error.response.status);
                console.error(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error(error.request);
            } else {
                // Something happened in setting up the request that triggered an error
                console.error('Error', error.message);
            }
        }
     }

     const createOrganization = async (userId) => {
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
            dispatch(showSnackbarMessage({
                status: 'error',
                message: e.response.data.message
            }))
        }

     }



    useEffect(()=>{

    }, [])


    return (
        <div className='sq-home'>
                <div className='p-4 sq-navigation container-fluid bg-transparent'>
                    <div className='col-md-2'>
                        <img src={logo} className="sq-logo-md w-auto mb-1 me-3"></img >
                    </div>

                </div>
                {/* <NavBar/> */}
                <div className='sq-body container align-items-center d-flex'>
                    <div className='col-sm-12 col-md-6 mb-5'>
                        <h1 className='mb-3'>
                            Freelancing Toolkit for Emerging Businesses
                        </h1>
                        <h2 className='text-color-sq-med mb-5'>
                            ScopeCliq is a straightforward freelancing management software that allows Clients to review project status overview real-time from a Client Portal.
                        </h2>
                        <div>
                            <h3 className='text-color-sq-med-light'>
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
                            <div className='d-flex align-items-center'>
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
                    <div className='col-sm-12 col-md-6 d-flex align-items-center text-center p-3'>
                        <img src={splash} className="w-100 mt-5"></img >
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
                                    Create your organization to continue
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
                            
                            <OrganizationCardEdit
                                cb={{
                                    set_organization
                                }}
                                organization={{
                                    contact_email: modelEmail
                                }}
                            />

                            <div className='d-flex'>
                                <button className='sq-btn' onClick={register}>
                                    Register as Consultant
                                </button>
                            </div>

                            
                        </div>
                    </div>

                </Modal>


               

          
             
        </div>    
    )
    
}


export default Home;