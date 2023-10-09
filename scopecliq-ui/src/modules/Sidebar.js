import axios from 'axios'
import { useState, useEffect } from "react";


const Sidebar = () => {
    const api = global.config.API;

      const [showOffcanvas, setShowOffcanvas] = useState(false); // Set the initial state to true to show the Offcanvas

  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };
  const hideCanvas = () => {
    setShowOffcanvas(false);
  };


    return(
        <div class="sq-sidebar">
            <div class="btn-menu m-3" onClick={toggleOffcanvas}>
                <i class="fa-solid fa-bars"></i>
            </div>
            <div class={'offcanvas offcanvas-end ' + ( showOffcanvas ? 'show' : '')} data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel"
             onClick={hideCanvas}
            >
                <div class="offcanvas-header">
                    {/* <h5 class="offcanvas-title" id="staticBackdropLabel">Offcanvas</h5>
                     */}
                     <span></span>
                     <button  class="btn-close" onClick={hideCanvas}
                    ></button>

                     {/* </button>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"
                    onClick={hideCanvas}
                    ></button> */}
                </div>
                <div class="offcanvas-body">
                    <div>
                    I will not close if you click outside of me.
                    </div>
                </div>
                </div>
  
        </div>
    )
}
export default Sidebar;

