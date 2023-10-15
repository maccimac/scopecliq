import axios from 'axios'
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../store/user-store';

import Notification from '../components/Notification';

const Sidebar = () => {
    const api = global.config.API;
    const clientMode = useSelector(isClient);

    const [showOffcanvas, setShowOffcanvas] = useState(false); // Set the initial state to true to show the Offcanvas

  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };
  const hideCanvas = () => {
    setShowOffcanvas(false);
  };


    return(
        <div className="sq-sidebar">
            <div className="btn-menu m-3" onClick={toggleOffcanvas}>
                <i className="fa-solid fa-bars"></i>
            </div>
            <div className={'offcanvas offcanvas-end ' + ( showOffcanvas ? 'show' : '')} data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel"
            //  onClick={hideCanvas}
            >
                <div className="offcanvas-header">
                    {/* <h5 className="offcanvas-title" id="staticBackdropLabel">Offcanvas</h5>
                     */}
                     <span></span>
                     <button  className="btn-close" onClick={hideCanvas}
                    ></button>

                     {/* </button>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"
                    onClick={hideCanvas}
                    ></button> */}
                </div>
                <div className="offcanvas-body">
                    <div>
                        <h2>
                            Notifications
                        </h2>
                        <div className='notification-list'>
                            <Notification/>

                        </div>
                    </div>
                    
                </div>
                </div>
  
        </div>
    )
}
export default Sidebar;

