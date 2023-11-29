import axios from 'axios'
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { currentUser, isClient} from '../../store/client-store';
import {currentUserId, currentUserOrg} from '../../store/login-store'
import { showSnackbarMessage } from '../../store/snackbar-store';
// import { storeProject } from '../../store/project-store';
// import { connect } from 'react-redux';
import OrganizationCardEdit from '../../components/OrganizationCardEdit';


const SidebarOffsetOrganizationEdit = ({
    organization,
    show,
    showHeader = true,
    onClose,
    cb
}) => {
    const api = global.config.API;
    const dispatch = useDispatch()
    const userId = useSelector(currentUserId)
    const userOrg = useSelector(currentUserOrg)

    const [organizationEdit, set_organizationEdit] = useState(organization)
    const [userEdit, set_userEdit] = useState(null)

    const [showOffcanvas, set_showOffcanvas] = useState(show); 

    const [modelEmail,  set_modelEmail] = useState()
    const [modelPassword, set_modelPassword] = useState('')
    const [modelPasswordVerify, set_modelPasswordVerify] = useState('')
    const [modeRegister, set_modeRegister]=useState(false)
   
    const [loading, set_loading] = useState(false)

    const toggleOffcanvas = () =>{ 
        set_showOffcanvas(!showOffcanvas);
    };
    const hideCanvas = () => {
        set_showOffcanvas(false);
    };

    const updateOrganization = async () => {
        try{
            console.log({organizationEdit})
            const res = await axios.post(`${api}/organizations/update/${organization.id}`, organizationEdit, {
                headers: {
                "Content-Type": "application/json",
                },
            });
            console.log({res})
            if(res.status===200){
                dispatch(showSnackbarMessage({
                    message: 'Save successful'
                }))
            }
            if(cb.onUpdate){ cb.onUpdate()}

            // set_organization({
            //     ...organization,
            //     organization_id: res.data
            // })
            // set_organizationId(res.data)
            // console.log('no org', res)
            // if(res){
            //     // createProject(res.data)
            // }
        }catch(e){
            console.log(e)
            dispatch(showSnackbarMessage({
                status: 'error',
                message: e.response.data.message
            }))
        }
    }

    useEffect(()=>{
        set_showOffcanvas(show)
    }, [show])

    useEffect(()=>{
        if(!showOffcanvas){
            onClose()
        }
    }, [showOffcanvas])

    useEffect(()=>{
        set_organizationEdit(organization)
    }, [organization])

    // useEffect(()=>{
    //     // 'organization_name' => $req->organization_name,
    //     // 'contact_name' => $req->contact_name,
    //     // 'contact_email' => $req->contact_email,
    //     // 'contact_about' => $req->contact_about,
    //     set_organizationEdit({
    //         ...organization,
    //         organization_name: modelOg

    //     })
    // })


    return(
        <div className={`
            sq-sidebar-offcanvas
            ${showOffcanvas && 'sq-sidebar-offcanvas--open'}
        `}>
            {showHeader && 
                <div className="sq-btn btn-menu mt-4 me-3 bg-sq-lav-dark" onClick={toggleOffcanvas}>
                    <i className="fa-solid fa-bars"></i>
                </div>
            }
            
            <div 
                className={'offcanvas offcanvas-end ' + ( showOffcanvas ? 'show' : '')} 
                data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" 
                aria-labelledby="staticBackdropLabel"
            >
                <div className="offcanvas-header">
                    <div className='d-flex'>
                        <button
                            className='sq-btn-icon bg-transparent'
                            onClick={hideCanvas}
                        >
                            <i className='fa fa-regular fa-solid fa-xmark text-color-sq-dark fa-xl'/>
                        </button>
                    </div>
                </div>
                <div className={`
                    offcanvas-body p-0
                `}>
                    <div className='outline-none border-none p-3'>
                        
                        <div className='title d-flex justify-content-space-between'>
                            <h3 className='me-4'>
                                { modeRegister ? 
                                    'Tell us more about your business to continue'
                                :
                                    'Update your profile'
                                }
                            </h3>
                        </div>
                        
                        {modeRegister && 
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
                        }                               
                        <OrganizationCardEdit
                            cb={{
                                set_organization: set_organizationEdit
                            }}
                            organization={organizationEdit}
                        />

                        <div className='d-flex'>
                            <button className='sq-btn' onClick={updateOrganization} >
                                {modeRegister ? 'Register' : 'Update'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

  
export default SidebarOffsetOrganizationEdit;
  
  
  
  
  
  
  

