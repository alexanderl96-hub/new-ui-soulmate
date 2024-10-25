import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './memberView.css';
import { Rating } from 'react-simple-star-rating'
// import StarRatings from 'react-star-ratings';



import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faHandPointRight } from "@fortawesome/free-solid-svg-icons";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Galery from '../Galery/galery';
// import { height } from '@fortawesome/free-brands-svg-icons/fa42Group';




const MembersView = ({prevFilters})=> {
    const [bgColorLeft, setBgColorLeft] = useState(false)
    const [bgColorRight, setBgColorRight] = useState(false)
    const [ativeChat, setActiveChat] = useState(false)
    const [hoverChact, setHoverChat] = useState(false)
    const [hoverLangangues, setHoverLanguages] = useState(false)
    const [activateGalery, setActivateGalery] = useState(false)
    const [memberById, setMemberById] = useState(prevFilters.member?.id)
    const [myMemberReady, setMyMemberReady] = useState([])
    const [imagePosition, setImagePosition] = useState(0)
    const [rating, setRating] = useState(0)
    const [rating2, setRating2] = useState('')
    const [previuosName, setPreviousName] = useState('')
    const [nextName, setNextName] = useState('')
    const [updateRating, setUpdateRating] = useState(false)
    const [initialRatingValue, setInitialRatingValue] = useState(0)
    const [ratingByCommet, setRatingByComment] = useState('Your rate')
    const [greeting, setGreeting] = useState('')
    const listOfPeople = prevFilters.allMembers
    // const [listOfPeople, setListOfPeople] = useState(prevFilters.allMembers) //allMembers resultReadyForMemberView
    const [filterMemberVideos, setFilterMemberVideos] = useState([])
    const [chatbox_Conversation, setChatbox_Conversation] = useState([])
    const [isAutoScroll, setIsAutoScroll] = useState(true);
    // const memberVisitorIDTextRef = useRef()
    // const memberIDTextRef = useRef()
    const chatContainerRef = useRef(null);
    // const prevLengthRef= useRef();
    // const intervalIdRef = useRef(null);
    const [newConversation, setNewConversation] = useState({
      chat_conversations_members : ["visitorID14", "memberID"],
      conversation : [
          {
            memberIdentifytier : "visitorID14",
            date : "",
            time : "",
            text_conversation: ""
          }
          
      ]
    })
 

    useEffect(() => {
      // Function to fetch data
      const fetchConversations = () => {
        axios
          .get(
            "http://localhost:5050/chatbox/member/?visitor=visitorID14&member=memberID"
          )
          .then((res) => {
           
            const previous_conversations = res.data.data_conversation;
            setChatbox_Conversation(previous_conversations);
            setIsAutoScroll(true);

          })
          .catch((error) => error );
      };
  
      // Call fetchConversations immediately when the component mounts
      fetchConversations();

      // Set an interval to call the function every 20 seconds (20000 ms)
      const intervalId = isAutoScroll === false
    ? setInterval(fetchConversations, 20000) // Slower interval
    : setInterval(fetchConversations, 3000); // Faster interval when auto-scroll is true

      return () =>  clearInterval(intervalId);
      
    }, [setIsAutoScroll, setChatbox_Conversation, isAutoScroll ]);



 // Function to get the current date in "YYYY-MM-DD" format
 const getCurrentDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0]; // Get YYYY-MM-DD format
};

// Function to get the current time in "0:00am/pm" format
const getCurrentTime = () => {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // Hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes; // Add leading zero to minutes
  return `${hours}:${minutes}${ampm}`; // Return time in "0:00am/pm" format
};

const scrollToBottom = () => {
  if (chatContainerRef.current) {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight + 120;
  }
};

const submitNewConversation = () => {
  axios.post("http://localhost:5050/chatbox/add-conversation", newConversation)
       .then(res => {
       const lasttext = newConversation.conversation[0]

        setChatbox_Conversation(prev => [...prev, lasttext])
        setNewConversation({
          chat_conversations_members : ["visitorID14", "memberID"],
          conversation : [
              {
                memberIdentifytier : "visitorID14",
                date : "",
                time : "",
                text_conversation: ""
              }
              
          ]
        })
        setIsAutoScroll(true);       

  } )
  .catch(error => error)


}

const handleTextNewConversation = (e) => {
  const newText = e.target.value;

  // Update the conversation array inside newConversation
  setNewConversation((prevState) => ({
    ...prevState,
    conversation: [
      {
        ...prevState.conversation[0],
        text_conversation: newText, // Update the text_conversation field
        date: getCurrentDate(),
        time: getCurrentTime()
      }
    ]
  }));
};


useEffect(() => {
 if(isAutoScroll){
    scrollToBottom();
  }

}, [chatbox_Conversation,  isAutoScroll ]);

    const getFormattedDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const day = String(today.getDate()).padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    };
   
    const [commentByMember, setCommentByMember] = useState({
         memberName: "",
         member_to_review: '',
         review: [],
         date: `${getFormattedDate()}`,
         endorse: '',
         memberJoinerCode: ''
    });
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  
    const tooltipArray = [
      "Terrible",
      "Terrible+",
      "Bad",
      "Bad+",
      "Average",
      "Average+",
      "Great",
      "Great+",
      "Awesome",
      "Awesome+"
    ];

    const check = (user) => {
      if (rating > 10) {
        setRating(5);
        return tooltipArray[9];
      }
      if (user < 0.5) {
        return tooltipArray[0];
      } else if (user >= 0.5 && user < 1) {
        return tooltipArray[1];
      } else if (user >= 1 && user < 1.5) {
        return tooltipArray[2];
      } else if (user >= 1.5 && user < 2) {
        return tooltipArray[3];
      } else if (user >= 2 && user < 2.5) {
        return tooltipArray[4];
      } else if (user >= 2.5 && user < 3) {
        return tooltipArray[5];
      } else if (user >= 3 && user < 3.5) {
        return tooltipArray[6];
      } else if (user >= 3.5 && user < 4) {
        return tooltipArray[7];
      } else if (user >= 4 && user < 4.5) {
        return tooltipArray[8];
      } else if (user >= 4.5 && user <= 10) {
        return tooltipArray[9];
      }
    };


    function scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // Optional: adds smooth scrolling
        });
      }


    useEffect(() => {
      if (memberById !== null && listOfPeople.length > 0) {
        // Find the current member by its position in the array
        const currentIndex = listOfPeople.findIndex(v => v.id === memberById);
        if (currentIndex !== -1) {
          const desireMember = listOfPeople[currentIndex];
          const hasVideo = includesVideoFormat(desireMember.storageimage);

          setFilterMemberVideos(hasVideo)
          setMyMemberReady(desireMember);
    
          const newRating = desireMember.rating;
          setRating(newRating);
    
          const tooltip = check(newRating);
          setRating2(tooltip);
    
          // Get previous and next member names based on array position
          const previousMember = listOfPeople[currentIndex - 1];
          setPreviousName(previousMember ? previousMember.firstname : '');
    
          const nextMember = listOfPeople[currentIndex + 1];
          setNextName(nextMember ? nextMember.firstname : '');
        }
      }
    }, [memberById, listOfPeople,   check()
     ]);
    
    function changeMemberBack() {
      // Find the current index of the member
      const currentIndex = listOfPeople.findIndex(v => v.id === memberById);
    
      // Move to the previous member if it exists
      if (currentIndex > 0) {
        setMemberById(listOfPeople[currentIndex - 1].id);
        setActiveChat(false);
      }
    }
    
    function changeMemberForward() {
      // Find the current index of the member
      const currentIndex = listOfPeople.findIndex(v => v.id === memberById);
    
      // Move to the next member if it exists
      if (currentIndex < listOfPeople.length - 1) {
        setMemberById(listOfPeople[currentIndex + 1].id);
        setActiveChat(false);
      }
    }
    


    useEffect(()=>{
      if(initialRatingValue !== 0){
        const tooltip = check(initialRatingValue);
        setRatingByComment(tooltip);
      }
    }, [initialRatingValue, check] )

    const handleTextChange = (event) => {
      setCommentByMember({
         memberName: "alex",
         member_to_review: myMemberReady?.firstname,
         review: [event.target.value],
         date: `${getFormattedDate()}`,
         endorse: initialRatingValue,
         memberJoinerCode: myMemberReady?.memberjoinercode
      })
    };
    
    const newReviewCom = {
      "newReview": commentByMember
    }

    const handlePostReview = () => {
      axios.post("https://meet-yoursoul-mate-backend.adaptable.app/comments/add-review", newReviewCom, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {

          setCommentByMember({
            memberName: "",
            member_to_review: '',
            review: [],
            date: ``,
            endorse: '',
            memberJoinerCode: ''
          })
      })
      .catch( error => error
    )

      setUpdateRating(false)
      setRatingByComment('Your rate')
      setGreeting('Thank you')

      setTimeout(()=>{
        setGreeting('')
      },3000)
    }


     // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dynamically calculate margin based on screen width
  const calculateMarginLeft = () => {
    if (windowWidth > 1200) {
      return '18%'; // Larger screens
    } else if (windowWidth > 768) {
      return '14%'; // Medium screens
    } else {
      return '5%'; // Small screens
    }
  };


    const handleRating1 = (rate) => {
      setInitialRatingValue(rate); // Assuming you are updating another state with the rating value
      setCommentByMember(prev => ({
        ...prev,
        endorse: rate // Store the actual rating value, not the function name
      }));
    };


    function includesVideoFormat(fileFormats) {
      const videoFormats = [".avi", ".mp4", ".mpg", ".mpeg", ".mkv", ".mov", ".wmv", ".flv"]; // Add more video formats as needed
  
      // Extract file extensions and check if any of them are in the videoFormats array
      return fileFormats.filter(file => {
        const fileExtension = file.slice(file.lastIndexOf('.')); // Get the file extension
        return videoFormats.includes(fileExtension);
    });
  }


// Function to check if a date is today
const isToday = (someDate) => {
  const today = new Date();
  return someDate.getDate() === today.getDate() &&
         someDate.getMonth() === today.getMonth() &&
         someDate.getFullYear() === today.getFullYear();
};

// Function to check if a date is yesterday
const isYesterday = (someDate) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Remove the time part by setting it to midnight for a proper date comparison
  yesterday.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  someDate.setHours(0, 0, 0, 0);

  // Return true if someDate matches yesterday and is not today
  return someDate.getTime() === yesterday.getTime();
};
  

 
    return (
        <div>
             {activateGalery &&  <Galery setActivateGalery={setActivateGalery} 
                                         imagePerfile={myMemberReady.storageimage} 
                                         imagePosition={Number(imagePosition)}/>} 
        <div className='main-container-membersView'> 
      
        <div className='container-membersView'> 
             <div className='container-contact-all'>
                 <div className='left-side-memberview'>
                   <div className='phone-number-memberview'>
                     <FontAwesomeIcon className='country-icon-memberview'   icon={faWhatsapp}  />
                        Whatsapp
                   </div>
                   <div className='load-memberview-left'
                    
                        onClick={ changeMemberBack } 
                        onMouseEnter={()=> setBgColorLeft(true)}
                        onMouseLeave={()=> setBgColorLeft(false)}>
                   {bgColorLeft && previuosName !== "" && <FontAwesomeIcon icon={faAngleLeft} />}
                   {previuosName}</div>
                 </div>
                 <div className='right-side-memberview'>
                    <div className='whatsapp-number-memberview'>
                        <FontAwesomeIcon className='country-icon-whatsapp-memberview'   icon={faPhone}  />
                         {myMemberReady.phonenumber}  
                        </div>
                        <div className='load-memberview-right'  
                        
                             onClick={changeMemberForward}     
                             onMouseEnter={()=> setBgColorRight(true)}
                             onMouseLeave={()=> setBgColorRight(false)}>
                        {nextName} 
                        {bgColorRight && nextName !== "" && <FontAwesomeIcon icon={faAngleRight} />}
                        </div>
                 </div>
             </div>

             <div className='current-memberview'>
                <div>
                <div className='current-memberview-image'>
                  <img src={myMemberReady.imageprofile} 
                       alt={myMemberReady.firstname} />
                </div>
                <div className='current-memberview-name'>
                    <em> - {myMemberReady.firstname} - </em> 
                </div>
                <div className='current-memberview-brand'> Meet Your Soulmate </div>
                </div>
             </div>

             
             <div className='container-memberview-profile'>
                <div className='container-memberview-profile-left'>
                { ativeChat && <FontAwesomeIcon icon={faCircleXmark} 
                                                onClick={()=> setActiveChat( act => !act )
                                                         
                                                }
                                                className='close-chat'
                                                style={{
                                                  marginLeft: calculateMarginLeft()}} />}
                    <div className='container-profile-chat'
                         style={{height : ativeChat ? '30em' : '0em',
                                 marginTop : ativeChat ? '-1.3em' : '0em',}}
                         onClick={()=> setActiveChat( true)}
                         onMouseEnter={()=> setHoverChat(true)}
                         onMouseLeave={()=>setHoverChat(false)}
                    
                    >
                        <div style={{cursor:'pointer' }}  onClick={scrollToBottom}>
                      {!hoverChact && !ativeChat &&  < div   onClick={scrollToBottom}style={{ 
                                                                   }}> <FontAwesomeIcon icon={faHandPointRight}  onClick={scrollToBottom} 
                                                                      className='finger-Pointer' />  "Let's to chat" </div> } 
                     {hoverChact && !ativeChat &&
                      <div  style={{}}> "Want to chat ?" <FontAwesomeIcon icon={faMessage} 
                                        className='message'
                                         /> </div>
                                        }
                                    
                                   <div className='chat-measse-container' 
                                        style={{height : ativeChat ? '30em' : '0em', 
                                               backgroundColor: ativeChat ? 'gray': '#0a0a0a',
                                                 }}> 

                                                     {ativeChat &&  
                                                     <div style={{display: 'flex',
                                                                  justifyContent: 'end', 
                                                                  alignItems: 'center', 
                                                                  backgroundColor: '#323232a0',
                                                                  padding: '0.5em 0.5em', 
                                                                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                                                  }}>
                                                             
                                                                   {myMemberReady.firstname}
                                                                    <div style={{border: '0.5px solid #fff', 
                                                                                 height: '30px', 
                                                                                 width: '30px', 
                                                                                 marginLeft: '35%',
                                                                                 borderRadius: '50%'}}>
                                                                                  <img src={myMemberReady?.imageprofile} 
                                                                                       alt={myMemberReady.id}
                                                                                       style={{ height: '30px', 
                                                                                        width: '30px', 
                                                                                        borderRadius: '50%'}}
                                                                                        />
                                                                                 </div>
                                                      </div> } 



                                                      {ativeChat && (
  <div className="getContainerChat" ref={chatContainerRef}
        onScroll={() => setIsAutoScroll(false)} 
        onMouseEnter={() => setIsAutoScroll(false)} >
    {/* Always render the chat structure */}
    {chatbox_Conversation && chatbox_Conversation.length > 0 ? (
      // If there are conversations, map through them
      chatbox_Conversation.map((conver, i) => {
        const conversationDate = new Date(conver.date);

        return (
          <div key={i} >
            {/* {isYesterday(conversationDate) && (
              <div className="date-container">Yesterday</div>
            )} */}
            {!isToday(conversationDate) && !isYesterday(conversationDate) && (
              <div className="date-container">{conver.date}</div>
            )}
            <div
              className={`messageChatBox ${
                conver.memberIdentifytier === "memberID" || conver.memberIdentifyier === "memberID" ? "visitor" : "member"
              }`}
            >
              <p className="conversation-text">{conver.text_conversation}</p>
              <span className="conversation-meta">{conver.time} 
                <FontAwesomeIcon icon={faCheck} style={{marginLeft: '1.5px'}} /> 
                <FontAwesomeIcon icon={faCheck} style={{marginLeft: '-5.2px'}} /></span>
            </div>
          </div>
        );
      })
    ) : (
      // If no conversations exist, show an empty message or placeholder
      <p className="no-conversations">No conversations yet. Start chatting!</p>
    )}
  </div>
)}
                                                      {ativeChat &&  <div style={{ display:'flex', height: '65px'  }}>
                                                         <textarea 
                                                         className='input-textarea-massage'
                                                          cols="40" placeholder="Enter text here..."
                                                          // value={newConversation.conversation[0].text_conversation}
                                                          value={newConversation.conversation[0].text_conversation === "" ? "" : newConversation.conversation[0].text_conversation}
                                                          onChange={handleTextNewConversation} // Handle change
                                                          style={{
                                                            resize: 'none',   
                                                            // height: '45px'
                                                            
                                                          }}
                                                        
                                                        
                                                        />
                                                        <div onClick={submitNewConversation} style={{width: '50px', 
                                                                     margin: '0px', padding: '0px',
                                                                     display:'flex', 
                                                                     border: 'none',
                                                                     borderBottomRightRadius: '5px', 
                                              
                                                                     backgroundColor: ativeChat ? '#147eef': '#0a0a0a',
                                                                    
                                                                     justifyContent: 'center',
                                                                     alignItems: 'center'}}>
                                                          <FontAwesomeIcon icon={faPaperPlane} 
                                                                            />
                                                        </div>
                                                      </div>}

                                                 </div> 
                                        </div>
                        </div>
                    <div className='profile-caracter'>
                          <div><p>Country</p>  <p>{myMemberReady.originalcountry} </p></div>
                          <div><p>Gender</p>   <p>{myMemberReady.gender}</p> </div>
                          <div><p>Age</p>     <p>{myMemberReady.age}</p> </div>
                          <div><p>Height</p>   <p>{myMemberReady.height}</p> </div>
                          <div><p>Weight</p>  <p>{myMemberReady.weight}</p> </div>
                          <div><p>Eyes Color</p>  <p>{myMemberReady.eyecolor}</p> </div>
                          <div><p>Skin Color</p>  <p>{myMemberReady.skincolor}</p> </div>
                          <div><p>Hair Color</p>  <p>{myMemberReady.haircolor}</p> </div>
                          {myMemberReady.gender !== 'Male' && <div><p>Bust</p>  <p>{myMemberReady.bust}</p> </div> }
                          <div><p>Native Languagues</p>  <p>{myMemberReady.nativelanguages}</p> </div>
                          <div style={{cursor: 'pointer'}} 
                               onMouseEnter={()=> setHoverLanguages(true)} 
                               onMouseLeave={()=> setHoverLanguages(false)}>
                               <p>Spoken Languagues</p> 
                               {myMemberReady.foraingelanguagues?.length < 2 ?
                                <p >{myMemberReady.foraingelanguagues}</p> : <p >
                                    {hoverLangangues === false && myMemberReady.foraingelanguagues?.length + ' more ...'} </p>}
                              
                               {myMemberReady.foraingelanguagues?.length > 1 && hoverLangangues === true &&
                                <div className='languages-container'>
                                {myMemberReady.foraingelanguagues.map((lan, l) => (
                                    <div key={l} className='foreign-languages'> 
                   
                                     <FontAwesomeIcon icon={faLocationArrow} 
                                                      className='arrow-location'/>
                                    <p >{lan.charAt(0).toUpperCase() + lan.slice(1)}</p>
                            
                                    </div>
                                ))}
                                </div>}
                          </div>
                          <div><p>Location</p> <p>{myMemberReady.location}</p> </div>
                          <div><p>Phone</p>  <p>{myMemberReady.phonenumber}</p> </div>
                          <div><p>WhatsApp</p>  <p>{myMemberReady.whatsapp}</p> </div>
                    </div>

                    <div className='profile-caracter-activities'>
                      
                       {myMemberReady.activities?.map((activities, b)=>{
                        return(
                          <div key={b} >
                               <div className='activities'>{activities} </div> 
                            </div>
                        )    
                       }) } 
                        
                    </div>
                </div>
                



                 <div className='container-memberview-profile-right'>
                    <div className='memberview-profile-quote'>
                       <div>{myMemberReady.firstname}</div>
                       <div>{myMemberReady.about}</div>
                    </div>
                    
                    <div className='memberview-profile-galery'>
                        <div className='galery-title'>Galery</div>
                        <div className='galery-photos'>
                            {myMemberReady.storageimage?.slice(0, 6).map((image, i) => {
                                return (
                                    <div className='photo-container' key={i}>
                                        <img src={image} alt={`image-${i}`}
                                              onClick={()=> {setActivateGalery(true); setActiveChat(false)
                                                scrollToTop(); setImagePosition(i)}} />
                                    </div>
                                );
                            })}
                            {myMemberReady.storageimage?.length > 6 && 
                            <div className='more'>
                                <div onClick={()=> {setActivateGalery(true); setActiveChat(false);
                                                   scrollToTop()}}>more ...</div>

                            </div>}
                        </div>
                    </div>

                    <div className='memberview-profile-galery'>
                        <div className='galery-title'>Videos Galery</div>
                        <div className='galery-photos'>
                            {filterMemberVideos?.slice(0, 6).map((image, i) => {
                              const extension = image.substring(image.lastIndexOf('.')).toLowerCase();
                              const allowedExtensions = ['.jpeg', '.jpg', '.png', '.gif', '.webp']; 
                                return (
                                    <div className='photo-container' key={i}>
                                        
                                        <img src={!allowedExtensions.includes(extension) ? image : ''} 
                                             alt={ !allowedExtensions.includes(extension) ? `image-${i}` : ''}
                                              onClick={()=> {setActivateGalery(true); setActiveChat(false)
                                                scrollToTop(); setImagePosition(i)}} />
                                    </div>
                                );
                            })}
                            {filterMemberVideos?.length > 6 && 
                            <div className='more'>
                                <div onClick={()=> {setActivateGalery(true); setActiveChat(false);
                                                   scrollToTop()}}>more ...</div>

                            </div>}
                        </div>
                    </div>

                    <div className='memberview-profile-review'>
                       <div className='review-title'>Leave review about {myMemberReady.firstname} </div>
                       <div className='review-title-warning'>Your email address will not be published. Required fields are marked * </div>
                       <div className='review-coment'>
                           <h4>Comment *</h4>
                           <textarea className="textarea" 
                                     value={commentByMember.review}
                                     onClick={()=> setUpdateRating(true)}
                                     onChange={handleTextChange}
                                     placeholder="Enter your review ..."></textarea>
                       </div>
                       <div className='review-coment-rate'>
                           <div  >
                        {!updateRating &&  <Rating 
                                  initialValue={rating}
                                  transition={true}
                                  allowFraction={true}
                                  readonly
                                  allowHover={false}
                                        
                                   /> } 
                       {updateRating &&         <Rating 
                                    onClick={handleRating1} 
                                    transition={true}
                                    allowFraction={true}                                         
                                   />}
                           
                            
                              <div className='rating-value'>{!updateRating ? rating2 : ratingByCommet}</div>
                            </div>
                           
                           <div onClick={handlePostReview}>Post the review</div>
                           <div style={{position: 'absolute', 
                           display: 'flex', justifyContent: 'center', textAlign: 'center', color: greeting ? '#fff' : 'transparent',
                            width: '50%', fontSize: '3em', marginTop: '-15px', transition: 'color 0.3s ease 0.15s '}} >{greeting}</div>
                       </div>
                    </div>
                 </div>
                
             </div>

        </div>
        
        </div>
        </div>
    )
}
export default  MembersView;