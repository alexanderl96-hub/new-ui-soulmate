import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import logo from './Sources_image/angel-cupid-free-svg-cut-file.png';
import './App.css';
import HomePage from './Component/HomePage/homepage';
import MembersView from './Component/SingleMember/memberView';
import NavBar from './Component/NavBar/navbar';
import FooterPage from './Component/Footer/Footer';


import NewJoiner from './Component/NewJoiner/newJoiner'


function App() {
  const [appOpenLoading, setAppOpenLoading] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openGenderPick, setOpenGenderPick] = useState('')
  const [scrollToBottom, setScrollToBottom] = useState(false)
  const [scrollToVIP, setScrollToVIP] = useState(false)
  const [prevFilters, setPrevFilters] = useState({});
  const [user, setUser] = useState({})

  const clearLocalStorage = () => {
    localStorage.clear();
    // Dispatch a custom event to notify React components
    window.dispatchEvent(new Event('storageUpdate'));
  };

  useEffect(() => {
    const loadUserFromLocalStorage = () => {
      const savedUsername = JSON.parse(localStorage.getItem('username'));
      if (savedUsername) {
        setUser(savedUsername);
      } else {
        setUser({});
      }
    };

    // Load user data initially
    loadUserFromLocalStorage();

    // Listen for the custom 'storageUpdate' event
    window.addEventListener('storageUpdate', loadUserFromLocalStorage);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('storageUpdate', loadUserFromLocalStorage);
    };
  }, [user, setUser]);


  useEffect(()=>{
    setTimeout(() =>{
      setAppOpenLoading(true)
    }, 12000)
    setAppOpenLoading(false)

  },[])
 
console.log(openFilter, 'openFilter')
  return (
    <Router>
        <div className="App">  
         <NavBar setOpenFilter={setOpenFilter} 
                  setUser={setUser}
                  user={user}
                  clearLocalStorage={clearLocalStorage}
                                     setOpenGenderPick={setOpenGenderPick}
                                     setScrollToBottom={setScrollToBottom} 
                                     setScrollToVIP={setScrollToVIP} />
          {/* {appOpenLoading && <NavBar setOpenFilter={setOpenFilter} 
                                     setOpenGenderPick={setOpenGenderPick}
                                     setScrollToBottom={setScrollToBottom} 
                                     setScrollToVIP={setScrollToVIP} />} */}
           {/* {!appOpenLoading ? (  
                <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
              </header>
              ) : (
                <Routes>
                     <Route exact path="/" element={<HomePage openFilter={openFilter} 
                                                              setOpenFilter={setOpenFilter}
                                                              openGenderPick={openGenderPick} 
                                                              scrollToBottom={scrollToBottom}
                                                              setScrollToBottom={setScrollToBottom}
                                                              scrollToVIP={scrollToVIP} 
                                                              setScrollToVIP={setScrollToVIP} 
                                                              setPrevFilters={setPrevFilters} />} />   
                      <Route path='/viewMember/:name' element={<MembersView   prevFilters={prevFilters} />} />     
                </Routes>
                
              )} */}

<Routes>
                     <Route exact path="/" element={<HomePage openFilter={openFilter} 
                                                              setOpenFilter={setOpenFilter}
                                                              openGenderPick={openGenderPick} 
                                                              scrollToBottom={scrollToBottom}
                                                              setScrollToBottom={setScrollToBottom}
                                                              scrollToVIP={scrollToVIP} 
                                                              setScrollToVIP={setScrollToVIP} 
                                                              setPrevFilters={setPrevFilters} />} />   
                      <Route path='/viewMember/:name' element={<MembersView   prevFilters={prevFilters} />} /> 
                      <Route path='/new-join' element={ <NewJoiner />} />    
                </Routes>
                <FooterPage />
            {/* {appOpenLoading && <FooterPage />} */}
        </div>
    </Router>
  );
}

export default App;
