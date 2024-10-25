import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './members.css'
import { useNavigate } from "react-router-dom";




const Members = ({isChecked, availability, countryName,  ageRangeStart,
                 ageRangeEnd, eyeColor, bustSize, toneskin, tonehair, speakLanguages, 
                heightCM, weightLB, openGenderPick, setScrollToPosition, setPrevFilters, location }) => {
    
    const [models, setModels] = useState([])


    const [nextpage, setNextPage] = useState(10)
    const [countpage, setCountpage]= useState(0)
    const [numbersOFPage, setNumbersOfPage] = useState([])
    const [pagening, setPagening] = useState(1)
    const [allMembers, setAllMembers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const containerRef = useRef(null);
    // const [prevFilters, setPrevFilters] = useState([]);
    const [listOfPeople, setListOfPeople] = useState([])
    const navigate = useNavigate();
    
  
      useEffect(()=>{
        axios.get("https://meet-yoursoul-mate-backend.adaptable.app/newJoiner")
        .then(res => 

            setListOfPeople(res.data.data_newJoiner)
          )
        .catch( res =>  console.log("Response error => ", res.data))
       },[])

      // useEffect(()=>{
      //    if(models){
      //         axios.get('http://localhost:5050/newJoiner')
      //         .then(response => {
      //           setModels(response.data.data_newJoiner)
      //         })
      //         .catch(error => {
      //           console.error('There was an error!', error);
      //         });
      //       }
           
      // }, [models])
      
       useEffect(() => {
        
        const filteredMembers = listOfPeople.filter((person) => {
          console.log("Check location", person.location  === "Corfu")
          // Check if person matches all selected filters
          return (
            (!isChecked || person.vip === isChecked) &&
            (!availability || person.active === availability) &&
            (!countryName || person.originalcountry === countryName) &&
            // (!locationName || person.location === locationName) &&
            (!ageRangeStart || person.age >= ageRangeStart) &&
            (!ageRangeEnd || person.age <= ageRangeEnd) &&
            (!eyeColor.length  || eyeColor.includes(person.eyecolor)) &&
            (!bustSize.length  || bustSize.includes(person.bust)) &&
            (!toneskin.length  || toneskin.includes(person.skincolor)) &&
            (!tonehair.length  || tonehair.includes(person.haircolor)) &&
            (!speakLanguages || person.nativelanguages === speakLanguages  
                            || person.foraingelanguagues.includes(speakLanguages)) &&
            (!heightCM || person.height >= `${heightCM}cm`) &&
            (!weightLB || person.weight <= `${weightLB}lb`) &&
            (!openGenderPick || person.gender === openGenderPick) && 
            (!location || person.location === location)
          );

          
        });
        // Update state with filtered members
        
        const displayArrayLength = Math.ceil(filteredMembers.length / 10); // Calculate the length of the display array
        const displayArray = Array.from({ length: displayArrayLength }, (_, index) => index + 1); // Create an array of numbers from 1 to displayArrayLength
        setNumbersOfPage(displayArray) 


        setAllMembers(filteredMembers);

        setNextPage(10);
        setCountpage(0);
        setPagening(1);
        setCurrentPage(1);

        


        if (containerRef?.current) {
          const container = containerRef.current;
          const containerRect = container.getBoundingClientRect();
          const targetElement = document.getElementById("targetElementId"); // Replace "targetElementId" with the ID of the target element
          if (targetElement) {
            const targetRect = targetElement.getBoundingClientRect();
            const scrollLeft = targetRect.left - containerRect.left + container.scrollLeft;
            const additionalScroll = (container.offsetWidth - targetRect.width) / 4.7;
            const finalScrollLeft = scrollLeft - additionalScroll;
            container.scrollTo({
              left: finalScrollLeft,
              behavior: 'smooth'
            });
          }
        }


      }, [isChecked, availability, listOfPeople, countryName, ageRangeStart,
        ageRangeEnd, eyeColor, bustSize, toneskin, tonehair, speakLanguages, location,
        heightCM, weightLB, openGenderPick]);
      


        useEffect(() => {
          // Reset state if openGenderPick changes
          if (openGenderPick !== '') {
            setNextPage(10);
            setCountpage(0);
            setPagening(1);
            setCurrentPage(1);
          }
        }, [openGenderPick]);

    function handlePage(element) {
        const {id} = element.target
        console.log(id )
        setNextPage(id * 10)
        setCountpage(id * 10 - 10)
        setPagening(Number(id))
        setCurrentPage(id)
        moveToBegin(Number(id))

      }


      function moveToBegin(elementId) {
        const container = containerRef.current;
        if (container) {
          const containerRect = container.getBoundingClientRect();
          const targetElement = document.getElementById(elementId);
          if (targetElement) {
            const targetRect = targetElement.getBoundingClientRect();
            const scrollLeft = targetRect.left - containerRect.left + container.scrollLeft;
            const additionalScroll = (container.offsetWidth - targetRect.width) / 4.7;
            const finalScrollLeft = scrollLeft - additionalScroll;
            container.scrollTo({
              left: finalScrollLeft,
              behavior: 'smooth'
            });
          }
        }
        setScrollToPosition(true)
      }

      // const scrollToPremiumModels = () => {
      //   const container = document.querySelector('.members-container');
      //   if (container) {
      //     const scrollToPosition = 20 * parseFloat(getComputedStyle(document.documentElement).fontSize);
      //     container.scrollTo({
      //       bottom: scrollToPosition,
      //       behavior: 'smooth',
      //     });
      //   }
       
      // };


   useEffect(()=>{
     if(openGenderPick){
      const displayArrayLength = Math.ceil(allMembers.length / 10); // Calculate the length of the display array
      const displayArray = Array.from({ length: displayArrayLength }, (_, index) => index + 1); // Create an array of numbers from 1 to displayArrayLength
      setNumbersOfPage(displayArray) 
     }else{
      const displayArrayLength = Math.ceil(allMembers.length / 10); // Calculate the length of the display array
      const displayArray = Array.from({ length: displayArrayLength }, (_, index) => index + 1); // Create an array of numbers from 1 to displayArrayLength
      setNumbersOfPage(displayArray)  
    }
     
   
  
   },[allMembers, setNumbersOfPage, openGenderPick])

   function isDateDifferenceSevenDays(dateString) {
    // Parse the given date (e.g., "2024-10-03")
    const givenDate = new Date(dateString);
    
    // Get today's date
    const today = new Date();
    
    // Calculate the difference in time (milliseconds)
    const timeDifference = Math.abs(givenDate - today);
    
    // Convert the time difference from milliseconds to days
    const differenceInDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    
    // Check if the difference is exactly 7 days
    return differenceInDays === 1;
}

  //  const resultReadyForMemberView = listFilter.length > 0 ? listFilter : allMembers

    const redirectToPage = (member, position) => {
      setPrevFilters({ member, position, allMembers }); 
      navigate(`/viewMember/${member.firstname}`);
    };

// console.log("All memebers: ", allMembers)

    return(
        <div className='members-container'>
            <div className='members-container-VIP-present'>
               <div  className="container-VIP-Models-Title" >
                    <div className='container-VIP-divider ' > </div>
                    <div className='container-VIP-divider-middle'  >VIP Models{availability}</div>
                    <div className='container-VIP-divider ' ></div>
               </div>
               <div className="container-members-display">
                    <div style={{background: '#282828', border:'0.5px solid black'}}> 
                        <div className="members-card" 
                        style={{
                          // backgroundImage:`url(${image1})`,
                                backgroundPosition: 'center',
                                backgroundSize: '100% 100%',
                                backgroundRepeat: 'no-repeat',
                                display: 'flex', justifyContent: 'end'
                        }}>
                            <div className="square-width-diagonbal-VIP" >VIP</div>
                        </div>
                    <div style={{padding:'5px 5px', display: 'flex', justifyContent: 'center',
                                 fontSize: 'medium', color: '#fcfcfc', height: '20px',  }}>Rachel</div>
                    </div>
             <div style={{background: '#282828', border:'0.5px solid black'}}> 
                    <div className="members-card"
                       style={{
                        // backgroundImage:`url(${image2})`,
                       backgroundPosition: 'center',
                       backgroundSize: '100% 100%',
                       backgroundRepeat: 'no-repeat',
                       display: 'flex', justifyContent: 'end'
                      }}
                      > <div className="square-width-diagonbal-VIP" >VIP</div>
                      </div>
                      <div style={{padding:'5px 5px', display: 'flex', justifyContent: 'center',
                                 fontSize: 'medium', color: '#fcfcfc', height: '20px',  }}>Kate</div>
             </div>   
             <div style={{background: '#282828', border:'0.5px solid black'}}> 
                    <div className="members-card" 
                        style={{
                          // backgroundImage:`url(${image3})`,
                        backgroundPosition: 'center',
                        backgroundSize: '100% 100%',
                        backgroundRepeat: 'no-repeat',
                        display: 'flex', justifyContent: 'end'
                       }}
                    > <div className="square-width-diagonbal-VIP" >VIP</div>
                        
                    </div>
                    <div  style={{padding:'5px 5px', display: 'flex', justifyContent: 'center',
                                 fontSize: 'medium', color: '#fcfcfc', height: '20px',  }}>Lacy</div>
             </div>
             <div style={{background: '#282828', border:'0.5px solid black'}}> 
                    <div className="members-card"
                         style={{
                          // backgroundImage:`url(${image4})`,
                         backgroundPosition: 'center',
                         backgroundSize: '100% 100%',
                         backgroundRepeat: 'no-repeat',
                         display: 'flex', justifyContent: 'end'
                        }}
                    > <div className="square-width-diagonbal-VIP" >VIP</div>
                  
                    </div>
                    <div  style={{padding:'5px 5px', display: 'flex', justifyContent: 'center',
                                 fontSize: 'medium', color: '#fcfcfc', height: '20px',  }}>Jasmine</div>
            </div>
            <div style={{background: '#282828', border:'0.5px solid black'}}> 
                    <div className="members-card" 
                         style={{
                          // backgroundImage:`url(${image5})`,
                         backgroundPosition: 'center',
                         backgroundSize: '100% 100%',
                         backgroundRepeat: 'no-repeat',
                         display: 'flex', justifyContent: 'end'
                        }}
                    > <div className="square-width-diagonbal-VIP" >VIP</div>
                    
                    </div>
                    <div  style={{padding:'5px 5px', display: 'flex', justifyContent: 'center',
                                 fontSize: 'medium', color: '#fcfcfc', height: '20px',  }}>Tessa</div>
                  </div>
            </div>

               <div  className="container-VIP-Models-Title" >
                    <div className='container-VIP-divider ' > </div>
                    <div className='container-VIP-divider-middle'  >Premium Models</div>
                    <div className='container-VIP-divider ' ></div>
               </div>
            </div>
            <div className="container-members-display">
                {allMembers.slice(countpage, nextpage).map((member, i) =>{
                    return(
                        <div 
                             style={{background: '#282828', border:'0.5px solid black'}}> 
                                <div  key={i} className="members-card"
                                style={{
                                  backgroundImage:`url("${member.imageprofile}")`,
                                backgroundPosition: 'center',
                                backgroundSize: '100% 100%',
                                backgroundRepeat: 'no-repeat',
                                display: 'flex', justifyContent: 'end'
                                }}
                                id={i} 
                                onClick={(e)=>
                                  redirectToPage(member, i)}
                               
                                > <div className={isDateDifferenceSevenDays(member.date) ? "square-newMember-sign" : ""} > 
                                                 {isDateDifferenceSevenDays(member.date) ? "NEW" : ""}</div>
                                </div>
                                <div  style={{padding:'5px 5px', display: 'flex', justifyContent: 'center',
                                 fontSize: 'medium', color: '#fcfcfc', height: '20px', 
                                  }}>{member.username}</div>
                        </div>
                    )
                })}
            </div>
            <div style={{display: 'flex', 
                        justifyContent: 'center', 
                        alignItems:'center',  
                        height: '200px', }}>
               
                <div id="scrollButton" style={{cursor: 'pointer', width: '200px', color:'#fff', 
                            display:  'flex' , justifyContent: 'center', alignItems:'center', 
                            
                            }} 
                onClick={()=>{ setNextPage(nextpage => nextpage - 10) 
                               setCountpage(countpage => countpage - 10)
                               setPagening(pagening =>  Number(pagening) - 1)
                               setCurrentPage( Number(pagening ) - 1  )
                               moveToBegin(Number(currentPage))
                              //  scrollToPremiumModels()
                    }} >  {countpage > 0 ? 'Previous' : '' }</div>

              {allMembers.length > 0 &&  <div style={{display: 'flex',
                            justifyContent: 'space-between',alignItems:'center',
                             background: '#070606df',
                             width: '50%', border: '0.5px solid #0e27c9', 
                               borderRadius: '3px'}}>

                    {/* {currentPage.map((position, i)=> {
                        return(
                          
                        )
                    })} */}
                    <div onClick={(e)=> {
                      setNextPage(nextpage => currentPage > 1 ? nextpage - 10 : nextpage) 
                      setCountpage(countpage => currentPage > 1 ? countpage - 10 : countpage)
                      setPagening(pagening =>    Number(pagening) > 1 ?  Number(pagening) - 1 : Number(currentPage) )
                      setCurrentPage( pagening =>  Number(pagening) > 1 ?  Number(pagening) - 1 : Number(currentPage) )
                      moveToBegin(currentPage > 1 ? Number(currentPage) : Number(pagening))
                     
                     }} 
                         style={{
                            width: '35px', 
                            background: 'transparent',
                            color:  '#fff',
                            display: 'flex',
                            justifyContent: 'center', 
                            alignItems:'center', 
                            cursor: 'pointer', 
                            borderRight: '0.3px solid gray', 
                            gap: '0.6px'
                           }} >{currentPage}</div>

                    <div className="container-dots" ref={containerRef} >
                    {numbersOFPage.map((a, i) =>{
                          // const isFirst = i === 0;
                          // const isLast = i === numbersOFPage.length - 1;
                        return(
                        <div  id={a} key={i}
                              onClick={handlePage}
                              style={{
                                     width: '30px', 
                                     height: '30px',
                                
                                     background: (a === pagening ) ? '#fff' : '#0e27c9',
                                     color: (a === pagening || a === currentPage ) ? '#fff' : '#fff',
                                     display: 'flex',
                                     justifyContent: 'center', 
                                     alignItems:'center', 
                                     cursor: 'pointer', 
                                     flexShrink: 0,
                                    //  border: '0.3px solid black',
                                    boxShadow: (a === pagening || a === currentPage ) ? '0px 1px 6px 1px #0e27c9' : '',
                                     borderRadius: '50%',
                                     margin: '5px'
                                    }}></div>
                        )
                        })}</div>
                </div>  } 
                {numbersOFPage.length === 0 && 
                <div style={{display: 'flex',
                             justifyContent: 'center', 
                             alignItems:'center',
                             textAlign: 'center',
                             flexWrap: 'wrap',
                             width: '70%',
                             padding: "10px",
                             height: '250px',
                             background: '#000000a6', 
                             borderRadius: '30px'}} > "Sorry, but we couldn't find any models matching your 
                  specifications at the moment. Please try again later; 
                  perhaps you'll have better luck then."</div>}

                <div id="scrollButton" style={{cursor: 'pointer', width: '200px' , 
                            color:'#fff', display: 'flex', justifyContent: 'center', alignItems:'center',  }}
                     onClick={()=>{ setNextPage(nextpage => currentPage < nextpage ? nextpage + 10 : nextpage) 
                                   setCountpage(countpage => currentPage < nextpage ? countpage + 10 : countpage)
                                   setPagening(pagening => Number(pagening) + 1 ? Number(pagening) + 1 : Number(pagening) + 1)
                                   setCurrentPage(pagening =>  Number(pagening) + 1 ? Number(pagening) + 1 : Number(pagening) + 1)
                                   moveToBegin(Number(currentPage))
                                  //  scrollToPremiumModels()
                                   }}> {nextpage >= allMembers.length ? '' : 'Next' }</div>
            </div>
       </div>
    )
}

export default  Members;