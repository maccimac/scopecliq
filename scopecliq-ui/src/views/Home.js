import axios from 'axios'
import { useState, useEffect } from "react";
import logo from '../assets/img/sq-logo.svg'
import splash from '../assets/img/splash.png'
import NavBar from '../components/NavBar';

const Home = () => {
    const api = global.config.API
    const [modelEmail,  set_modelEmail] = useState('')
    const [modelPassword, set_modelPassword] = useState('')
    const [modelPasswordVerify, set_modelPasswordVerify] = useState('')
    const [modeRegister, set_modeRegister]=useState(false)

   
    const login =  async() => {
        try {
            const response = await axios.post(api+ '/user/login', {
                email: modelEmail,
                password: modelPassword
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
    
            console.log(response.data); // Log the response data
            // You can perform actions based on the response here, e.g., redirect on success
    
        } catch (error) {
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

     const register =  async() => {
        try {
            const response = await axios.post(api+ '/user/register', {
                name: 'admin',
                email: 'admin@douglasdevs.com',
                password: 'scopecliq_v1'
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
    
            console.log(response.data); // Log the response data
            // You can perform actions based on the response here, e.g., redirect on success
    
        } catch (error) {
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
                                <button className='sq-btn me-2' onClick={register}>
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


               

          
             
        </div>    
    )
    
}


export default Home;