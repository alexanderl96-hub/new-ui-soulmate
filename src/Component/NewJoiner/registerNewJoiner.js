import React, { useState } from 'react';
import './registerNewJoiner.css'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function RegisterNewJoiner({setPasswordRegister, setEmailRegister, 
                            passwordRegister, emailRegister, setOpen, open}) {
const [passwordConfirmation, setPasswordConfirmation] = useState('')
const [errorMessage, setErrorMessage] = useState('')


function handledata(){
    if(passwordRegister === passwordConfirmation){
        
        setOpen(true)
    }else{
        setErrorMessage("Password discrepancy");

        setTimeout(() => {  setErrorMessage(''); 
            setPasswordRegister('');
            setPasswordConfirmation('')
           }, 2000);
    }
}

  return (
    <div className='register'>
    <div className='registerContainer' >
        <div class="container-modal">
          <div class="login-box" style={{display: open === true ?  'none' : 'block'}}>
            <h2>Create an Account</h2>
            <form  >
                <div class="input-box" >
                    <input type="email" 
                           onChange={(e)=> setEmailRegister(e.target.value)}
                           required />
                    <label>Email</label>
                </div>
                <div class="input-box">
                    
                    <input type="password" 
                           value={passwordRegister}
                           onChange={(e)=> setPasswordRegister( e.target.value)}
                           required />
                    <label>Password</label>
                   
                </div>
                <div class="input-box">
                    <input type="password" 
                           value={passwordConfirmation}
                           onChange={(e)=> setPasswordConfirmation( e.target.value)}
                           required />
                    <label>Password</label>
                </div>
                <div class="forgot-pass">
                    <p >{errorMessage}</p>
                </div>
                <button 
                        class="btn"
                        onClick={handledata}
                        >Create Account</button>
            </form>
          </div>
        </div>
    </div>
    </div>
  )
}

export default RegisterNewJoiner
