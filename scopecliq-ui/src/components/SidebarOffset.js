import axios from 'axios'
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../store/client-store';
import { storeProject } from '../store/project-store';
import { connect } from 'react-redux';

const SidebarOffset = ({
    children, 
    show,
    showHeader = true
}) => {
    const api = global.config.API;


    const [showOffcanvas, setShowOffcanvas] = useState(show); // Set the initial state to true to show the Offcanvas

    const toggleOffcanvas = () =>{ 
        setShowOffcanvas(!showOffcanvas);
    };
    const hideCanvas = () => {
        setShowOffcanvas(false);
    };

    useEffect(()=>{
        setShowOffcanvas(show)
    }, [show])


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
                    
                </div>
            </div>
  
        </div>
    )
}

  
export default SidebarOffset;
  
  
  
  
  
  
  

