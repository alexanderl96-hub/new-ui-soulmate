import React, { useState , useEffect} from 'react';
import axios from 'axios';
import './homepage.css'
import Members from '../AllMembers/members';
import Footer from '../Footer/footerPage.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faRefresh } from '@fortawesome/free-solid-svg-icons'; 
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";




const HomePage = ({openFilter, setOpenFilter, openGenderPick, 
                   scrollToBottom, setScrollToBottom, scrollToVIP, 
                   setScrollToVIP, setPrevFilters}) => {

const [countries, setCountries] = useState([])
// const [genders, setGenders] = useState([])
const [eyesColor, setEyesColor] = useState([])
const [hairColor, setHairColor] = useState([])
const [skinColor, setSkinColor] = useState([])
const [languages, setLanguagues] = useState([])
// const [activities, setActivities] = useState([])
// const [raceType, setRaceType] = useState([])
const [bust, setBust] = useState([])
const [getCountryAndCities , setGetCountryAndCities] = useState([])

 const [isChecked, setIsChecked] = useState(false);
 const [availability, setAvailability] = useState(false);
 const [openCountries, setOpenCountries] = useState(false);
 const [openAge, setOpenAge] = useState(false);
 const [openEye, setOpenEye] = useState(false);
 const [openBust, setOpenBust] = useState(false);
 const [openSkin, setOpenSkin] = useState(false);
 const [openHair, setOpenHair] = useState(false);
 const [openLang, setOpenLang] = useState(false);
 const [openLocation, setOpenLocation] = useState(false);
 const [weightLB, setWeightLB] = useState('') 
 const [weightKG, setWeightKG] = useState('')
 const [weightOZ, setWeightOZ] = useState('')
 const [heightFT, setHeightFT] = useState('')
 const [heightIN, setHeightIN] = useState('')
 const [heightCM, setHeightCM] = useState('')
 const [countryName, setCountryName] = useState('')
 const [locationName, setLocationName] = useState('')
 const [ageRangeStart, setAgeRangeStart] = useState('')
 const [ageRangeEnd, setAgeRangeEnd] = useState('')
 const [eyeColor, setEyeColor] = useState([])
 const [bustSize, setBustSize] = useState([])
 const [toneskin, setSkin] = useState([])
const [tonehair, setHair] = useState([])
const [speakLanguages, setSpeakLanguages] = useState('')
const [filterContries, setFilterContries] = useState([])
const [filterCities, setFilterCities] = useState([])
const [location, setLocation] = useState('')
const [currentTestimonial, setCurrentTestimonial] = useState([]);
const [isChangingTestimonion, setIsChangingTestimonion] = useState(false);
const [scrollToPosition, setScrollToPosition] = useState(false)

const [testimonials, setTestimonials] = useState([]);


useEffect(()=>{
    if(countries.length < 1){
         axios.get('https://meet-yoursoul-mate-backend.adaptable.app/countries')
         .then(response => {
            const data_Countries = response.data.data_countries.flatMap(a => a.countries);
            // const data_Genders  = response.data.data_countries.flatMap(a => a.genders);
            const data_EyeColors  = response.data.data_countries.flatMap(a => a.eyecolors);
            const data_HairColors  = response.data.data_countries.flatMap(a => a.haircolors);
            const data_SkinColors  = response.data.data_countries.flatMap(a => a.skincolors);
            const data_Lenguages  = response.data.data_countries.flatMap(a => a.languages);
            // const data_Activities  = response.data.data_countries.flatMap(a => a.activities);
            // const data_RaceType  = response.data.data_countries.flatMap(a => a.race_type);
            const data_BustSize  = response.data.data_countries.flatMap(a => a.bust_size);
          
            // setGenders(data_Genders)
            setEyesColor(data_EyeColors)
            setHairColor(data_HairColors)
            setSkinColor(data_SkinColors)
            setLanguagues(data_Lenguages)
            // setActivities(data.map(a => a.activities))
            // setRaceType(data_RaceType)
            setBust(data_BustSize)
            setCountries(data_Countries.map(a => a.country))
            setGetCountryAndCities(data_Countries)
            
         })
         .catch(error => {
           console.error('There was an error!', error);
         });
       } 
      
 }, [countries])


 useEffect(() => {
    // Fetch data from the API only once
    const fetchData = async () => {
      try {
        const res = await axios.get('https://meet-yoursoul-mate-backend.adaptable.app/testimonion');
        
        // Check if data is structured correctly
        if (
          res.data && 
          Array.isArray(res.data.data_testimonion) &&
          res.data.data_testimonion.length > 0 &&
          Array.isArray(res.data.data_testimonion[0].testimonials)
        ) {
          // Properly access the testimonials
          const testimonionData = res.data.data_testimonion[0].testimonials;
          setTestimonials(testimonionData);
        //   console.log("Formatted Testimonials:", testimonionData);
        } else {
          console.warn("Unexpected response format:", res.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call fetchData once
    fetchData();
  }, []); 
//  console.log("Countries: ", location
//  )

         
useEffect(()=>{
    if(!countryName){
        setFilterContries(countries) 
    }else {
        const getContries = countries.filter(country => country.toLowerCase().startsWith(countryName.toLowerCase()))
        setFilterContries(getContries) 
     
   }
}, [countryName,countries, setFilterContries ])


useEffect(()=>{
    if(!locationName){
        const cities = getCountryAndCities.map(a => a.cities).flat(Infinity)
        setFilterCities(cities)
    }else{

        const Cities = getCountryAndCities.map(a => a.cities).flat(Infinity)
        const getCities = Cities.filter(a => a.toLowerCase().startsWith(locationName.toLowerCase()));
        setFilterCities(getCities)
    }
},[locationName, setFilterCities, getCountryAndCities])


        
const handleUnitChange = (e) => {
    const {value} = e.target

    if(e.target.id === 'lb' && value){
        let newKG = Number(value) * 0.453592;
        let newOZ = Number(value) * 16;
        setWeightLB(value)
        setWeightKG(newKG.toFixed(2))
        setWeightOZ(newOZ.toFixed(2))
    }else if(e.target.id === 'kg' && value){
        let newLB = Number(value) / 0.453592;
        let newOZ = Number(value) * 35.27396;
        setWeightLB(newLB.toFixed(2))
        setWeightKG(value)
        setWeightOZ(newOZ.toFixed(2))
    }else if(e.target.id === 'oz' && value){
        let newLB = Number(value) / 16;
        let newKG = Number(value) / 35.27396;
        setWeightLB(newLB.toFixed(2))
        setWeightKG(newKG.toFixed(2))
        setWeightOZ(value)
    }

};

const handleUnitChangeHeigth = (e) =>{
    const {value} = e.target

    if(e.target.id === 'ft' && value){
        let newIN = Number(value) * 12;
        let newCM = Number(value) * 30.48;
        setHeightFT(value)
        setHeightIN(newIN.toFixed(2))
        setHeightCM(newCM.toFixed(2))
    }else if(e.target.id === 'in' && value){
        let newFT = Number(value) / 12;
        let newCM = Number(value) * 2.54;
        setHeightFT(newFT.toFixed(2))
        setHeightIN(value)
        setHeightCM(newCM.toFixed(2))
    }else if(e.target.id === 'cm' && value){
        let newFT = Number(value) / 30.48;
        let newIN = Number(value) / 2.54;
        setHeightFT(newFT.toFixed(2))
        setHeightIN(newIN.toFixed(2))
        setHeightCM(value)
    }
}
function cleanDataHeigth(){ 
    setHeightFT('')
    setHeightIN('')
    setHeightCM('')
}
function cleanDataWeigth (){
    setWeightLB('')
    setWeightKG('')
    setWeightOZ('')
}
const handleCheckboxChange = (event) => {
    const checkedEye = event.target.value;
    if (event.target.checked) {
      // If checkbox is checked, add the value to eyeColor array
      setEyeColor((prevEyeColor) => [...prevEyeColor, checkedEye]);
    } else {
      // If checkbox is unchecked, remove the value from eyeColor array
      setEyeColor((prevEyeColor) =>
        prevEyeColor.filter((eye) => eye !== checkedEye)
      );
    }
  };

const handleCheckboxBust = (event) => {
    const checkedBust = event.target.value;
    if (event.target.checked) {
        // If checkbox is checked, add the value to eyeColor array
        setBustSize((prevBustSize) => [...prevBustSize, checkedBust]);
    } else {
        // If checkbox is unchecked, remove the value from eyeColor array
        setBustSize((prevBustSize) =>
        prevBustSize.filter((size) => size !== checkedBust)
        );
    }
};
const handleCheckboxSkin = (event) => {
    const checkedSkin = event.target.value;
    if (event.target.checked) {
        // If checkbox is checked, add the value to eyeColor array
        setSkin((prevSkin) => [...prevSkin, checkedSkin]);
    } else {
        // If checkbox is unchecked, remove the value from eyeColor array
        setSkin((prevSkin) =>
        prevSkin.filter((skin) => skin !== checkedSkin)
        );
    }
};
const handleCheckboxHair = (event) => {
    const checkedHair = event.target.value;
    if (event.target.checked) {
        // If checkbox is checked, add the value to eyeColor array
        setHair((prevHair) => [...prevHair, checkedHair]);
    } else {
        // If checkbox is unchecked, remove the value from eyeColor array
        setHair((prevHair) =>
        prevHair.filter((hair) => hair !== checkedHair)
        );
    }
};

function clearFilter(e){
    setWeightLB('')
    setWeightKG('')
    setWeightOZ('')
    setHeightFT('')
    setHeightIN('')
    setHeightCM('')
    setCountryName('')
    setLocationName('')
    setAgeRangeStart('')
    setAgeRangeEnd('')
    setLocation('')
    setEyeColor([])
    setBustSize([])
    setSkin([])
    setHair([])
    setSpeakLanguages('')
    setAvailability(false)
    setIsChecked(false)
    setOpenCountries(false)
    setOpenAge(false)
    setOpenEye(false)
    setOpenBust(false)
    setOpenSkin(false)
    setOpenHair(false)
    setOpenLang(false) 
    setOpenLocation(false)
    setFilterCities([])
    e.target.checked = false
}

// Position Y - X in the screen 
useEffect(() => {
    if (!scrollToPosition) return; // Exit early if scrollToPosition is false

    const container = document.querySelector('.container-right-side');
    const containerWidth = container?.offsetWidth;

    if (container) {
      const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

      const getScrollPosition = (width) => {
        if (width < 750) return 100 * baseFontSize;
        if (width < 868) return 79 * baseFontSize;
        if (width < 968) return 68 * baseFontSize;
        return 58.5 * baseFontSize;
      };

      const scrollTo = getScrollPosition(containerWidth);

      container.scrollTo({
        top: scrollTo,
        behavior: 'smooth',
      });
    }

    setScrollToPosition(false);
  }, [scrollToPosition, setScrollToPosition]);

 // Scroll bottom automatic  
  useEffect(() => {
    if (!scrollToBottom) return; // Exit early if scrollToPosition is false

    const container = document.querySelector('.container-right-side');
    const containerWidth = container?.offsetWidth;

    if (container) {
      const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
      console.log(baseFontSize)

      const getScrollPosition = (width) => {
        if (width < 750) return 100 * baseFontSize;
        if (width < 868) return 79 * baseFontSize;
        if (width < 968) return 68 * baseFontSize;
        return 58.5 * baseFontSize;
      };

      const scrollTo = getScrollPosition(containerWidth);

      container.scrollTo({
        top: scrollTo,
        behavior: 'smooth',
      });
    }

    setScrollToBottom(false);
  }, [scrollToBottom, setScrollToBottom]);

  // Scroll page to VIP members  
  useEffect(() => {
    if (!scrollToVIP) return; // Exit early if scrollToPosition is false

    const container = document.querySelector('.container-right-side');
    const containerWidth = container?.offsetWidth;

    if (container) {
      const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

      const getScrollPosition = (width) => {
        if (width < 750) return 15.5 * baseFontSize;
        if (width < 868) return 15 * baseFontSize;
        return 14.5 * baseFontSize;
      };

      const scrollTo = getScrollPosition(containerWidth);

      container.scrollTo({
        top: scrollTo,
        behavior: 'smooth',
      });
    }

    setScrollToVIP(false);
  }, [scrollToVIP, setScrollToVIP]);

 // Dinamic auto play for testimonial left for clients 
 useEffect(() => {
    // Set the initial testimonial to the first one in the list
    if (testimonials.length > 0) {
      setCurrentTestimonial(testimonials[0]);
    }
  
    const intervalId = setInterval(() => {
      setIsChangingTestimonion(true);
      setTimeout(() => {
        if (testimonials.length > 0) {
          // Get a random testimonial index
          const randomIndex = Math.floor(Math.random() * testimonials.length);
          setCurrentTestimonial(testimonials[randomIndex]);
        }
        setIsChangingTestimonion(false);
      }, 3000); // Change testimonial after 3 seconds
    }, 10000); // Interval to change testimonial every 10 seconds
  
    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [testimonials]); // Dependency to re-run when testimonials change
  



    return (
        <div>
            <div className="app-homepage">
                
                <div className="container-left-side" 
                      style={{marginLeft : openFilter ? '0px' : '-360px'}} 
                       >
                   <div className="container-input-vip"  onClick={()=>  setIsChecked(!isChecked)} >
                        <label>VIP</label>
                        <input type="checkbox" 
                               checked={isChecked}
                               onChange={()=>  setIsChecked(!isChecked)} />
                        
                   </div>
                   <div className="container-input" >
                        <div className="open-countries" onClick={()=>setOpenCountries(!openCountries)}>
                            <label>Country</label>
                            <FontAwesomeIcon className='country-icon' 
                                             icon={faCaretDown} />
                        </div>       
                        <input className='open-countries-text'
                               type='text' 
                               value={countryName} 
                               onChange={(e)=> {setCountryName(e.target.value); 
                                               setOpenCountries(e.target.value ? true : false)}} 
                               placeholder='USA'/>
                        <div style={{height: openCountries ? '300px' : '0px', 
                                    transition: 'height 0.5s ease-in-out' }}>
                        <div className='countries'  >
                             {filterContries.map((country, index)=>{
                                return(
                                    <div key={index}>
                                   {openCountries &&  <div className='show-countries' 
                                         onClick={(e)=> setCountryName(e.target.innerText) }>{ country }</div>}
                                    </div>
                                )
                             })}
                        </div>
                        </div>
                        
                   </div>
                   <div className="container-input" >
                      <div className="open-countries" onClick={()=>setOpenAge(!openAge)}>
                            <label>Age</label>
                            <FontAwesomeIcon  className='country-icon' 
                                              icon={faCaretDown} />
                        </div> 
                      {openAge && <div className="age" >
                           <label>Between</label>
                           <div className='age-inside'>
                                <input type="number" 
                                       value={ageRangeStart}
                                       onChange={(e)=> setAgeRangeStart(e.target.value)} 
                                       placeholder="18"/>
                                <input type="number" 
                                       value={ageRangeEnd}
                                       onChange={(e)=> setAgeRangeEnd(e.target.value)}
                                       placeholder="60"/>
                           </div>
                        </div>
                        }
                        
                   </div>
                   <div className="container-input" >
                        <div className="open-countries" onClick={()=>setOpenEye(!openEye)}>
                            <label>Eyes Color</label>
                            <FontAwesomeIcon className='country-icon'  
                                             icon={faCaretDown} />
                        </div> 
                        {openEye && 
                        <div className="eyesColor" style={{transition: 'height 0.5s ease-in-out'}}>
                            {eyesColor.map((eye, index)=>{
                                return(
                                    <div className="eyesColor-inside">
                                        <label>{eye}</label>
                                        <input type="checkbox" 
                                               value={eye}
                                               onChange={handleCheckboxChange}
                                               checked={eyeColor.includes(eye)} 
                                               />
                                    </div>
                                )
                            })}                          
                        </div>}
                        
                   </div>
                   <div  style={{display: 'flex', }}>
                        <div className="container-input">
                            <label onClick={cleanDataHeigth}>Height <FontAwesomeIcon className='height-weight-icon'  icon={faRefresh}  /></label>
                            <input id='ft' type="text" value={heightFT } onChange={handleUnitChangeHeigth} placeholder='foot'/>
                            <input id='in' type="text" value={heightIN} onChange={handleUnitChangeHeigth} placeholder='inch'/>
                            <input id='cm' type="text" value={heightCM} onChange={handleUnitChangeHeigth} placeholder='cm'/>
                        </div>
                        <div className="container-input">
                            <label onClick={cleanDataWeigth}>Weight<FontAwesomeIcon className='height-weight-icon' icon={faRefresh}  /> </label>
                            <input id='lb' type="text" value={weightLB} onChange={handleUnitChange} placeholder='lb' />
                            <input id='kg' type="text" value={weightKG} onChange={handleUnitChange} placeholder='kg' />
                            <input id='oz' type="text" value={weightOZ} onChange={handleUnitChange} placeholder='ounce' />          
                        </div>
                   </div>
                   <div className="container-input" >
                        <div className="open-countries" onClick={()=>setOpenBust(!openBust)}>
                            <label>Bust</label>
                            <FontAwesomeIcon className='country-icon'  
                                             icon={faCaretDown}  />
                        </div> 
                        {openBust &&
                        <div className="bust" style={{transition: 'height 0.5s ease-in-out'}}>
                            {bust.map((size, index)=>{
                                return(
                                    <div className="bust-inside" > 
                                        <label>{size}</label> 
                                        <input type="checkbox" 
                                               value={size}
                                               onChange={handleCheckboxBust}
                                               checked={bustSize.includes(size)} />
                                    </div>
                                )
                            })}
                        </div>}
                       
                   </div>
                   <div className="container-input" >
                        <div className="open-countries" onClick={()=>setOpenSkin(!openSkin)}>
                            <label>Skin Color</label>
                            <FontAwesomeIcon className='country-icon'  
                                             icon={faCaretDown} />
                        </div> 
                        {openSkin &&
                        <div className="skinColor" style={{transition: 'height 0.5s ease-in-out'}}>
                            {skinColor.map((skin, index)=>{
                                return(
                                    <div className="skinColor-inside">
                                        <label>{skin}</label>
                                        <input type="checkbox" 
                                               value={skin}
                                               onChange={handleCheckboxSkin}
                                               checked={toneskin.includes(skin)}/>
                                     </div>
                                )
                            })}
                        </div>}
                       
                   </div>
                   <div className="container-input" >
                       <div className="open-countries" onClick={()=>setOpenHair(!openHair)}>
                            <label>Hair Color</label>
                            <FontAwesomeIcon className='country-icon'   
                                             icon={faCaretDown}  />
                        </div> 
                        {openHair &&
                        <div className='haircolor'>
                            {hairColor.map((a,index)=>{
                                return(
                                    <div key={index} className='haircolor-inside'>
                                          <label>{a.split(' ').length > 1 ? (a.split(' ')[0].slice(0,2) +'/'+ a.split(' ')[1]): a}</label>
                                          <input type="checkbox"
                                                 value={a}
                                                 onChange={handleCheckboxHair}
                                                 checked={tonehair.includes(a)} />
                                    </div>
                                )
                            })}
                        </div> }
                        
                   </div>
                   <div className="container-input" >
                       <div className="open-countries" 
                            onClick={()=>setOpenLang(!openLang)}>
                            <label>Languages</label>
                            <FontAwesomeIcon className='country-icon'   
                                             icon={faCaretDown} />
                        </div> 
                       {openLang && 
                        <div className='languagues'>
                             {languages.map((lang, index)=>{
                                return(
                                    <div key={index} className='languagues-inside'>
                                       <p onClick={(e)=>setSpeakLanguages(e.target.innerText)}> {lang}</p> 
                                    </div>
                                )
                             })}
                        </div>}
                      
                   </div>
                   <div className="container-input-availability" onClick={()=>  setAvailability(!availability)}>
                        <label>Availability</label>
                        <input type="checkbox" 
                               checked={availability}
                               onChange={()=>  setAvailability(!availability)} />
                   </div>
                   <div className="container-input-location" >
                        <label>Location</label>
                        <input type='text' 
                               value={locationName} 
                               onChange={(e)=>{setLocationName(e.target.value);
                                              setOpenLocation(e.target.value ? true : false)
                                             
                                            }
                               } 
                               placeholder='City'/>  
                         <div style={{height: openLocation  ? '300px' : '0px', 
                                    transition: 'height 0.5s ease-in-out' }}>
                        <div className='location'  >
                             {filterCities.map((country, index)=>{
                                return(
                                    < div key={index}>
                                   {openLocation &&  <div className='show-countries' 
                                       
                                      onClick={(e) => setLocation(e.target.innerText)}
                                          >{ country }</div>}
                                    </ div>
                                     //  onClick={(e)=> setCountryName(e.target.innerText)}
                                )
                             })}
                        </div>
                        </div>
                   </div>
                   <div className='container-button'>
                      <div onClick={clearFilter} >Clear</div>
                      <div onClick={()=> setOpenFilter(false)}>Show</div>
                   </div>
                </div>


                <div className="container-right-side" >
                    <div  className="container-right-side-main" >
                        <div className='phone-number' > 
                             <FontAwesomeIcon className='country-icon'  icon={faWhatsapp}   />
                             Whatsapp
                        </div>
                        <div className='whatsapp-number'> 
                             <FontAwesomeIcon className='country-icon-whatsapp'  icon={faPhone}  />
                             +31 387-381-122
                        </div>
                    </div>
                    <Members     isChecked={isChecked} 
                                 availability={availability}
                                 countryName={countryName} 
                                //  locationName={locationName}
                                 ageRangeStart={ageRangeStart}
                                 ageRangeEnd={ageRangeEnd}
                                 eyeColor={eyeColor}
                                 bustSize={bustSize}
                                 toneskin={toneskin} 
                                 tonehair={tonehair} 
                                 speakLanguages={speakLanguages}
                                 heightCM={heightCM}
                                 weightLB={weightLB} 
                                 openGenderPick={openGenderPick}
                                 setScrollToPosition={setScrollToPosition}
                                 setPrevFilters={setPrevFilters}
                                 location={location} />

                    <div className="container-middle-nav" >
                       <div  className="middle-nav-title" > 
                          Meet Your Soulmate, a journey for those who pursue love 
                          and lifetime commitment.
                       </div>
                       <div className="middle-nav-button" > 
                          Connect via WhatsApp with your better half 
                       </div>
                    </div>
                    <div className="container-middle-nav-second" >
                    
                        <div  className="container-VIP-Models-Title-home" >
                            <div className='container-VIP-divider-home' > </div>
                            <div className='container-VIP-divider-middle-home '  >Testimonials</div>
                            <div className='container-VIP-divider-home' ></div>
                        </div>

                        <div className="middle-nav-second" >
                            <div className="middle-nav-second-comment" >Thank you Meet Your SoulMate!</div>
                            <div className="middle-nav-second-comment-text" 
                                 style={{color: isChangingTestimonion ? 'transparent' : 'white'}}>
                                <em> " {currentTestimonial.testimonion} " </em>
                            </div>
                            <div style={{color: isChangingTestimonion ? 'transparent' : 'white'}}>- {currentTestimonial.memberName} -</div>
                        </div>

                    </div>
                     
                    <div className="container-middle-about"  >
                        <div className="container-middle-about-first" >
                             About Meet your Soulmate :
                        </div>
                        <div className="middle-about-parragraph" >
                            In a world where connections are fleeting and meaningful relationships are 
                            often elusive, "Meet Your Soulmate" stands as a beacon of hope and 
                            possibility. Our platform is meticulously crafted to facilitate genuine 
                            connections between individuals who are ready to embark on the journey 
                            of a lifetime together.</div>
                        <div className="middle-about-parragraph">
                            At "Meet Your Soulmate," we understand that finding your perfect match is 
                            not just about shared interests or physical attraction; it's about finding 
                            someone who truly complements your essence, understands your quirks, and 
                            shares your dreams and values. That's why our advanced matchmaking 
                            algorithms delve deep into the core of your personality, preferences, 
                            and aspirations to pair you with like-minded individuals who resonate with 
                            your soul on every level.</div>
                        <div className="middle-about-parragraph">
                            Gone are the days of endless swiping and superficial encounters. On "Meet 
                            Your Soulmate," authenticity reigns supreme. Every profile is meticulously 
                            verified to ensure the highest standards of integrity and sincerity, 
                            fostering a safe and welcoming environment where meaningful connections 
                            can flourish.</div>
                        <div className="middle-about-parragraph">
                            Whether you're searching for your soulmate based on shared passions, cultural 
                            background, or spiritual beliefs, "Meet Your Soulmate" provides the tools and 
                            support you need to navigate the journey of love with confidence and ease. Our 
                            intuitive interface allows you to seamlessly browse through profiles, engage in 
                            meaningful conversations, and ultimately find that special someone who ignites a 
                            spark in your heart.</div>
                        <div className="middle-about-parragraph">
                            Join "Meet Your Soulmate" today and take the first step towards a lifetime of love, 
                            companionship, and shared bliss. Your soulmate could be just a click away. Dare to 
                            embark on the adventure of a lifetime with us</div>
                    </div> 

                    <Footer />
               </div>
                
                
            </div>
          
        </div>
    )

}

export default  HomePage;