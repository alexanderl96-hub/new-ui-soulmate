import React from 'react'
import './footerPage.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcVisa } from "@fortawesome/free-brands-svg-icons";
import { faCcMastercard } from "@fortawesome/free-brands-svg-icons";
import { faCcPaypal } from "@fortawesome/free-brands-svg-icons";
import { faGooglePlay } from "@fortawesome/free-brands-svg-icons";
// import { faCcVisa } from "@fortawesome/free-solid-svg-icons";
// import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faAppStore } from "@fortawesome/free-brands-svg-icons";
// import { faPhone } from "@fortawesome/free-solid-svg-icons";

const FooterPage = () => {
    // const year = new Date().getFullYear()

    return(
        <div className="container-main-footer">
            
            <div style={{height: '190px', display: 'flex', 
                         justifyContent: 'center', alignItems: 'center',
                        gap: '40px' }}>
                 We also accept payments via:
                 <div>
                     <FontAwesomeIcon className='country-icon-footer' 
                                             icon={faCcVisa} />
                 </div>
                 <div>
                     <FontAwesomeIcon className='country-icon-footer' 
                                             icon={faCcMastercard} />
                 </div>
                 <div>
                     <FontAwesomeIcon className='country-icon-footer' 
                                             icon={faCcPaypal} />
                 </div>
                 <div>
                     <FontAwesomeIcon className='country-icon-footer' 
                                             icon={faAppStore} />
                 </div>
                 <div style={{ display: 'flex', 
                         justifyContent: 'center', alignItems: 'center'}}>
                    <FontAwesomeIcon className='country-icon-footer' 
                                             icon={faGooglePlay} /> Google Pay
                 </div>
                                              {/* <div></div>
                 <FontAwesomeIcon className='country-icon-footer' 
                                             icon={faWhatsapp} /> */}
            </div> 

        </div>
    )
}

export default FooterPage;