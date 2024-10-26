import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { faUserLarge } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";


import './navbar.css'
// faSearch, faSearchDollar, faSearchLocation, faSearchMinus, faSearchPlus,faXmark, faXmarkCircle,

const NavBar = ({setOpenFilter, setOpenGenderPick, setScrollToBottom, 
                setScrollToVIP, setUser, user, clearLocalStorage}) => {

  const navigate = useNavigate();  
  const [data, setData]= useState('')
  const [nameProfile, setNameProfile] = useState([])
  const [advance_Search, setAdvance_Search] = useState(false)
  const [advance_SearchFilter, setAdvance_SearchFilter] = useState(false)
  const [gendern, setGender] = useState('')
  const [pickGender, setPickGender] = useState(false)
  const [listOfPeople, setListOfPeople] = useState([])
  const [loginUser, setLoginUser] = useState(false)
  
  const [userActive, setUserActive] = useState(false)
  const [emailLogin, setEmailLogin] = useState('')
  const [passwordLogin, setPasswordLogin]  = useState('')
  const [navbarUser, setNavbarUser] = useState([])
  const [messageResponde, setMessageResponde] = useState('')
  const [updateUserStatus, setUpdateUserStatus] = useState([])
  const [refreshUser, setRefreshUser] = useState(false)

  const [sendDataCheck, setSendDataCheck] = useState(false)

    function clearData() {
        setData('');
        setAdvance_Search(false)
        setAdvance_SearchFilter(false)
        setGender('')
    }

    useEffect(()=>{
      axios.get("https://meet-yoursoul-mate-backend.adaptable.app/newJoiner")
      .then(res => 

          setListOfPeople(res.data.data_newJoiner)
        )
      .catch( res =>  console.log("Response error => ", res.data))
     },[])

    useEffect(()=>{
           axios.get("https://meet-yoursoul-mate-backend.adaptable.app/newMember")
           .then(res => {
             const dataMember =  res.data.data_newMember

             if (emailLogin  && passwordLogin && sendDataCheck ) {
              const findUser = dataMember.filter(
                a => a.email === emailLogin && revertTokenGenerate(a.password) === passwordLogin
              );
                 
              if(!findUser.length > 0){
               
                setMessageResponde('Incorrect email or password')
                setTimeout(() => {  setMessageResponde(''); 
                                   setEmailLogin('')
                                   setPasswordLogin('')
                                   setSendDataCheck(false)
                                  }, 2000);
               }else{
                setLoginUser(false);
                setNavbarUser(findUser);
                if (findUser && findUser[0] && typeof findUser[0] === 'object') {
                  // Properly serialize the object to JSON
                  localStorage.setItem('username', JSON.stringify(findUser[0]));


                  
                 const useFilterByID = listOfPeople.filter(a => a.memberjoinercode === findUser[0].membershipcode)
                    
               
                  const updatedUserStatus = {
                    ...useFilterByID[0], // Use the found user's data
                    active: true,
                    storageImage : useFilterByID[0].storageimage

                  };

                  setUpdateUserStatus(useFilterByID)

                  console.log("updatedUserStatus:  ",useFilterByID[0].id, updatedUserStatus)

                  axios.patch(`https://meet-yoursoul-mate-backend.adaptable.app/newJoiner/${useFilterByID[0]?.id}`,
                     updatedUserStatus,  {
                      headers: {
                        'Content-Type': 'application/json'

                      }
                    } )
                      .then(res => 
                             console.log("responde data update: ", res.data)
                        )
                      .catch( error =>  console.log("Response error => ", error)) 

                      setRefreshUser(true)

                } else {
                  console.error('findUser[0] is not a valid object:', findUser[0]);
                }

               
                setEmailLogin('');
                setPasswordLogin('');
                setMessageResponde(''); 
               }

            }
            
          })
           .catch( res =>  console.log("Response error => ", res.data))
    },[emailLogin, passwordLogin,  sendDataCheck, setNavbarUser, setUpdateUserStatus,
      setEmailLogin, setPasswordLogin, setLoginUser, setMessageResponde, setRefreshUser ])

  

    useEffect(() => {
       if(refreshUser === true){
        axios.get("https://meet-yoursoul-mate-backend.adaptable.app/newJoiner")
             .then(res => {

                   setListOfPeople(res.data.data_newJoiner)
                   setRefreshUser(false)
             } )
         .catch( res =>  console.log("Response error => ", res.data))
       }


      if (data && gendern === '' ) {
         const filteredProfiles = listOfPeople.filter(person =>
                    person.firstname.toLowerCase().includes(data.toLowerCase()) 
                  );
        setNameProfile(filteredProfiles);
        if (filteredProfiles.length > 0) {
          setTimeout(() => {
            setData('');
          }, 20000);
        }
        console.log(filteredProfiles);
      } else if (data && gendern !== '' && refreshUser === false) {
            const filteredProfiles = listOfPeople.filter(person =>
              person.gender === gendern && person.firstname.toLowerCase().includes(data.toLowerCase()) 
            );
            setNameProfile(filteredProfiles);
          
      }
    }, [data, gendern, listOfPeople, setNameProfile, setListOfPeople ]);



    const redirectToPage = (path) => {
      navigate(path);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
    }

  function revertTokenGenerate(code, decode = true) {
    let mycodeGenerate = '';
    const mySimbols = {
        "a": "+",
        "b": "-",
        "c": "=",
        "d": "_",
        "e": ")",
        "f": "(",
        "g": "*",
        "h": "&",
        "i": "^",
        "j": "%",
        "k": "$",
        "l": "#",
        "m": "@",
        "n": "!",
        "o": "~",
        "p": "`",
        "q": ":",
        "r": ";",
        "s": "{",
        "t": "}",
        "u": "[",
        "v": "]",
        "w": "|",
        "x": "\\",
        "y": "__",
        "z": "!!",
        "!": "q",
        "@": "w",
        "#": "e",
        "$": "r",
        "%": "t",
        "^": "y",
        "&": "u",
        "*": "i",
        "(": "o",
        ")": "p",
        "-": "a",
        "_": "s",
        "=": "d",
        "+": "f",
        "[": "g",
        "]": "h",
        "{": "j",
        "}": "k",
        ";": "l",
        ":": "z",
        "'": "x",
        "\"": "c",
        ",": "v",
        ".": "b",
        "<": "n",
        ">": "m",
        "/": "/\\",
        "?": "~?",
        "\\": "--",
        "|": "::",
        "`": "..",
        "~": ".",
        "0": "##",
        "1": "()",
        "2": "{}",
        "3": "[]",
        "4": "@@",
        "5": "^^",
        "6": "%%",
        "7": "1!",
        "8": ";;",
        "9": "~~"
    };

    // Create a reverse mapping of the symbols
    const reverseSimbols = Object.fromEntries(
        Object.entries(mySimbols).map(([key, value]) => [value, key])
    );

    if (decode) {
        let i = 0;
        while (i < code.length) {
            // Check if the next three characters form a valid encoded symbol
            let threeChar = code.substring(i, i + 3);
            let twoChar = code.substring(i, i + 2);

            if (reverseSimbols[threeChar]) {
                mycodeGenerate += reverseSimbols[threeChar];
                i += 3;
            } else if (reverseSimbols[twoChar]) {
                mycodeGenerate += reverseSimbols[twoChar];
                i += 2;
            } else {
                mycodeGenerate += reverseSimbols[code[i]] || code[i];
                i++;
            }
        }
    }

    return mycodeGenerate;
}

function formatAmericanPhoneNumber(phoneNumber) {
  // Remove any non-digit characters except for the '+' at the beginning
  const cleanedNumber = phoneNumber.replace(/[^+\d]/g, '');

  // Regular expression to match the US phone number pattern
  const phonePattern = /^\+1(\d{3})(\d{3})(\d{4})$/;
  const match = cleanedNumber.match(phonePattern);

  if (match) {
    // Format the number if it matches the pattern
    const areaCode = match[1];
    const firstPart = match[2];
    const secondPart = match[3];
    return `+1 (${areaCode}) ${firstPart}-${secondPart}`;
  } else {
    // If the number does not match the US format, return null or an error message
    return phoneNumber;
  }
}

 
function resetActiveUSer() { 

    const resetUserStatus = {
      ...updateUserStatus[0], // Use the found user's data
      active: false,
      storageImage: updateUserStatus[0]?.storageimage,
    };

    axios.patch(`https://meet-yoursoul-mate-backend.adaptable.app/newJoiner/${updateUserStatus[0]?.id}`,
      resetUserStatus,  {
       headers: {
         'Content-Type': 'application/json'

       }
     } )
       .then(res => 
              console.log("responde data update: ", res.data)
         )
       .catch( error =>  console.log("Response error => ", error)) 

       setRefreshUser(true)
}


console.log("messageResponde: ", messageResponde, navbarUser.imageprofile)

    console.log("emailLogin:", emailLogin, "passwordLogin:  ",  passwordLogin , sendDataCheck )
    
    return(
        <div className="nav-container">
           <div  className="nav-container-links" >
           <h1 onClick={()=> {redirectToPage('/'); setOpenFilter(false)}}>Meet <em >Your_Soulmate</em></h1>
           <div >
             <div className='container-links'>
                <div onClick={()=> {setScrollToVIP(true); 
                                    redirectToPage('/');
                                    setPickGender(false);
                                    setOpenFilter(false); }}>VIP</div>
                <div onClick={()=> {setScrollToBottom(true); 
                                    redirectToPage('/');
                                    setPickGender(false);
                                    setOpenFilter(false); }}>Premiun</div>
                <div onClick={(e)=> {setPickGender(!pickGender); 
                                     redirectToPage('/');
                                     setOpenFilter(false); }}>Gender</div>
                <div onClick={()=> {setOpenFilter(fig => !fig); 
                                    redirectToPage('/');
                                    setPickGender(false)}}>Filter</div>
                <div onClick={()=> {redirectToPage('/new-join');
                                    setOpenFilter(false);
                                    setPickGender(false) }}>Join us</div>
              </div>
              {pickGender && 
                 <div  className='container-links-filter'>
                           <div onClick={(e)=> {setPickGender(!pickGender);
                                                setScrollToBottom(true);
                                                setOpenGenderPick(e.target.innerText ? '' : '')}} 
                                >All</div>
                           <div onClick={(e)=> {setPickGender(!pickGender); 
                                                setScrollToBottom(true);
                                                setOpenGenderPick(e.target.innerText ? 'Female' : '')}} 
                                >Woman</div>
                           <div onClick={(e)=> {setPickGender(!pickGender);
                                                setScrollToBottom(true);
                                                setOpenGenderPick(e.target.innerText ? 'Male' : '')}} 
                                >Man</div>
                          </div>}
           </div>
           </div>

           <div className='nav-container-Search' >
              <div className="container-Search">
                 <div> 
                    <FontAwesomeIcon className="icon-search" icon={faSearch} />
                 </div>
                 <input id='input' 
                        type="text" 
                        value={data} 
                        onClick={()=> {setAdvance_Search(!advance_Search);   
                                       setAdvance_SearchFilter(!advance_SearchFilter)}}
                        onChange={(e) => {setData(e.target.value); 
                                          setAdvance_SearchFilter(false)
                                          setAdvance_Search(advance_Search => advance_Search = false)}} placeholder="Search" />
                 <div onClick={clearData} >
                    <FontAwesomeIcon className="icon-Delete" icon={faXmarkCircle}  />
                 </div>
              </div>
             {advance_SearchFilter && <div className='Advance_Search'>
                 <p>Advance Search</p>
                 <div className='Advance_Search-insider'>
                   <div  onClick={(e) => setGender(e.target.innerText ? 'Male' : '') }>Man</div>
                   <div  onClick={(e) => setGender(e.target.innerText ? 'Female' : '') }>Woman</div>
                </div>
              </div>}
              {!advance_Search && data.length > 0 &&  
               <div className='Advance_Search-Container-Profile' >
                     {nameProfile?.slice(0,6).map((profile, index)=>{
                        return( 
                           <div className='card-profile'>
                                 <img src={profile.imageprofile} 
                                         alt="ima" /> 
                                 <div className='first_div'> {profile.firstname} {profile.lastname}</div> 
                                 <div className='second_div' style={{color: profile.active ? 'green' : 'red'}} >
                                     {profile.active === true ? "Active" : "In-active" }
                                 </div>
                           </div>
                        )
                     })}

                    {nameProfile.length > 5 && 
                       <div className='none-profile' 
                            onClick={() => { setScrollToBottom(true); 
                                             setAdvance_SearchFilter(false)
                                             setAdvance_Search(!advance_Search)}} > See more ...</div>}

              </div >}
              
           </div>


           <div 
                style={{display: 'flex', flexDirection: 'column', cursor: 'pointer'}}>
                {!user.firstname &&  
                          <h4 onClick={() => setLoginUser(true)
                                              }>LOGIN</h4>
                   }
                 { user.firstname && 
                        <img
                          src={user.imageprofile}
                          alt="user"
                          style={{
                            width: '35px',
                            height: '35px',
                            borderRadius: '50px',
                            border: '0.3px solid',
                          }}
                          onClick={() => setUserActive(fig => !fig)}
                        />
                      }

           {loginUser &&    <div style={{position: 'absolute', marginTop: '80px', 
                             width: '250px', backgroundColor: '#070606df',
                             right: '0px', padding: '10px 10px', 
                             borderBottomLeftRadius: '5px',  zIndex: 500, }}>
                <form onSubmit={handleSubmit} >
                      <div style={{padding: '4px 0px'}} >
                          <input type="email" 
                                 value={emailLogin}
                                onChange={(e)=> setEmailLogin(e.target.value)}
                                required />
                          <label style={{marginLeft: '10px', fontSize: '14px'}} >Email</label>
                      </div>
                      <div style={{padding: '4px 0px' }} >
                          <input type="password" 
                                 value={passwordLogin}
                                 onChange={(e)=> setPasswordLogin( e.target.value)}
                                required />
                          <label style={{marginLeft: '10px', fontSize: '14px'}}>Password</label>
                      </div>
                      {messageResponde !== '' && <div style={{fontSize: '13.5px',}}>{messageResponde}</div>}
                      <div style={{fontSize: '13px',}}>
                           <label style={{ color: '#6666FF'}}>Forgot your password?</label>
                          {/* <a href="#" style={{ color: '#6666FF'}}>Forgot your password?</a> */}
                      </div>
                      <button 
                              onClick={()=>{setSendDataCheck(true) ; 
                                setLoginUser(prev => user.length > 0 ? prev = false : prev = true )
                              }}
                              style={{ marginLeft: '40%', marginTop: '10px', 
                                       cursor: 'pointer'}}
                               >Log in</button>
                  </form>
                </div> }




                {userActive &&  
                <div style={{ position: 'absolute', height: '240px', marginTop: '68px', zIndex: 500,
                              width: '250px', backgroundColor: '#070606df', right: '0px',
                              padding: '10px 10px', borderBottomLeftRadius: '5px' }}>
                    <div style={{display: 'flex', justifyContent: 'center', padding: '5px 0px',
                                 alignItems: 'center', flexDirection: 'column', 
                                 borderBottom: '0.2px solid gray' }} >
                                  <div style={{backgroundColor: '#19E130',
                                      width:"7.5px",
                                      height: '7.5px', borderRadius: '50px', zIndex: 5,
                                       marginLeft: '26px'}}></div> 
                         <img src={user.imageprofile}
                              alt='user'
                              style={{width: '40px', height: '40px', marginTop: '-8px',
                                      borderRadius: '50px', border: '0.3px solid',
                                     
                              }} />
                             
                         <p style={{marginTop: '7px', fontSize: '15px', fontWeight: 600,}}>{user.firstname} {user.lastname}</p>
                         <p style={{marginTop: '-7px'}}>{user.email}</p>
                         <p style={{marginTop: '-7px'}}> {formatAmericanPhoneNumber(user.phonenumber)}  </p>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', padding: '5px 0px',
                                 alignItems: 'start', flexDirection: 'column', cursor: 'pointer' }}>
                        <span style={{padding: '8px 2px'}} 
                              onClick={()=> redirectToPage('/account-details')}> <FontAwesomeIcon icon={faUserLarge} 
                                                style={{marginRight: '10px'}} /> Account</span>
                        <span style={{padding: '8px 2px'}}
                              onClick={()=> redirectToPage('/account-billing')}> <FontAwesomeIcon icon={faCreditCard} 
                                                style={{marginRight: '10px'}} /> Billing</span>
                        <span style={{padding: '8px 2px'}} 
                              onClick={()=> {
                                 // Clear localStorage first
                                    
                                    
                                    // Reset all state values
                                    setOpenFilter(false);
                                    setUserActive(false);
                                    setMessageResponde(''); 
                                    setEmailLogin('');
                                    setPasswordLogin('');
                                    setSendDataCheck(false);
                                    setLoginUser(false);
                                    setUser({});
                                    setNavbarUser([]);
                                    clearLocalStorage();
                                    resetActiveUSer();
                                    // Redirect to homepage after resetting states
                                    redirectToPage('/');} }> <FontAwesomeIcon icon={faRightFromBracket} 
                                                                              style={{marginRight: '10px'}} /> Sign Out</span>
                    </div>
                   
                </div> }
           </div>
        </div>
    )

}

export default  NavBar;