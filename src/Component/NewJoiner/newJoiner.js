
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
// import { faPaperPlaneTop } from "@fortawesome/free-solid-svg-icons";
import { useCallback } from 'react';
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import './newJoiner.css'
import Register from './registerNewJoiner'


const NewJoiner = () => {
  const navigate = useNavigate(); 
  const [open, setOpen] = useState(false)
    const [countryCodes, setCountryCodes] = useState([]);
    const [countryCodesCities, setCountryCodesCities] = useState([]);
    const [genders, setGenders] = useState([]);
    const [eyeColors, setEyeColor] = useState([]);
    const [hairColors, setHairColors] = useState([]);
    const [skinColors, setSkinColors] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [activities, setActivities] = useState([]);
    const [race_type, setRace_type] = useState([]);
    const [bust_size, setBustSize] = useState([]);
 
    const [isHovered, setIsHovered] = useState(null);
    const [testSelection, setTestSelection] = useState('');
    const [imageWidth, setImageWidth] = useState('25%');
    const containerRef = useRef(null); 
 

    const [emailRegister, setEmailRegister] = useState('')
    const [passwordRegister, setPasswordRegister] = useState('')
 

 
     const [files, setFile] = useState([]);
     const [previewFiles, setPreviewFile] = useState([]);
     const [countryFilter, setCountryFilter] = useState("");
     const [mapCountryFilter, setMapCountryFilter] = useState([]);
     const [originalCountryFilter, setOriginalCountryFilter] = useState([]);
     const [filteredCities, setFilteredCities] = useState([]);
     const [filterActivities, setFilterActivities] = useState([]);
     const [filteredLanguages, setFilteredLanguages] = useState([]);
    //  const [progress, setProgress] = useState(0);
     
     const [message, setMessage] = useState('');
     const [messageJoin, setMessageJoin] = useState('');
     // const [selection]
     const [filteredCountries, setFilteredCountries] = useState(countryCodes);
 
     const getFormattedDate = () => {
       const today = new Date();
       const year = today.getFullYear();
       const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
       const day = String(today.getDate()).padStart(2, '0');
       
       return `${year}-${month}-${day}`;
     };
 
     const [newJoin, setNewJoin] = useState({
         date: `${getFormattedDate()}`,
         status: 'new',
         firstname: '',
         lastname: '',
         username: '',
         gender: '',
         age: 0,
         race_type: '',
         height: '',
         weight: '',
         eyecolor: '',
         skincolor: '',
         haircolor: '',
         bust: '',
         nativelanguages: '',
         foraingelanguagues: [],
         active: false,
         incall: '',
         outcall: '',
         countrycode: [''],
         phonenumber: '',
         whatsapp: '',
         email: '',
         about: ``,
         imageprofile: ``,
         storageImage: [],
         location: '',       
         originalcountry: '',
         activities: [],
         vip: false,
         rating: 0,
         memberjoinercode: ''
       
     })
     const [newJoinRegistration, setNewJoinerRegistration] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        phonenumber: '',
        imageprofile: '',
        membershipcode: '',
        cardpaymentdetails: {
            cvv: "",
            address: {
                      city: "",
                      state: "",
                      street: "",
                      country: "",
                      postalCode: ""
            },
            bankName: "",
            cardNumber: "",
            expiryDate: "",
            saveCardInfo: false
        }

     })
     const [tempPhoneNumber, setTempPhoneNumber] = useState("");
     const [tempWhatsapp, setTempWhatsapp] = useState("");
    //  const [convertedValue, setConvertedValue] = useState("");
     const previousCountriesRef = useRef([]);
     const phoneNumberRef = useRef([]); 
 
     const [activateWeight, setActivateWeight] = useState(false)
     const [activateHeight, setActivateHeight] = useState(false)
     const [activateGender, setActivateGender] = useState(false);
     const [activateEyeColor, setActivateEyeColor] = useState(false);
     const [activateSkinColor, setActivateSkinColor] = useState(false);
     const [activateHairColor, setActivateHaiColor] = useState(false);
     const [activateNativeLang, setActivateNativeLang] = useState(false);
     const [activateForaingeLang, setActivateForaingeLang] = useState(false);
     const [activateIncall, setActivateIncall] = useState(false);
     const [activateOutcall, setActivateOutcall] = useState(false);
     const [activateCountryCode, setActivateCountryCode] = useState(false);
     const [activateAbout, setActivateAbout] = useState(false);
     const [activateProfileImg, setActivateProfileImg] = useState(false);
     const [activateStorageImg, setActivateStorageImg] = useState(false);
     const [activateLocation, setActivateLocation] = useState(false);
     const [activateOrignialCountry, setActivateOrignialCountry] = useState(false);
     const [activateActivities, setActivateActivities] = useState(false);
 
     const [activateBust, setActivateBust] = useState(false);
     const [activateRaceType, setActivateRaceType] = useState(false);
     const [activeFinalRegister, setActiveFinalRegister] = useState(false)
 
    //  const [nextpageProfile, setNextPageProfile] = useState(false)
    //  const [nextpageStorage, setNextPageStorage] = useState(false)
 
 
     useEffect(()=>{
       axios.get("https://meet-yoursoul-mate-backend.adaptable.app/countries")
       .then(res => {
         const countriesNames = res.data.data_countries[0].countries
         const countrieCities = res.data.data_countries[0].countries.reduce((acc, country) => { 
           acc.push({ [country.country]: country.cities }); 
           return acc;
            }, []);
         const allGenders = res.data.data_countries[0].genders;
         const allEyeColors = res.data.data_countries[0].eyecolors;
         const allHaircolors = res.data.data_countries[0].haircolors;
         const allLanguagues = res.data.data_countries[0].languages;
         const allSkincolors = res.data.data_countries[0].skincolors;
         const allRaceType = res.data.data_countries[0].race_type;
         const allBustSize = res.data.data_countries[0].bust_size;
         const allActivities = res.data.data_countries[0].actitvities.reduce((acc, activityObj) => {
           const key = Object.keys(activityObj)[0]; // Get the key (e.g., 'artsCrafts')
           acc[key] = activityObj[key]; // Assign the array to the object under the correct key
           return acc;
         }, {});
 

         setCountryCodes(countriesNames)
         setCountryCodesCities(countrieCities)
         setGenders(allGenders)
         setEyeColor(allEyeColors)
         setHairColors(allHaircolors)
         setSkinColors(allSkincolors)
         setLanguages(allLanguagues)
         setFilteredLanguages(allLanguagues)
         setRace_type(allRaceType)
         setActivities(allActivities)
         setBustSize(allBustSize)
         })
       .catch( res =>  console.log("Response error => ", res.data))
    },[])
 
    
 
        // useEffect to monitor changes in the country code and reset the phone number
     useEffect(() => {
         if (previousCountriesRef.current !== newJoin.countrycode[1]) {
         // Country code has changed, so reset the phone number
         setNewJoin(prevState => ({
             ...prevState,
             phonenumber: ''
 
         }));
 
         // Update the previous country code reference
         previousCountriesRef.current = newJoin.countrycode[1];
         }
     }, [newJoin.countrycode]);
 
  
 
     useEffect(() => {
       // If no countryFilter is set, clear filtered cities
       if (countryFilter === "") {
         setFilteredCities([]);
         return;
       }
 
       const filteredCountryNames = countryCodesCities.map(a => a)
       .filter((countryObj) => 
         Object.keys(countryObj)[0].toLowerCase().includes(countryFilter.toLowerCase())
       )
       .map((countryObj) => Object.keys(countryObj)[0]); 
 
       console.log("countryCodesCities", filteredCountryNames)
 
       if(activateLocation){
         setMapCountryFilter(filteredCountryNames)
       }else if(activateOrignialCountry){
         setOriginalCountryFilter(filteredCountryNames)
       }
 
 
 
     }, [countryFilter, activateLocation, 
      activateOrignialCountry, countryCodesCities ]);
 
 
     
 
     const getCitiesCoutries = (cities) => {
        const result = countryCodesCities.filter((a)=> Object.keys(a)[0]
                                                            .toLowerCase()
                                                            .includes(cities.toLowerCase()));
 
           if (result.length > 0) {
             console.log('Cities resuklttrtkjh: ',result)
         //   // Collect all the cities from the result
            const citiesFound = result.flatMap(country => country[Object.keys(country)[0]]);
           setFilteredCities(citiesFound);
         //   // console.log("Filtered Cities: ", citiesFound); 
           setMapCountryFilter([])
         } else {
           setFilteredCities([]); // Reset if no match is found
         }
     }
 
     const getFilterActivities = (activ) => {
       const result = activities[activ]
       setFilterActivities(result)
     }
 
    //  const formatPhoneNumber = (number) => {
    //      const dialingCode = newJoin.countrycode[1];  // Extract the dialing code
    //      const isoCode = newJoin.countrycode[2];  // Extract the ISO country code
 
    //      if (number.length > 0) {
    //        const phone = parsePhoneNumberFromString(`${dialingCode}${number}`, isoCode);
 
    //        // Return formatted phone number or the original input
    //        return phone ? phone.formatInternational() : number;
    //      }
    //    };
 
       const formatPhoneNumber = useCallback((number) => {
        // Remove any non-digit characters (like spaces, dashes, etc.)

        // const dialingCode = newJoin.countrycode[1];  // Extract the dialing code
        const isoCode = newJoin.countrycode[2];  // Extract the ISO country code

        const cleanNumber = number.replace(/\D/g, '');
      
        const countryFormats = {
          'AF': '+93 XX XXX XXXX',         // Afghanistan
          'AL': '+355 XXX XXX XXX',        // Albania
          'AM': '+374 XX XXX XXX',         // Armenia
          'AO': '+244 XXX XXX XXX',        // Angola
          'AR': '+54 (XX) XXXX-XXXX',      // Argentina
          'AT': '+43 XXX XXX XXXX',        // Austria
          'AU': '+61 XXXX XXX XXX',        // Australia
          'AZ': '+994 XX XXX XX XX',       // Azerbaijan
          'BA': '+387 XX XXX XXX',         // Bosnia and Herzegovina
          'BD': '+880 XXXX-XXXXXX',        // Bangladesh
          'BE': '+32 XXX XX XX XX',        // Belgium
          'BF': '+226 XX XX XX XX',        // Burkina Faso
          'BG': '+359 XXX XXX XXX',        // Bulgaria
          'BH': '+973 XXXX XXXX',          // Bahrain
          'BI': '+257 XX XX XX XX',        // Burundi
          'BJ': '+229 XX XX XX XX',        // Benin
          'BN': '+673 XXX XXXX',           // Brunei Darussalam
          'BO': '+591 XXX XXX XX',         // Bolivia
          'BR': '+55 (XX) XXXXX-XXXX',     // Brazil
          'BS': '+1 (242) XXX-XXXX',       // Bahamas
          'BT': '+975 XX XXX XXX',         // Bhutan
          'BW': '+267 XXX XXX XXX',        // Botswana
          'BY': '+375 XX XXX XX XX',       // Belarus
          'BZ': '+501 XXX-XXXX',           // Belize
          'CA': '+1 (XXX) XXX-XXXX',       // Canada
          'CD': '+243 XXX XXX XXX',        // Democratic Republic of Congo
          'CF': '+236 XX XX XX XX',        // Central African Republic
          'CG': '+242 XX XXX XXXX',        // Republic of the Congo
          'CH': '+41 XX XXX XX XX',        // Switzerland
          'CI': '+225 XX XXX XXXX',        // Ivory Coast
          'CL': '+56 X XXXX XXXX',         // Chile
          'CM': '+237 XXX XXX XXX',        // Cameroon
          'CN': '+86 XX XXXX XXXX',        // China
          'CO': '+57 XXX XXX XXXX',        // Colombia
          'CR': '+506 XXXX XXXX',          // Costa Rica
          'CU': '+53 X XXX XXXX',          // Cuba
          'CV': '+238 XXX XX XX',          // Cape Verde
          'CY': '+357 XX XXX XXX',         // Cyprus
          'CZ': '+420 XXX XXX XXX',        // Czech Republic
          'DE': '+49 XXXX XXXXXXX',        // Germany
          'DJ': '+253 XX XX XX XX',        // Djibouti
          'DK': '+45 XX XX XX XX',         // Denmark
          'DM': '+1 (767) XXX-XXXX',       // Dominica
          'DO': '+1 (809) XXX-XXXX',       // Dominican Republic
          'DZ': '+213 XXX XX XX XX',       // Algeria
          'EC': '+593 XX XXX XXXX',        // Ecuador
          'EE': '+372 XXXX XXXX',          // Estonia
          'EG': '+20 XX XXX XXXX',         // Egypt
          'ER': '+291 X XXX XXX',          // Eritrea
          'ES': '+34 XXX XXX XXX',         // Spain
          'ET': '+251 XXX XXX XXXX',       // Ethiopia
          'FI': '+358 XX XXX XXXX',        // Finland
          'FJ': '+679 XX XXX XX',          // Fiji
          'FR': '+33 X XX XX XX XX',       // France
          'GA': '+241 XX XX XX XX',        // Gabon
          'GB': '+44 XXXX XXXXXX',         // United Kingdom
          'GD': '+1 (473) XXX-XXXX',       // Grenada
          'GE': '+995 XX XXX XX XX',       // Georgia
          'GH': '+233 XXX XXX XXX',        // Ghana
          'GM': '+220 XXX XXXX',           // Gambia
          'GN': '+224 XX XXX XXXX',        // Guinea
          'GQ': '+240 XXX XXX XXX',        // Equatorial Guinea
          'GR': '+30 XXX XXX XXXX',        // Greece
          'GT': '+502 XXXX XXXX',          // Guatemala
          'GW': '+245 XX XXX XXXX',        // Guinea-Bissau
          'GY': '+592 XXX XXXX',           // Guyana
          'HK': '+852 XXXX XXXX',          // Hong Kong
          'HN': '+504 XXXX XXXX',          // Honduras
          'HR': '+385 XX XXX XXXX',        // Croatia
          'HT': '+509 XX XX XXXX',         // Haiti
          'HU': '+36 XX XXX XXXX',         // Hungary
          'ID': '+62 XXX-XXX-XXXX',        // Indonesia
          'IE': '+353 XXX XXX XXXX',       // Ireland
          'IL': '+972 XX-XXX-XXXX',        // Israel
          'IN': '+91 XXXXX-XXXXX',         // India
          'IQ': '+964 XXX XXX XXXX',       // Iraq
          'IR': '+98 XXX XXX XXXX',        // Iran
          'IS': '+354 XXX XXXX',           // Iceland
          'IT': '+39 XXX XXX XXXX',        // Italy
          'JM': '+1 (876) XXX-XXXX',       // Jamaica
          'JO': '+962 XXX XXXX XXX',       // Jordan
          'JP': '+81 XX XXXX XXXX',        // Japan
          'KE': '+254 XXX XXX XXX',        // Kenya
          'KG': '+996 XXX XXX XXX',        // Kyrgyzstan
          'KH': '+855 XX XXX XXX',         // Cambodia
          'KI': '+686 XX XXX',             // Kiribati
          'KM': '+269 XXX XXXX',           // Comoros
          'KN': '+1 (869) XXX-XXXX',       // Saint Kitts and Nevis
          'KP': '+850 XXX XXXX XXXX',      // North Korea
          'KR': '+82 XX XXXX XXXX',        // South Korea
          'KW': '+965 XXXX XXXX',          // Kuwait
          'KZ': '+7 (7XX) XXX-XX-XX',      // Kazakhstan
          'LA': '+856 XX XXX XXX',         // Laos
          'LB': '+961 XX XXX XXX',         // Lebanon
          'LC': '+1 (758) XXX-XXXX',       // Saint Lucia
          'LI': '+423 XXX XX XX',          // Liechtenstein
          'LK': '+94 XX XXX XXXX',         // Sri Lanka
          'LR': '+231 XX XXX XXXX',        // Liberia
          'LS': '+266 XX XXX XXX',         // Lesotho
          'LT': '+370 XXX XXX XXX',        // Lithuania
          'LU': '+352 XXXX XXXX',          // Luxembourg
          'LV': '+371 XX XXX XXXX',        // Latvia
          'LY': '+218 XX XXX XXXX',        // Libya
          'MA': '+212 XXX-XXXXXX',         // Morocco
          'MC': '+377 XX XX XX XX',        // Monaco
          'MD': '+373 XX XXX XXX',         // Moldova
          'ME': '+382 XX XXX XXX',         // Montenegro
          'MG': '+261 XX XX XXXXX',        // Madagascar
          'MH': '+692 XXX XXXX',           // Marshall Islands
          'MK': '+389 XX XXX XXX',         // North Macedonia
          'ML': '+223 XX XX XX XX',        // Mali
          'MM': '+95 XX XXX XXX',          // Myanmar
          'MN': '+976 XX XX XXXX',         // Mongolia
          'MO': '+853 XXXX XXXX',          // Macau
          'MR': '+222 XX XX XXXX',         // Mauritania
          'MT': '+356 XX XX XX XX',        // Malta
          'MU': '+230 XXX XXXX',           // Mauritius
          'MV': '+960 XXX XXXX',           // Maldives
          'MW': '+265 XXX XX XX XX',       // Malawi
          'MX': '+52 (XXX) XXX-XXXX',      // Mexico
          'MY': '+60 XX-XXX XXXX',         // Malaysia
          'MZ': '+258 XX XXX XXX',         // Mozambique
          'NA': '+264 XX XXX XXXX',        // Namibia
          'NE': '+227 XX XX XXXX',         // Niger
          'NG': '+234 XXX XXX XXXX',       // Nigeria
          'NI': '+505 XXXX XXXX',          // Nicaragua
          'NL': '+31 XX XXX XXXX',         // Netherlands
          'NO': '+47 XXX XX XXX',          // Norway
          'NP': '+977 X XXX XXX XXX',      // Nepal
          'NR': '+674 XXX XXXX',           // Nauru
          'NU': '+683 XXX XXXX',           // Niue
          'NZ': '+64 XX XXX XXXX',         // New Zealand
          'OM': '+968 XX XXX XXXX',        // Oman
          'PA': '+507 XXXX XXXX',          // Panama
          'PE': '+51 XXX XXX XXX',         // Peru
          'PG': '+675 XXX XXXX',           // Papua New Guinea
          'PH': '+63 XXX XXX XXXX',        // Philippines
          'PK': '+92 XXX XXX XXXX',        // Pakistan
          'PL': '+48 XXX XXX XXX',         // Poland
          'PT': '+351 XXX XXX XXX',        // Portugal
          'PW': '+680 XXX XXXX',           // Palau
          'PY': '+595 XXX XXX XXX',        // Paraguay
          'QA': '+974 XXXX XXXX',          // Qatar
          'RO': '+40 XXX XXX XXXX',        // Romania
          'RS': '+381 XX XXX XXXX',        // Serbia
          'RU': '+7 (XXX) XXX-XX-XX',      // Russia
          'RW': '+250 XXX XXX XXX',        // Rwanda
          'SA': '+966 XXX XXX XXXX',       // Saudi Arabia
          'SB': '+677 XXX XXXX',           // Solomon Islands
          'SC': '+248 X XXX XXX',          // Seychelles
          'SD': '+249 XXX XXX XXXX',       // Sudan
          'SE': '+46 XX XXX XX XX',        // Sweden
          'SG': '+65 XXXX XXXX',           // Singapore
          'SH': '+290 XXXX',               // Saint Helena
          'SI': '+386 XX XXX XXX',         // Slovenia
          'SK': '+421 XXX XXX XXX',        // Slovakia
          'SL': '+232 XX XXX XXX',         // Sierra Leone
          'SM': '+378 XXXX XXXXXX',        // San Marino
          'SN': '+221 XX XXX XXXX',        // Senegal
          'SO': '+252 XXX XXX XXX',        // Somalia
          'SR': '+597 XXX XXXX',           // Suriname
          'SS': '+211 XXX XXX XXXX',       // South Sudan
          'ST': '+239 XX XXXXX',           // Sao Tome and Principe
          'SV': '+503 XXXX XXXX',          // El Salvador
          'SY': '+963 XXX XXX XXX',        // Syria
          'SZ': '+268 XX XX XXXX',         // Eswatini (Swaziland)
          'TD': '+235 XX XX XX XX',        // Chad
          'TG': '+228 XX XX XXXX',         // Togo
          'TH': '+66 XX XXX XXXX',         // Thailand
          'TJ': '+992 XX XXX XX XX',       // Tajikistan
          'TK': '+690 XXX XXXX',           // Tokelau
          'TL': '+670 XXX XXXX',           // Timor-Leste
          'TM': '+993 X XXX XXXX',         // Turkmenistan
          'TN': '+216 XX XXX XXX',         // Tunisia
          'TO': '+676 XX XXX',             // Tonga
          'TR': '+90 (XXX) XXX XXXX',      // Turkey
          'TT': '+1 (868) XXX-XXXX',       // Trinidad and Tobago
          'TV': '+688 XX XXXX',            // Tuvalu
          'TZ': '+255 XXX XXX XXX',        // Tanzania
          'UA': '+380 XX XXX XXXX',        // Ukraine
          'UG': '+256 XXX XXX XXXX',       // Uganda
          'US': '+1 (XXX) XXX-XXXX',       // United States
          'UY': '+598 X XXX XXXX',         // Uruguay
          'UZ': '+998 XX XXX XX XX',       // Uzbekistan
          'VA': '+379 XXXXX XXXXX',        // Vatican City
          'VC': '+1 (784) XXX-XXXX',       // Saint Vincent and the Grenadines
          'VE': '+58 (XXX) XXX-XXXX',      // Venezuela
          'VG': '+1 (284) XXX-XXXX',       // British Virgin Islands
          'VI': '+1 (340) XXX-XXXX',       // U.S. Virgin Islands
          'VN': '+84 XX XXXX XXXX',        // Vietnam
          'VU': '+678 XX XXX',             // Vanuatu
          'WS': '+685 XX XXX',             // Samoa
          'YE': '+967 XXX XXX XXX',        // Yemen
          'ZA': '+27 XX XXX XXXX',         // South Africa
          'ZM': '+260 XXX XXX XXX',        // Zambia
          'ZW': '+263 XXX XXX XXX',        // Zimbabwe
        };
      
        // Determine the country code from the array input
        const countryAbbreviation = isoCode?.toUpperCase();
        const formatPattern = countryFormats[countryAbbreviation] || '+XXX XXXXXXXXXXX'; // Default format if country not found
      
        let formattedNumber = '';
        let numberIndex = 0;
      
        // Format the number according to the pattern
        for (let i = 0; i < formatPattern.length; i++) {
          if (formatPattern[i] === 'X') {
            if (numberIndex < cleanNumber.length) {
              formattedNumber += cleanNumber[numberIndex];
              numberIndex++;
            }
          } else {
            formattedNumber += formatPattern[i];
          }
        }
      
        // If the number is too short, return an error or default format
        if (numberIndex < cleanNumber.length) {
          return `Invalid number length for ${countryAbbreviation}`;
        }
      
        return formattedNumber;
      },[newJoin.countrycode])
      
      useEffect(() => {
        const timer = setTimeout(() => {
          if (tempPhoneNumber.length >= 8) {
            const formattedPhone = formatPhoneNumber(tempPhoneNumber);
            setNewJoin((prev) => ({
              ...prev,
              phonenumber: formattedPhone
            }));
          }
        }, 500);  // Wait 500ms after the user stops typing
    
        return () => clearTimeout(timer);  // Cleanup the timeout

      }, [ tempPhoneNumber,  setNewJoin, formatPhoneNumber ]); 

      useEffect(() => {
        const timer = setTimeout(() => {
          if (tempWhatsapp.length >= 8) {
            const formattedPhone = formatPhoneNumber(tempWhatsapp);
            setNewJoin((prev) => ({
              ...prev,
              whatsapp: formattedPhone
            }));
          }
        }, 1000);  // Wait 500ms after the user stops typing
    
        return () => clearTimeout(timer);  // Cleanup the timeout

      }, [ tempWhatsapp, setNewJoin, formatPhoneNumber  ]); 
      
     const handelFilterCountry = (e) => {
         const { value } = e.target;
         const countries = countryCodes.filter(a => a.country.toLowerCase().includes(value.toLowerCase()) ||
                                                    a.code.includes(value)
                                                  );  // Case-insensitive filtering
         setFilteredCountries(countries); 
 
     }


     const handelFilterNativeLanguages = (inputValue) => {

        if (inputValue !== "") {
            // Filter languages if there is an input
            const lanfilter = filteredLanguages.filter((a) =>
              a.toLowerCase().includes(inputValue.toLowerCase())
            );
            setLanguages(lanfilter);
          } else {
            // Reset to original languages if input is empty
            setLanguages(filteredLanguages); 
          }
     }
       
   
 
     const handelNewJoiner = (e) => {
         const { name, value } = e.target;
 
         if (name === 'phonenumber') {
             phoneNumberRef.current = value;
             setTempPhoneNumber(value);  // Update temporary phone number for debounce
         }else if(name === 'whatsapp'){
             phoneNumberRef.current = value;
             setTempWhatsapp(value);
         }
         
         // console.log("Chak: ", Array.isArray(newJoin.foraingelanguagues))
         // handleForagLange(value); 
 
         setNewJoin(prevState => ({
             ...prevState, 
             [name]: value,
         }))
 
         const result = countryCodesCities.find(
           (country) => Object.keys(country)[0].toLowerCase() === countryFilter.toLowerCase()
         );
 
         console.log("Result: ", result)
 
     }
 

     
 
   const handleFileChange = (e) => {
     setFile(e.target.files);
     const selectedFiles = e.target.files;
     const filesArray = Array.from(selectedFiles);
 
     console.log("filesArray: ", filesArray)
     setPreviewFile(filesArray);
 
     // Create image preview
     const filePreviews = filesArray.map(file => URL.createObjectURL(file));
     setPreviewFile(filePreviews);
   };
 
   
 
 const handleFileUpload = async (e) => {
   e.preventDefault();
 
   if (files.length === 0) {
     setMessage('Please select files');
     return;
   }
 
   const formData = new FormData();
   const resultLastName = newJoin.lastname.split(' ').join('')
   const sintaxImage = files.length > 1 ? "profile" : "storage"
 
   for (let i = 0; i < files.length; i++) {
     const file = files[i];
 
     const fileExtension = file.name.substring(file.name.lastIndexOf('.'));
     const newFileName = `${newJoin.firstname}_${resultLastName}-${sintaxImage}(${i + 1})${fileExtension}`;
     const newFile = new File([file], newFileName, { type: file.type });
 
     formData.append('images', newFile);
   }
 
   try {
     const res = await axios.post('https://meet-yoursoul-mate-backend.adaptable.app/upload', formData, {
       headers: {
         'Content-Type': 'multipart/form-data'
       },
       timeout: 5 * 60 * 1000,  // 5 minutes timeout
       onUploadProgress: (progressEvent) => {
         const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
         console.log(`Upload Progress: ${progress}%`);
         setMessage(`Upload Progress: ${progress}%`);
       }
     });
 
     const uploadedFiles = res.data.files;
 
     // Handle the uploaded files...
     console.log("uploadedFiles: ", uploadedFiles);
 
 
         if (uploadedFiles.length > 1) {
           let arraFile = []
           for(let i = 0; i < uploadedFiles.length; i++){
             arraFile.push("https://meet-yoursoul-mate-backend.adaptable.app/" + uploadedFiles[i].path)
           }
           // Update the 'imageprofile' field in 'newJoin' with the uploaded image URL
           setNewJoin(prevState => ({
               ...prevState,
               storageImage: arraFile // Set the image URL to imageprofile
           }));
       }else if(uploadedFiles.length === 1) {
           const imageURL = uploadedFiles[0].path;  // Take the path of the first uploaded file
           console.log("imageirl", imageURL)
 
             // Update the 'imageprofile' field in 'newJoin' with the uploaded image URL
             setNewJoin(prevState => ({
                 ...prevState,
                 imageprofile: "https://meet-yoursoul-mate-backend.adaptable.app/" + imageURL // Set the image URL to imageprofile
             }));
 // Invoke the function if necessary
              setNewJoinerRegistration(prev => ({ 
                  ...prev, 
                  email: emailRegister,
                  password: passwordRegister,
                  imageprofile:  "https://meet-yoursoul-mate-backend.adaptable.app/" + imageURL
              }));

           
       }
 
       setMessage('File uploaded successfully');
     setTimeout(() => { setMessage('') }, 3500);
   } catch (err) {
     console.error(err);
     setMessage('Failed to upload file');
   }
 };
  
 
 
   const onClickHandler = (target) => {
     console.log(target)
     if (target === 'countryCode') {
       setTestSelection(target)
         setActivateCountryCode(true); 
         setActivateProfileImg(false);
         setActivateStorageImg(false);
         setActivateGender(false);
         setActivateEyeColor(false);
         setActivateSkinColor(false);
         setActivateHaiColor(false);
         setActivateNativeLang(false);
         setActivateForaingeLang(false);
         setActivateIncall(false);
         setActivateOutcall(false);
         setActivateAbout(false);
         setActivateLocation(false);
         setActivateOrignialCountry(false);
         setActivateActivities(false)
         setActivateWeight(false)
         setActivateHeight(false)
         setActivateBust(false)
         setActivateRaceType(false)
     } else if (target === 'imageprofile') {
         setTestSelection(target)
         setActivateCountryCode(false); 
         setActivateProfileImg(true);
         setActivateStorageImg(false);
         setActivateGender(false);
         setActivateEyeColor(false);
         setActivateSkinColor(false);
         setActivateHaiColor(false);
         setActivateNativeLang(false);
         setActivateForaingeLang(false);
         setActivateIncall(false);
         setActivateOutcall(false);
         setActivateAbout(false);
         setActivateLocation(false);
         setActivateOrignialCountry(false);
         setActivateActivities(false)
         setActivateWeight(false)
         setActivateHeight(false)
         setActivateBust(false)
         setActivateRaceType(false)
     } else if(target === 'storageImage'){
       setTestSelection(target)
         setActivateCountryCode(false); 
         setActivateProfileImg(false);
         setActivateStorageImg(true);
         setActivateGender(false);
         setActivateEyeColor(false);
         setActivateSkinColor(false);
         setActivateHaiColor(false);
         setActivateNativeLang(false);
         setActivateForaingeLang(false);
         setActivateIncall(false);
         setActivateOutcall(false);
         setActivateAbout(false);
         setActivateLocation(false);
         setActivateOrignialCountry(false);
         setActivateActivities(false)
         setActivateWeight(false)
         setActivateHeight(false)
         setActivateBust(false)
         setActivateRaceType(false)
     }else if(target === 'gender'){
       setTestSelection(target)
         setActivateCountryCode(false); 
         setActivateProfileImg(false);
         setActivateStorageImg(false);
         setActivateGender(true);
         setActivateEyeColor(false);
         setActivateSkinColor(false);
         setActivateHaiColor(false);
         setActivateNativeLang(false);
         setActivateForaingeLang(false);
         setActivateIncall(false);
         setActivateOutcall(false);
         setActivateAbout(false);
         setActivateLocation(false);
         setActivateOrignialCountry(false);
         setActivateActivities(false)
         setActivateWeight(false)
         setActivateHeight(false)
         setActivateBust(false)
         setActivateRaceType(false)
     }else if(target === 'eyecolor'){
       setTestSelection(target)
         setActivateCountryCode(false); 
         setActivateProfileImg(false);
         setActivateStorageImg(false);
         setActivateGender(false);
         setActivateEyeColor(true);
         setActivateSkinColor(false);
         setActivateHaiColor(false);
         setActivateNativeLang(false);
         setActivateForaingeLang(false);
         setActivateIncall(false);
         setActivateOutcall(false);
         setActivateAbout(false);
         setActivateLocation(false);
         setActivateOrignialCountry(false);
         setActivateActivities(false)
         setActivateWeight(false)
         setActivateHeight(false)
         setActivateBust(false)
         setActivateRaceType(false)
     }else if(target === 'skincolor'){
       setTestSelection(target)
         setActivateCountryCode(false); 
         setActivateProfileImg(false);
         setActivateStorageImg(false);
         setActivateGender(false);
         setActivateEyeColor(false);
         setActivateSkinColor(true);
         setActivateHaiColor(false);
         setActivateNativeLang(false);
         setActivateForaingeLang(false);
         setActivateIncall(false);
         setActivateOutcall(false);
         setActivateAbout(false);
         setActivateLocation(false);
         setActivateOrignialCountry(false);
         setActivateActivities(false)
         setActivateWeight(false)
         setActivateHeight(false)
         setActivateBust(false)
         setActivateRaceType(false)
     }else if(target === 'haircolor'){
       setTestSelection(target)
         setActivateCountryCode(false); 
         setActivateProfileImg(false);
         setActivateStorageImg(false);
         setActivateGender(false);
         setActivateEyeColor(false);
         setActivateSkinColor(false);
         setActivateHaiColor(true);
         setActivateNativeLang(false);
         setActivateForaingeLang(false);
         setActivateIncall(false);
         setActivateOutcall(false);
         setActivateAbout(false);
         setActivateLocation(false);
         setActivateOrignialCountry(false);
         setActivateActivities(false)
         setActivateWeight(false)
         setActivateHeight(false)
         setActivateBust(false)
         setActivateRaceType(false)
     }else if(target === 'nativelanguages'){
       setTestSelection(target)
         setActivateCountryCode(false); 
         setActivateProfileImg(false);
         setActivateStorageImg(false);
         setActivateGender(false);
         setActivateEyeColor(false);
         setActivateSkinColor(false);
         setActivateHaiColor(false);
         setActivateNativeLang(true);
         setActivateForaingeLang(false);
         setActivateIncall(false);
         setActivateOutcall(false);
         setActivateAbout(false);
         setActivateLocation(false);
         setActivateOrignialCountry(false);
         setActivateActivities(false)
         setActivateWeight(false)
         setActivateHeight(false)
         setActivateBust(false)
         setActivateRaceType(false)
     }else if(target === 'foraingelanguagues'){
       setTestSelection(target)
         setActivateCountryCode(false); 
         setActivateProfileImg(false);
         setActivateStorageImg(false);
         setActivateGender(false);
         setActivateEyeColor(false);
         setActivateSkinColor(false);
         setActivateHaiColor(false);
         setActivateNativeLang(false);
         setActivateForaingeLang(true);
         setActivateIncall(false);
         setActivateOutcall(false);
         setActivateAbout(false);
         setActivateLocation(false);
         setActivateOrignialCountry(false);
         setActivateActivities(false)
         setActivateWeight(false)
         setActivateHeight(false)
         setActivateBust(false)
         setActivateRaceType(false)
     }else if(target === 'incall'){
       setTestSelection(target)
         setActivateCountryCode(false); 
         setActivateProfileImg(false);
         setActivateStorageImg(false);
         setActivateGender(false);
         setActivateEyeColor(false);
         setActivateSkinColor(false);
         setActivateHaiColor(false);
         setActivateNativeLang(false);
         setActivateForaingeLang(false);
         setActivateIncall(true);
         setActivateOutcall(false);
         setActivateAbout(false);
         setActivateLocation(false);
         setActivateOrignialCountry(false);
         setActivateActivities(false)
         setActivateWeight(false)
         setActivateHeight(false)
         setActivateBust(false)
         setActivateRaceType(false)
     }else if(target === 'outcall'){
       setTestSelection(target)
         setActivateCountryCode(false); 
         setActivateProfileImg(false);
         setActivateStorageImg(false);
         setActivateGender(false);
         setActivateEyeColor(false);
         setActivateSkinColor(false);
         setActivateHaiColor(false);
         setActivateNativeLang(false);
         setActivateForaingeLang(false);
         setActivateIncall(false);
         setActivateOutcall(true);
         setActivateAbout(false);
         setActivateLocation(false);
         setActivateOrignialCountry(false);
         setActivateActivities(false)
         setActivateWeight(false)
         setActivateHeight(false)
         setActivateBust(false)
         setActivateRaceType(false)
     }else if(target === 'about'){
       setTestSelection(target)
         setActivateCountryCode(false); 
         setActivateProfileImg(false);
         setActivateStorageImg(false);
         setActivateGender(false);
         setActivateEyeColor(false);
         setActivateSkinColor(false);
         setActivateHaiColor(false);
         setActivateNativeLang(false);
         setActivateForaingeLang(false);
         setActivateIncall(false);
         setActivateOutcall(false);
         setActivateAbout(true);
         setActivateLocation(false);
         setActivateOrignialCountry(false);
         setActivateActivities(false)
         setActivateWeight(false)
         setActivateHeight(false)
         setActivateBust(false)
         setActivateRaceType(false)
     }else if(target === 'location'){
       setTestSelection(target)
         setCountryFilter('')
         setOriginalCountryFilter([]) 
         setActivateCountryCode(false); 
         setActivateProfileImg(false);
         setActivateStorageImg(false);
         setActivateGender(false);
         setActivateEyeColor(false);
         setActivateSkinColor(false);
         setActivateHaiColor(false);
         setActivateNativeLang(false);
         setActivateForaingeLang(false);
         setActivateIncall(false);
         setActivateOutcall(false);
         setActivateAbout(false);
         setActivateLocation(true);
         setActivateOrignialCountry(false);
         setActivateActivities(false)
         setActivateWeight(false)
         setActivateHeight(false)
         setActivateBust(false)
         setActivateRaceType(false)
     }else if(target === 'originalcountry'){
       setTestSelection(target)
         setCountryFilter('')
         setMapCountryFilter([])
         setActivateCountryCode(false); 
         setActivateProfileImg(false);
         setActivateStorageImg(false);
         setActivateGender(false);
         setActivateEyeColor(false);
         setActivateSkinColor(false);
         setActivateHaiColor(false);
         setActivateNativeLang(false);
         setActivateForaingeLang(false);
         setActivateIncall(false);
         setActivateOutcall(false);
         setActivateAbout(false);
         setActivateLocation(false);
         setActivateOrignialCountry(true);
         setActivateActivities(false)
         setActivateWeight(false)
         setActivateHeight(false)
         setActivateBust(false)
         setActivateRaceType(false)
     }else if(target === 'activities'){
       setTestSelection(target)
         setActivateCountryCode(false); 
         setActivateProfileImg(false);
         setActivateStorageImg(false);
         setActivateGender(false);
         setActivateEyeColor(false);
         setActivateSkinColor(false);
         setActivateHaiColor(false);
         setActivateNativeLang(false);
         setActivateForaingeLang(false);
         setActivateIncall(false);
         setActivateOutcall(false);
         setActivateAbout(false);
         setActivateLocation(false);
         setActivateOrignialCountry(false);
         setActivateActivities(true)
         setActivateWeight(false)
         setActivateHeight(false)
         setActivateBust(false)
         setActivateRaceType(false)
     }else if(target === 'height'){
       setTestSelection(target)
         setActivateCountryCode(false); 
         setActivateProfileImg(false);
         setActivateStorageImg(false);
         setActivateGender(false);
         setActivateEyeColor(false);
         setActivateSkinColor(false);
         setActivateHaiColor(false);
         setActivateNativeLang(false);
         setActivateForaingeLang(false);
         setActivateIncall(false);
         setActivateOutcall(false);
         setActivateAbout(false);
         setActivateLocation(false);
         setActivateOrignialCountry(false);
         setActivateActivities(false)
         setActivateWeight(false)
         setActivateHeight(true)
         setActivateBust(false)
         setActivateRaceType(false)
     }else if(target === 'weight'){
       setTestSelection(target)
         setActivateCountryCode(false); 
         setActivateProfileImg(false);
         setActivateStorageImg(false);
         setActivateGender(false);
         setActivateEyeColor(false);
         setActivateSkinColor(false);
         setActivateHaiColor(false);
         setActivateNativeLang(false);
         setActivateForaingeLang(false);
         setActivateIncall(false);
         setActivateOutcall(false);
         setActivateAbout(false);
         setActivateLocation(false);
         setActivateOrignialCountry(false);
         setActivateActivities(false)
         setActivateWeight(true)
         setActivateHeight(false)
         setActivateBust(false)
         setActivateRaceType(false)
     }else if(target === 'bust'){
       setTestSelection(target)
       setActivateCountryCode(false); 
         setActivateProfileImg(false);
         setActivateStorageImg(false);
         setActivateGender(false);
         setActivateEyeColor(false);
         setActivateSkinColor(false);
         setActivateHaiColor(false);
         setActivateNativeLang(false);
         setActivateForaingeLang(false);
         setActivateIncall(false);
         setActivateOutcall(false);
         setActivateAbout(false);
         setActivateLocation(false);
         setActivateOrignialCountry(false);
         setActivateActivities(false)
         setActivateWeight(false)
         setActivateHeight(false)
         setActivateBust(true)
         setActivateRaceType(false)
     }else if(target === 'race_type'){
       setTestSelection(target)
       setActivateCountryCode(false); 
       setActivateProfileImg(false);
       setActivateStorageImg(false);
       setActivateGender(false);
       setActivateEyeColor(false);
       setActivateSkinColor(false);
       setActivateHaiColor(false);
       setActivateNativeLang(false);
       setActivateForaingeLang(false);
       setActivateIncall(false);
       setActivateOutcall(false);
       setActivateAbout(false);
       setActivateLocation(false);
       setActivateOrignialCountry(false);
       setActivateActivities(false)
       setActivateWeight(false)
       setActivateHeight(false)
       setActivateBust(false)
       setActivateRaceType(true)
     }else if(target === 'firstname'){
       setTestSelection(target)
       setActivateCountryCode(false); 
       setActivateProfileImg(false);
       setActivateStorageImg(false);
       setActivateGender(false);
       setActivateEyeColor(false);
       setActivateSkinColor(false);
       setActivateHaiColor(false);
       setActivateNativeLang(false);
       setActivateForaingeLang(false);
       setActivateIncall(false);
       setActivateOutcall(false);
       setActivateAbout(false);
       setActivateLocation(false);
       setActivateOrignialCountry(false);
       setActivateActivities(false)
       setActivateWeight(false)
       setActivateHeight(false)
       setActivateBust(false)
       setActivateRaceType(false)
     }else if(target === 'lastname'){
       setTestSelection(target)
       setActivateCountryCode(false); 
       setActivateProfileImg(false);
       setActivateStorageImg(false);
       setActivateGender(false);
       setActivateEyeColor(false);
       setActivateSkinColor(false);
       setActivateHaiColor(false);
       setActivateNativeLang(false);
       setActivateForaingeLang(false);
       setActivateIncall(false);
       setActivateOutcall(false);
       setActivateAbout(false);
       setActivateLocation(false);
       setActivateOrignialCountry(false);
       setActivateActivities(false)
       setActivateWeight(false)
       setActivateHeight(false)
       setActivateBust(false)
       setActivateRaceType(false)
     }else if(target === 'username'){
       setTestSelection(target)
       setActivateCountryCode(false); 
       setActivateProfileImg(false);
       setActivateStorageImg(false);
       setActivateGender(false);
       setActivateEyeColor(false);
       setActivateSkinColor(false);
       setActivateHaiColor(false);
       setActivateNativeLang(false);
       setActivateForaingeLang(false);
       setActivateIncall(false);
       setActivateOutcall(false);
       setActivateAbout(false);
       setActivateLocation(false);
       setActivateOrignialCountry(false);
       setActivateActivities(false)
       setActivateWeight(false)
       setActivateHeight(false)
       setActivateBust(false)
       setActivateRaceType(false)
     }else if(target === 'age'){
       setTestSelection(target)
       setActivateCountryCode(false); 
       setActivateProfileImg(false);
       setActivateStorageImg(false);
       setActivateGender(false);
       setActivateEyeColor(false);
       setActivateSkinColor(false);
       setActivateHaiColor(false);
       setActivateNativeLang(false);
       setActivateForaingeLang(false);
       setActivateIncall(false);
       setActivateOutcall(false);
       setActivateAbout(false);
       setActivateLocation(false);
       setActivateOrignialCountry(false);
       setActivateActivities(false)
       setActivateWeight(false)
       setActivateHeight(false)
       setActivateBust(false)
       setActivateRaceType(false)
     }else if(target === 'phonenumber'){
       setTestSelection(target)
       setActivateCountryCode(false); 
       setActivateProfileImg(false);
       setActivateStorageImg(false);
       setActivateGender(false);
       setActivateEyeColor(false);
       setActivateSkinColor(false);
       setActivateHaiColor(false);
       setActivateNativeLang(false);
       setActivateForaingeLang(false);
       setActivateIncall(false);
       setActivateOutcall(false);
       setActivateAbout(false);
       setActivateLocation(false);
       setActivateOrignialCountry(false);
       setActivateActivities(false)
       setActivateWeight(false)
       setActivateHeight(false)
       setActivateBust(false)
       setActivateRaceType(false)
     }else if(target === 'whatsapp'){
       setTestSelection(target)
       setActivateCountryCode(false); 
       setActivateProfileImg(false);
       setActivateStorageImg(false);
       setActivateGender(false);
       setActivateEyeColor(false);
       setActivateSkinColor(false);
       setActivateHaiColor(false);
       setActivateNativeLang(false);
       setActivateForaingeLang(false);
       setActivateIncall(false);
       setActivateOutcall(false);
       setActivateAbout(false);
       setActivateLocation(false);
       setActivateOrignialCountry(false);
       setActivateActivities(false)
       setActivateWeight(false)
       setActivateHeight(false)
       setActivateBust(false)
       setActivateRaceType(false)
     }else if(target === 'email'){
       setTestSelection(target)
       setActivateCountryCode(false); 
       setActivateProfileImg(false);
       setActivateStorageImg(false);
       setActivateGender(false);
       setActivateEyeColor(false);
       setActivateSkinColor(false);
       setActivateHaiColor(false);
       setActivateNativeLang(false);
       setActivateForaingeLang(false);
       setActivateIncall(false);
       setActivateOutcall(false);
       setActivateAbout(false);
       setActivateLocation(false);
       setActivateOrignialCountry(false);
       setActivateActivities(false)
       setActivateWeight(false)
       setActivateHeight(false)
       setActivateBust(false)
       setActivateRaceType(false)
     }
 
   };
 


  const resizeImages = () => {
    const containerWidth = containerRef.current ? containerRef.current.offsetWidth : 0;

    let newWidth;

    if (containerWidth >= 800) {
        // For larger containers (4 cards in a row), set card width to 25%
        newWidth = containerWidth * 0.25 + 'px';
        console.log('Setting width to 25%:', newWidth);
      } else if (containerWidth < 800 && containerWidth >= 600) {
        // For smaller containers (3 cards in a row), set card width to 33%
        newWidth = containerWidth * 0.25 + 'px';
        console.log('Setting width to 32.5%:', newWidth);
      } else {
        // Fallback in case the container is smaller than 600px
        newWidth = containerWidth * 0.325 + 'px';
        console.log('Fallback width:', newWidth);
      }

    setImageWidth(newWidth);
  };

  // Hook to resize images on load and on window resize
  useEffect(() => {
    resizeImages();
    window.addEventListener('resize', resizeImages);
    return () => window.removeEventListener('resize', resizeImages);
  }, []);
 
 
   console.log("countryFilter: ", countryFilter, activateProfileImg)
   console.log('newJoin: ', newJoin)
   console.log('newJoinRegistration: ', newJoinRegistration) 
 
   const handleSubmit = () => {
    
     const missingFields = [];
 
     // Check each required field and add missing ones to the array
     if (!newJoin.date) missingFields.push('Date');
     if (!newJoin.firstname) missingFields.push('First Name');
     if (!newJoin.lastname) missingFields.push('Last Name');
     if (!newJoin.username) missingFields.push('Username');
     if (!newJoin.gender) missingFields.push('Gender');
     if (!newJoin.age) missingFields.push('Age');
     if (!newJoin.race_type) missingFields.push('Race Type');
     if (!newJoin.height) missingFields.push('Height');
     if (!newJoin.weight) missingFields.push('Weight');
     if (!newJoin.eyecolor) missingFields.push('Eye Color');
     if (!newJoin.skincolor) missingFields.push('Skin Color');
     if (!newJoin.haircolor) missingFields.push('Hair Color');
     if (!newJoin.nativelanguages) missingFields.push('Native Languages');
     if (!newJoin.incall) missingFields.push('Incall');
     if (!newJoin.outcall) missingFields.push('Outcall');
     if (!newJoin.countrycode) missingFields.push('Country Code');
     if (!newJoin.phonenumber) missingFields.push('Phone Number');
     if (!newJoin.email) missingFields.push('Email');
     if (!newJoin.about) missingFields.push('About');
     if (!newJoin.imageprofile) missingFields.push('Profile Image');
     if (!newJoin.location) missingFields.push('Location');
     if (!newJoin.originalcountry) missingFields.push('Original Country');
 
     // If there are missing fields, display an error message
     if (missingFields.length > 0) {
         setMessageJoin(`Sorry, the following mandatory fields are missing: ${missingFields.join(', ')}`);
         setTimeout(() => { setMessageJoin('') }, 4000);
         return;  // Stop form submission if validation fails
     }

   
    
     // If all required fields are filled, proceed with form submission
     axios.post("https://meet-yoursoul-mate-backend.adaptable.app/newJoiner", newJoin)
         .then(response => {
             setNewJoinerRegistration(prev => ({ 
              ...prev, 
              membershipcode: response.data.newMember.memberjoinercode,
              phonenumber: newJoin.phonenumber
          }));

          setActiveFinalRegister(true)
 
             // Reset all fields after successful submission
             setNewJoin({
                 date: '',
                 status: '',
                 firstname: '',
                 lastname: '',
                 username: '',
                 gender: '',
                 age: 0,
                 race_type: '',
                 height: '',
                 weight: '',
                 eyecolor: '',
                 skincolor: '',
                 haircolor: '',
                 bust: '',
                 nativelanguages: '',
                 foraingelanguagues: [],
                 active: false,
                 incall: '',
                 outcall: '',
                 countrycode: [''],
                 phonenumber: '',
                 whatsapp: '',
                 email: '',
                 about: ``,
                 imageprofile: ``,
                 storageImage: [],
                 location: '',
                 originalcountry: '',
                 activities: [],
                 vip: false,
                 rating: 0,
                 memberjoinercode: ''
             });
 
             setTestSelection('')
             setActivateCountryCode(false); 
             setActivateProfileImg(false);
             setActivateStorageImg(false);
             setActivateGender(false);
             setActivateEyeColor(false);
             setActivateSkinColor(false);
             setActivateHaiColor(false);
             setActivateNativeLang(false);
             setActivateForaingeLang(false);
             setActivateIncall(false);
             setActivateOutcall(false);
             setActivateAbout(false);
             setActivateLocation(false);
             setActivateOrignialCountry(false);
             setActivateActivities(false)
             setActivateWeight(false)
             setActivateHeight(false)
             setActivateBust(false)
             setActivateRaceType(false)
 
 
             // Show success message
             setMessageJoin('Thank you! Congrats on successfully subscribing to Meet Your Soulmate!');
             
         })
         .catch(error => {
             console.log(error.message);
         });
 };


console.log("register: ", newJoinRegistration) 
const redirectToPage = (path) => {
  navigate(path);
};

  const handleSubmitResgistration = () => {
      
    const missingFields = [];

    // Check each required field and add missing ones to the array
    if (!newJoinRegistration.firstname) missingFields.push('First Name');
    if (!newJoinRegistration.lastname) missingFields.push('Last Name');
    if (!newJoinRegistration.email) missingFields.push('Email');
    if (!newJoinRegistration.password) missingFields.push('Password');
    if (!newJoinRegistration.phonenumber) missingFields.push('Phone Number');
    if (!newJoinRegistration.imageprofile) missingFields.push('Profile Image');
    if (!newJoinRegistration.membershipcode) missingFields.push('Membershipcode');


    // If there are missing fields, display an error message
    if (missingFields.length > 0) {
        setMessageJoin(`Sorry, the following mandatory fields are missing: ${missingFields.join(', ')}`);
        setTimeout(() => { setMessageJoin('') }, 4000);
        return;  // Stop form submission if validation fails
    }


    
   axios.post('https://meet-yoursoul-mate-backend.adaptable.app/newMember', newJoinRegistration)
        .then(res =>
            {
              const tokenUser = res.data.token;
              const dataMember = res.data.addingNewMember;
              sessionStorage.setItem('username', JSON.stringify(dataMember));
              sessionStorage.setItem('userToken', tokenUser);

              setActiveFinalRegister(false)
              setMessageJoin('Thank you! Congrats on successfully Register to Meet Your Soulmate!');
              setMessageJoin('');
              window.location.reload()

              // setTimeout(() => { setMessageJoin('');
              //   window.location.reload() }, 4000);
              redirectToPage('/');
                
            }
      )
        .catch(error => error)

  
  };

 

 console.log("passwordRegister, emailRegister:", emailRegister, passwordRegister )
 
   return (
     <div style={{  height: "82.9vh"}}>
      {!open && 
        <Register setEmailRegister={setEmailRegister}
                  emailRegister={emailRegister}
                  setOpen={setOpen}
                  open={open}
                  setPasswordRegister={setPasswordRegister} 
                  passwordRegister={passwordRegister} />  }

         <div style={{display: 'flex', justifyContent: "space-between", height: "50px",
                      textAlign: "center", padding: "0px 7px"}}> 
             <h3>New Join {testSelection.length > 0 ? ": " + testSelection.charAt(0).toUpperCase() + testSelection.slice(1)  : ''}</h3> 
              <button style={{width: "80px", fontSize: '15px', cursor: "pointer",
                              borderRadius: '10px', border: '0.5px solid gray'
              }} onClick={handleSubmit}>
                        Join  <FontAwesomeIcon icon={faPaperPlane} 
                                               style={{fontSize: "20px", marginLeft: "5px", color: "green"}} />
               </button>
               
              
         </div>
         <div style={{display: 'flex'}}>
           <div style={{flex: 3,  border: '0.5px solid', borderLeft: "none",
                        padding: '20px 20px', marginLeft: "0.3px"}} >
             <form className='inputsStyle'>
               <input 
                     type='text' 
                     name='firstname' // Set the name to match the key in your state
                     // value={newJoin.firstname}
                     placeholder="First Name"
                     onChange={(e) => {
                      handelNewJoiner(e); // Invoke the function if necessary
                      setNewJoinerRegistration(prev => ({ 
                          ...prev, 
                          firstname: e.target.value // Update the firstname field correctly
                      }));
                  }}
                     onClick={(e)=> onClickHandler(e.target.name)}
                     required
                    
                 />
                 <input 
                     type='text' 
                     name='lastname' // Set the name to match the key in your state
                     placeholder="Last Name"
                     // value={newJoin.lastname}
                     onChange={(e) => {
                      handelNewJoiner(e); // Invoke the function if necessary
                      setNewJoinerRegistration(prev => ({ 
                          ...prev, 
                          lastname: e.target.value // Update the firstname field correctly
                      }));
                     }}
                     onClick={(e)=> onClickHandler(e.target.name)}
                     className='inputsStyle'
                     required
                 />
                 <input 
                     type='text' 
                     name='username' // Set the name to match the key in your state
                     placeholder="UserName"
                     // value={newJoin.username}
                     onChange={handelNewJoiner} 
                     onClick={(e)=> onClickHandler(e.target.name)}
                     
                 />
                 <input 
                     type='text' 
                     name='gender' // Set the name to match the key in your state
                     placeholder="Gender"
                     value={newJoin.gender}
                     onChange={handelNewJoiner} 
                     onClick={(e)=> onClickHandler(e.target.name)}
                     style={{cursor: 'pointer'}}
                     readOnly
                     required
                 />
                {newJoin.gender !== "Male" && 
                 <input 
                     type='text' 
                     name='bust' // Set the name to match the key in your state
                     placeholder="Bust"
                     value={newJoin.bust}
                     onChange={handelNewJoiner} 
                     onClick={(e)=> onClickHandler(e.target.name)}
                     style={{cursor: 'pointer'}}
                     readOnly
                 />}
                 <input 
                     type='number' 
                     name='age' 
                     // value={newJoin.age > 0 ? newJoin.age : "age" }
                     placeholder="Age"
                     onChange={handelNewJoiner} 
                     onClick={(e)=> onClickHandler(e.target.name)}
                     required
                 />
                 <input 
                     type='text' 
                     name='height' // Set the name to match the key in your state
                     placeholder="Height (foot/cm)"
                     // value={messageJoin !== "" ? "" : "Height (foot/cm)"} 
                     onChange={handelNewJoiner} 
                    //  onChange={(e) =>  setNewJoin(prevState => ({
                    //   ...prevState, height : handleInputChangeCM(e.target.value)
                    //  }))
                     
                    //  }
                     onClick={(e)=> onClickHandler(e.target.name)}
                     required
                 />
                 <input 
                     type='text' 
                     name='weight' // Set the name to match the key in your state
                     placeholder="Weight (lb)"
                     // value={newJoin.weight}
                     onChange={handelNewJoiner} 
                    //  onChange={(e) =>  setNewJoin(prevState => ({
                    //   ...prevState, weight : handleInputChangeLB(e.target.value)
                    //  }))
                    //  } 
                     onClick={(e)=> onClickHandler(e.target.name)}
                     required
                 />
                 <input 
                     type='text' 
                     name='eyecolor' // Set the name to match the key in your state
                     placeholder="Eye-color"
                     value={newJoin.eyecolor}
                     onChange={handelNewJoiner} 
                     onClick={(e)=> onClickHandler(e.target.name)}
                     style={{cursor: 'pointer'}}
                     readOnly
                     required
                 />
                 <input 
                     type='text' 
                     name='skincolor' // Set the name to match the key in your state
                     placeholder="Skin-color"
                     value={newJoin.skincolor}
                     onChange={handelNewJoiner} 
                     onClick={(e)=> onClickHandler(e.target.name)}
                     style={{cursor: 'pointer'}}
                     readOnly
                     required
                 />
                 <input 
                     type='text' 
                     name='haircolor' // Set the name to match the key in your state
                     placeholder="Hair-color"
                     value={newJoin.haircolor}
                     onChange={handelNewJoiner} 
                     onClick={(e)=> onClickHandler(e.target.name)}
                     style={{cursor: 'pointer'}}
                     readOnly
                     required
                 />
                  <input 
                     type='text' 
                     name='race_type' // Set the name to match the key in your state
                     placeholder="Race_Type"
                     value={newJoin.race_type}
                     onChange={handelNewJoiner} 
                     onClick={(e)=> onClickHandler(e.target.name)}
                     style={{cursor: 'pointer'}}
                     readOnly
                     required
                 />
                 <input 
                     type='text' 
                     name='nativelanguages' // Set the name to match the key in your state
                     placeholder="Native languages"
                     value={newJoin.nativelanguages}
                     onChange={ handelNewJoiner} 
                     onClick={(e)=> onClickHandler(e.target.name)}
                     style={{cursor: 'pointer'}}
                     readOnly
                     required
                 />
                 <input 
                     type='text' 
                     name='foraingelanguagues' // Set the name to match the key in your state
                     placeholder="Forainge languagues"
                     value={newJoin.foraingelanguagues}
                     onChange={handelNewJoiner} 
                     onClick={(e)=> onClickHandler(e.target.name)}
                     style={{cursor: 'pointer'}}
                     readOnly
                 />
                 {/*  Do not display for new Joiner. Set By default */ }
                 <input 
                     type='text' 
                     name='active' // Set the name to match the key in your state
                     placeholder="Active"
                     onChange={handelNewJoiner} 
                     style={{display: 'none'}}
                 />
                 <input 
                     type='text' 
                     name='incall' // Set the name to match the key in your state
                     placeholder="Incall"
                     value={newJoin.incall}
                     onChange={handelNewJoiner} 
                     onClick={(e)=> onClickHandler(e.target.name)}
                     style={{cursor: 'pointer'}}
                     readOnly
                     required
                 />
                 <input 
                     type='text' 
                     name='outcall' // Set the name to match the key in your state
                     placeholder="Outcall"
                     value={newJoin.outcall}
                     onChange={handelNewJoiner} 
                     onClick={(e)=> onClickHandler(e.target.name)}
                     style={{cursor: 'pointer'}}
                     readOnly
                     required
                 /> 
 
                 {/*  Set the country code. implement un select country to target a code */ }
                 <input 
                     type='text' 
                     name='countryCode' 
                     placeholder="Country Code"
                     value = {newJoin.countrycode[0]}
                     onChange={handelNewJoiner} 
                     onClick={(e)=> onClickHandler(e.target.name)}
                     style={{cursor: 'pointer'}}
                     readOnly
                     required
                 />
                 {/*  Set a function to create format for phone number */ }
                  <input 
                     type='text' 
                     name='phonenumber' 
                     placeholder="Phone number"
                     value={newJoin.phonenumber}  // Bind the value to the state
                     onChange={handelNewJoiner}
                     onClick={(e)=> onClickHandler(e.target.name)}
                     required
                 />
 
                  <input 
                     type='text' 
                     name='whatsapp' // Set the name to match the key in your state
                     placeholder="Whatsapp"
                     value={newJoin.whatsapp} 
                     onChange={handelNewJoiner} 
                     onClick={(e)=> onClickHandler(e.target.name)}
                     
                 />
                  <input 
                     type='text' 
                     name='email' // Set the name to match the key in your state
                     placeholder="Email"
                     onChange={handelNewJoiner} 
                     onClick={(e)=> onClickHandler(e.target.name)}
                     required
                 />
                  <input 
                     type='text' 
                     name='about' // Set the name to match the key in your state
                     placeholder="About"
                     value={newJoin.about} 
                     onChange={handelNewJoiner} 
                     onClick={(e)=> onClickHandler(e.target.name)}
                     style={{cursor: 'pointer'}}
                     readOnly
                     required
                 />
 
                  <input 
                     type='text' 
                     name='location' // Set the name to match the key in your state
                     placeholder="Location"
                     value={newJoin.location} 
                     onChange={handelNewJoiner} 
                     onClick={(e)=> onClickHandler(e.target.name)}
                     style={{cursor: 'pointer'}}
                     readOnly
                     required
                 />
                  <input 
                     type='text' 
                     name='originalcountry' // Set the name to match the key in your state
                     placeholder="Original Country"
                     value={newJoin.originalcountry} // Make sure to use 'originalcountry'
                     onChange={handelNewJoiner} 
                     onClick={(e)=> onClickHandler(e.target.name)}
                     style={{cursor: 'pointer'}}
                     readOnly
                    
                 />
                 {/*  Select all activities */ }
                 <input 
                     type='text' 
                     name='activities' // Set the name to match the key in your state
                     placeholder="Activities"
                     value={newJoin.activities} 
                     onChange={handelNewJoiner} 
                     onClick={(e)=> onClickHandler(e.target.name)}
                     style={{cursor: 'pointer'}}
                     readOnly
                     
                 />
 
                  {/*  Do not display for new Joiner. Set By default */ }
                 <input 
                     type='text' 
                     name='vip' // Set the name to match the key in your state
                     placeholder="VIP"
                     onChange={handelNewJoiner} 
                     style={{display: 'none'}}
                 />
                 {/*  Do not display for new Joiner. Set By default */ }
                 <input 
                     type='text' 
                     name='rating' // Set the name to match the key in your state
                     placeholder="rating"
                     onChange={handelNewJoiner} 
                     style={{display: 'none'}}
                 />
                
                   {/*  Set an insert image here second step Update user */ }
                   <input 
                     type='text' 
                     name='imageprofile' 
                     placeholder="Select Image Profile"
                     onChange={handelNewJoiner} 
                     onClick={(e)=> onClickHandler(e.target.name)}
                     style={{cursor: 'pointer'}}
                     readOnly
                     required
                 />
                   {/*  Set an insert all your image here second step Update user */ }
                  <input 
                     type='text' 
                     name='storageImage' // Set the name to match the key in your state
                     placeholder="Select Image Storage"
                     onChange={handelNewJoiner} 
                     onClick={(e)=> onClickHandler(e.target.name)}
                     style={{cursor: 'pointer'}}
                     readOnly
                 />
               </form>
              
           </div>
           <div id='main-imageContainer' style={{flex: 2, border: '0.5px solid', borderLeft: "none", 
                      borderRight: "none", marginRight: "0.2px"}}>
 
 {/* Second div window display setAll Active */}
 
 {messageJoin && <div style={{display: 'flex', justifyContent: 'center', textAlign: "center",
                                                           alignItems: 'center'}}>
                                                  <div style={{  height: '100%', 
         borderRadius: '7px', 
         marginTop: '13px', 
         fontWeight: 600,
         border: '0.6px solid', 
         display: 'flex', 
         justifyContent: 'center', 
         width: '50%',
         alignItems: 'center', 
         padding: '0px 20px', 
         background: '#38f320b3'}}>
                                                                  <p>{messageJoin}</p></div>
                                                 
                                              </div> } 

    {activeFinalRegister &&  <div style={{display: 'flex', justifyContent: 'center',
                  padding: '20px 20px',  height: '350px',
                   alignItems: 'center', flexDirection: 'column'}}>
             <label style={{fontWeight: 'bold', cursor: 'pointer'}}>Click to finalize registration</label>
             <div style={{backgroundColor: '#007BFF', color: 'white', padding: '10px 20px', 
                         marginTop: '10px', textAlign: 'center', cursor: 'pointer', 
                         borderRadius: '5px'}}
                         onClick={handleSubmitResgistration}>Register</div>
      </div>}
 
 {/* Activate the Gender selection */}
     {activateGender && 
     <div style={{ display: 'flex', justifyContent: 'center',  padding: '20px 20px',
                   alignItems: 'center', flexWrap: 'wrap', gap: '20px', cursor: 'pointer'}}>
         {genders.map((gender, i)=>{
             return(
                 <div key={i} style={{display: 'flex', justifyContent: 'center',  alignItems: 'center',
                              width: '120px', border: '1px solid', padding: '4px',
                              borderRadius: '30px'}}
                              
                       onClick={(e)=> setNewJoin((prev) => ({...prev, gender: gender})) }       
                              >{gender}</div>
             )
         })}
     </div>}
 
 {/* Activate the bust for woman selection newJoin.gender !== "" */}
 {activateBust && 
    <div style={{ display: 'flex', height: "320px", justifyContent: 'center',  padding: '20px 20px', overflow: 'auto',
                   alignItems: 'center', flexWrap: 'wrap', gap: '10px', cursor: 'pointer'}}>
         {bust_size.map((bust, i)=>{
             return(
                 <div key={i} style={{display: 'flex', justifyContent: 'center',  alignItems: 'center',
                              width: '45px', border: '1px solid', padding: '4px',
                              backgroundColor: isHovered === i ? 'blue' : 'transparent',
                              color: isHovered === i ? 'white' : 'black',
                              borderRadius: '30px'}}
                              onMouseEnter={() => setIsHovered(i)}  // Set hovered to true
                              onMouseLeave={() => setIsHovered()} // Set hovered to false
                              
                       onClick={(e)=> setNewJoin((prev) => ({...prev, bust: bust})) }       
                              >{bust}</div>
             )
         })}
     </div>
     }
 
 
 {/* Activate the Heigth selection */}
    {activateWeight && 
     <div style={{ display: 'flex', justifyContent: 'center',  padding: '20px 20px',
                   alignItems: 'center', flexWrap: 'wrap', gap: '20px', cursor: 'pointer'}}>
             <div style={{ width: '300px', height: 'auto', marginTop: '27%', border: '2px solid ',
                          padding: '20px 20px', textAlign: 'justify', borderRadius: '5px', fontSize: '17px',
                          fontStyle: 'italic'
              }}>
                 "Dear new member, if your input is in kilograms, please make sure to include the unit (e.g., 59 kg)."
             </div>
             
     </div> }
 
 {/* Activate the Weigth selection */}
     {activateHeight && 
     <div style={{ display: 'flex', justifyContent: 'center',  padding: '20px 20px',
                   alignItems: 'center', flexWrap: 'wrap', gap: '20px', cursor: 'pointer'}}>
             <div style={{ width: '300px', height: 'auto', marginTop: '27%', border: '2px solid ',
                          padding: '20px 20px', textAlign: 'justify', borderRadius: '5px', fontSize: '17px',
                          fontStyle: 'italic'
              }}>
                "Dear new member, if your input is in feet, please make sure to include the unit (e.g., 5'9")."
             </div>
             
     </div>}
 
 {/* Activate the eye color selection */}
     {activateEyeColor && 
      <div style={{ display: 'flex', justifyContent: 'center',  padding: '20px 20px',
                   alignItems: 'center', flexWrap: 'wrap', gap: '20px', cursor: 'pointer'}}>
         {eyeColors.map((eye, i)=>{
             return(
                 <div key={i} style={{display: 'flex', justifyContent: 'center',  alignItems: 'center',
                              width: '120px', border: '1px solid', padding: '4px',
                              borderRadius: '30px'}}
                              
                       onClick={(e)=> setNewJoin((prev) => ({...prev, eyecolor: eye})) }       
                              >{eye}</div>
             )
         })}
     </div>} 
 
 {/* Activate the skin color selection */}
 {activateSkinColor && 
   <div style={{ display: 'flex', justifyContent: 'center',  padding: '20px 20px',
                   alignItems: 'center', flexWrap: 'wrap', gap: '20px', cursor: 'pointer'}}>
         {skinColors.map((skin, i)=>{
             return(
                 <div key={i} style={{display: 'flex', justifyContent: 'center',  alignItems: 'center',
                              width: '120px', border: '1px solid', padding: '4px',
                              borderRadius: '30px'}}
                              
                       onClick={(e)=> setNewJoin((prev) => ({...prev, skincolor: skin})) }       
                              >{skin}</div>
             )
         })}
     </div>} 
 
 {/* Activate the hair color selection */}
 {activateHairColor &&
  <div style={{ display: 'flex', justifyContent: 'center',  padding: '20px 20px',
                   alignItems: 'center', flexWrap: 'wrap', gap: '20px', cursor: 'pointer'}}>
         {hairColors.map((hair, i)=>{
             return(
                 <div key={i} style={{display: 'flex', justifyContent: 'center',  alignItems: 'center',
                              width: '120px', border: '1px solid', padding: '4px',
                              borderRadius: '30px'}}
                              
                       onClick={(e)=> setNewJoin((prev) => ({...prev, haircolor: hair})) }       
                              >{hair}</div>
             )
         })}
     </div>} 
 
 
 {/* Activate the race_type selection */}
 
 {activateRaceType && 
     <div style={{ display: 'flex', justifyContent: 'center',  padding: '20px 20px',
                   alignItems: 'center', flexWrap: 'wrap', gap: '20px', cursor: 'pointer'}}>
         {race_type.map((race_type, i)=>{
             return(
                 <div key={i} style={{display: 'flex', justifyContent: 'center',  alignItems: 'center',
                              width: '310px', border: '1px solid', padding: '7px',
                              borderRadius: '30px'}}
                              
                       onClick={(e)=> setNewJoin((prev) => ({...prev, race_type: race_type})) }       
                              >{race_type}</div>
             )
         })}
     </div>
     }
 
 
 
 {/* Activate the native alnguages selection */}
 {activateNativeLang && 
  <div>
   <div style={{padding: '10px 0px', display: 'flex', justifyContent: 'center',
                              alignItems: 'center', backgroundColor: '#0e27c9'}}>
                       <input type='text' 
                              placeholder='Input your languagues'
                              style={{width: '300px', fontSize: '16px', 
                               padding: '3px', outline:'none'}} // handelFilterNativeLanguages
                               onChange={(e) => handelFilterNativeLanguages(e.target.value)} />
                     </div>
   <div style={{ display: 'flex', justifyContent: 'center',  padding: '10px 10px', height: '347px', overflow: 'auto',
                   alignItems: 'center', flexWrap: 'wrap', gap: '15px', cursor: 'pointer'}}>
         {languages.map((langua, i)=>{
             return(
                 <div key={i} style={{display: 'block',textAlign: 'center', justifyContent: 'center',  alignItems: 'center',
                   width: '120px', border: '1px solid', padding: '4px 5px',
                   borderRadius: '30px', 
                   overflow: 'hidden', 
                   whiteSpace: 'nowrap', 
                   textOverflow: 'ellipsis'}}
                              
                       onClick={(e)=> setNewJoin((prev) => ({...prev, nativelanguages: langua})) }       
                              >{langua}</div>
             )
         })}
     </div>
     </div>}
 
 {/* Activate the forainge alnguages selection */}
 {activateForaingeLang &&
    <div>
     <div style={{padding: '10px 0px', display: 'flex', justifyContent: 'center',
                              alignItems: 'center', backgroundColor: '#0e27c9'}}>
                       <input type='text' 
                              placeholder='Input your languagues'
                              style={{width: '300px', fontSize: '16px', 
                               padding: '3px', outline:'none'}} 
                              onChange={(e) => handelFilterNativeLanguages(e.target.value)} />
                     </div>
 
  <div style={{ display: 'flex', justifyContent: 'center',  padding: '10px 10px',height: '347px', overflow: 'auto',
                   alignItems: 'center', flexWrap: 'wrap', gap: '15px', cursor: 'pointer'}}>
         {languages.map((fLangua, i)=>{
             return(
                 <div key={i} style={{display: 'block',textAlign: 'center', justifyContent: 'center',  alignItems: 'center',
                   width: '120px', border: '1px solid', padding: '4px 5px',
                   borderRadius: '30px', 
                   overflow: 'hidden', 
                   whiteSpace: 'nowrap', 
                   textOverflow: 'ellipsis'}}
                              
                       onClick={(e)=> setNewJoin((prev) => ({...prev, foraingelanguagues: !prev.foraingelanguagues.includes(fLangua)  ? [...prev.foraingelanguagues, fLangua] : prev.foraingelanguagues})) }       
                              >{fLangua}</div>
             )
         })}
     </div>
     </div>} 
 
 {/* Activate the incall selection */}
 {activateIncall && 
        <div style={{ display: 'flex', justifyContent: 'center',  padding: '20px 20px',
                   alignItems: 'center', flexWrap: 'wrap', gap: '20px', cursor: 'pointer'}}>
                     <div  style={{display: 'flex', justifyContent: 'center',  alignItems: 'center',
                              width: '120px', border: '1px solid', padding: '4px',
                              borderRadius: '30px'}}
                            
                              onClick={(e)=> setNewJoin((prev) => ({...prev, incall: "Yes"})) }   
                              >Yes</div>
                     <div style={{display: 'flex', justifyContent: 'center',  alignItems: 'center',
                              width: '120px', border: '1px solid', padding: '4px',
                              borderRadius: '30px'}}
                         
                              onClick={(e)=> setNewJoin((prev) => ({...prev, incall: "No"})) }  
                              >No</div>
 
        </div>}
 
 {/* Activate the outcall selection */}
 {activateOutcall && 
 <div style={{ display: 'flex', justifyContent: 'center',  padding: '20px 20px',
                   alignItems: 'center', flexWrap: 'wrap', gap: '20px', cursor: 'pointer'}}>
                     <div style={{display: 'flex', justifyContent: 'center',  alignItems: 'center',
                              width: '120px', border: '1px solid', padding: '4px',
                              borderRadius: '30px'}}
                              onClick={(e)=> setNewJoin((prev) => ({...prev, outcall: "Yes"})) }   
                              >Yes</div>
                     <div style={{display: 'flex', justifyContent: 'center',  alignItems: 'center',
                              width: '120px', border: '1px solid', padding: '4px',
                              borderRadius: '30px'}}
                              onClick={(e)=> setNewJoin((prev) => ({...prev, outcall: "No"})) }  
                              >No</div>
 
        </div>}
 
 {/* Activate the Country Search */}
           {activateCountryCode &&
                 <div style={{padding: '10px 0px', display: 'flex', justifyContent: 'center',
                              alignItems: 'center', backgroundColor: '#0e27c9'}}>
                     <input type='text' 
                            placeholder='Search' 
                            onChange={handelFilterCountry}
                         //    onClick={(e)=> setNewJoin(e.target.value)}
                            style={{width: '300px', fontSize: '16px', 
                                    padding: '3px', outline:'none'}} />
                 </div> }
            {activateCountryCode &&
                 <div style={{  height: '367px', overflow: 'auto' }} >
                     {filteredCountries.map((a, i) =>{
                         return(
                             <div key={i}  style={{
                                 backgroundColor: i % 2 !== 0 ?  '#c1c1c1': '#f0f0f0' ,  // Apply color to odd-indexed divs
                             }} >
                                 <div   onClick={() => setNewJoin(prev => ({
                                                                 ...prev,  // Copy the previous state
                                                                 countrycode: [a.country, a.code, a.countryCodesISO ] // Update only the countryCode with the selected country's code
                                                             }))}
                                      style={{
                                         display: 'flex', 
                                         justifyContent: 'space-between',  // Space between the country name and code
                                         padding: '3px 15px', 
                                         fontSize: '18px', 
                                         cursor: 'pointer'
                                         }}>
                                         <span>{a.country}</span>
                                         <span>{a.code}</span>
                                 </div>
                             </div>
                         )
                     }
                         
                     )}
                 </div> }
 
 
 
 
 
 {/* Activate the Profile image Upload */}
   {activateProfileImg &&  
                 <div style={{display: 'flex', justifyContent: 'center', 
                                                     alignItems: 'center'}}>
  
                         <div style={{ margin: '55px 20px', 
                                      width: '100%', height: '300px'}}> 
                                   <div style={{ height: '250px', display: 'flex',
                                               justifyContent: 'center',  alignItems: 'center' }}>
                                                {previewFiles.length === 1 &&  <img src={previewFiles[0]} 
                                                       alt="upload" 
                                                       style={{width: '150px', height: '170px', 
                                                               border: '1px solid gray', borderRadius: '47%',
                                                               justifyItems: 'center', textAlign: 'center',   objectFit: "cover",}}
                                                       onChange={() => setNewJoin(prev => ({
                                                                 ...prev,  // Copy the previous state
                                                                 imageprofile: previewFiles[0] // Update only the countryCode with the selected country's code
                                                             }))}
                                                                /> } 
                                   </div> 
                                   <div style={{display: 'flex',
                                               justifyContent: 'center',  alignItems: 'center' }}>
                                        <form onSubmit={handleFileUpload}>
                                            <input type="file" multiple onChange={handleFileChange} name='image'/>
                                            <button type="submit" style={{cursor: 'pointer', border: '1px solid gray', borderRadius:'2px',
                                                                          background: previewFiles[0] ? '#2b5cf1' : '#c5c2c288',
                                                                          color: previewFiles[0] ? '#fff' : '#000'}}> 
                                                 Upload
                                            </button>
                                         
                                        </form>
                                        
                                   </div>
 
                               
 
                                  {message && <div style={{display: 'flex', justifyContent: 'center', 
                                                           alignItems: 'center'}}>
                                                  <div style={{ height: '45px', borderRadius: '7px', marginTop: '13px',
                                                                border: '0.6px solid', display: 'flex', justifyContent: 'center', 
                                                                alignItems: 'center', padding: '0px 20px', background: '#38f320b3'}}>
                                                                  <p>{message}</p></div>
                                                 
                                              </div> }      
 
                         </div>
                       
                     </div>
                   } 
 
 {/* Activate the Storage image Upload */}
 { activateStorageImg &&
                     <div>
                             <div ref={containerRef}
                                  style={{ height: '370px',
                                    margin: '0 auto',
                                    overflow: 'auto',
                                    marginBottom: '10px',
                                    display: 'flex',
                                    flexWrap: 'wrap', // Ensures images wrap correctly in rows
                                    gap: '10px', // Optional: adds spacing between images
                                    // width: '900px',
                                    }}>
                                 {previewFiles.map((file, index) => (
                                     <img key={index} 
                                          src={file} 
                                          alt={`Preview ${index}`} 
                                          id='card-imageContainer' 
                                          style={{  width: containerRef !== null ? "200px" : imageWidth,  flex: '1 1 auto',
                                                    transition: 'witdh 0.3s ease-in-auto',
                                                    height: '130px',   objectFit: "cover",}}
                                           />
                                 ))}
                             </div>
 
                             <div style={{display: 'flex',
                                               justifyContent: 'center',  
                                               alignItems: 'center' }}>
                                        <form onSubmit={handleFileUpload}>
                                            <input type="file" accept="image/*,video/*" multiple onChange={handleFileChange} name='image'/>
                                            <button type="submit" style={{cursor: 'pointer', border: '1px solid gray', borderRadius:'2px',
                                                                          background: previewFiles.length > 0 ? '#2b5cf1' : '#c5c2c288',
                                                                          color: previewFiles.length > 0  ? '#fff' : '#000'}}> 
                                                 Upload
                                            </button>
                                         
                                        </form>
                                        
                                   </div>
 
                               
 
                                  {message && <div style={{display: 'flex', justifyContent: 'center', 
                                                           alignItems: 'center'}}>
                                                  <div style={{ height: '45px', borderRadius: '7px', marginTop: '13px',
                                                                border: '0.6px solid', display: 'flex', justifyContent: 'center', 
                                                                alignItems: 'center', padding: '0px 20px', background: '#38f320b3'}}>
                                                                  <p>{message}</p></div>
                                                 
                                              </div> }  
                         </div>
                          }
 
 
 
 {/* Activate the About selection */}
  {activateAbout &&
       <div style={{ display: 'flex', justifyContent: 'center',  padding: '20px 20px',
                   alignItems: 'center', flexWrap: 'wrap', gap: '20px', cursor: 'pointer'}}>
          <textarea className="textarea_Join" 
                    placeholder="Enter your review ..." 
                    onChange={(e) => setNewJoin(prev => ({
                     ...prev, // Copy the previous state
                     about:  e.target.value // Update only the countryCode with the selected country's code
                 }))} ></textarea>
       </div>}
 {/* Activate the location selection */}
 {activateLocation &&
      <div >
                     <div style={{padding: '10px 0px', display: 'flex', justifyContent: 'center',
                              alignItems: 'center', backgroundColor: '#0e27c9'}}>
                       <input type='text' 
                              placeholder='Input your country'
                              style={{width: '300px', fontSize: '16px', 
                               padding: '3px', outline:'none'}} 
                              onChange={(e) => setCountryFilter(e.target.value)} />
                     </div>
 
                     {mapCountryFilter && 
                      <div 
                      style={{ display: 'flex', justifyContent: 'center',  padding: '10px 10px', height: filteredCities.length > 0 ? '0px': '347px', overflow: 'auto',
                       alignItems: 'center', flexWrap: 'wrap', gap: '15px', cursor: 'pointer'}}
                                    >
                       {mapCountryFilter.map((a, b)=> {
                         return(
                           <div key={b} style={{display: 'block',textAlign: 'center', justifyContent: 'center',  alignItems: 'center',
                             width: '120px', border: '1px solid', padding: '4px 5px',
                             borderRadius: '30px', 
                             overflow: 'hidden', 
                             whiteSpace: 'nowrap', 
                             textOverflow: 'ellipsis'}}
                             onClick={(e)=> getCitiesCoutries(a)}
                             >{a}</div>
                         )
                         })}
                     </div>}
                     {filteredCities.length > 0  && 
                         <div style={{  display: 'flex', justifyContent: 'center',alignItems: 'center',  padding: '20px 20px',
                           flexWrap: 'wrap',  cursor: 'pointer', gap: '10px',  }}>
                             {filteredCities.map((a, t)=> {
                               return(
                                 <div key={t} style={{display: 'block',textAlign: 'center', justifyContent: 'center',  alignItems: 'center',
                                   width: '120px', border: '1px solid', padding: '4px 5px',
                                   borderRadius: '30px', 
                                   overflow: 'hidden', 
                                   whiteSpace: 'nowrap', 
                                   textOverflow: 'ellipsis'}}
                                   onClick={(e)=> setNewJoin((prev)=> ({
                                     ...prev,
                                     location: a
                                   }),  setCountryFilter(''))}
                                   
                                   >{a}</div>
                               )
                             })
                                  }
 
                         </div> }
                    
 
       </div>}
 
 {/* Activate the original country selection */}
 {activateOrignialCountry && 
      <div >
                      <div style={{padding: '10px 0px', display: 'flex', justifyContent: 'center',
                              alignItems: 'center',backgroundColor: '#0e27c9'}}>
                       <input type='text' 
                              placeholder='Input your country'
                              style={{width: '300px', fontSize: '16px', 
                               padding: '3px', outline:'none'}} 
                              onChange={(e) => setCountryFilter(e.target.value)} />
                     </div>
                     {originalCountryFilter && 
                      <div style={{  display: 'flex', justifyContent: 'center',alignItems: 'center', 
                        padding: '10px 10px', height: '347px', overflow: 'auto',
                       flexWrap: 'wrap',  cursor: 'pointer', gap: '15px',  }}>
                       {originalCountryFilter.map((mapCountry, f)=> {
                         return(
                           <div key={f} style={{display: 'block',textAlign: 'center', justifyContent: 'center',  alignItems: 'center',
                             width: '120px', border: '1px solid', padding: '4px 5px',
                             borderRadius: '30px', 
                             overflow: 'hidden', 
                             whiteSpace: 'nowrap', 
                             textOverflow: 'ellipsis'}}
                             onClick={(e)=> setNewJoin((prev)=> ({
                               ...prev,
                               originalcountry: mapCountry
                             }), setCountryFilter(''))}
                             >{mapCountry}</div>
                         )
                         })}
                     </div>}
 
                   </div>}
 {/* Activate the activities selection */}
 {activateActivities && <div>
            <div style={{ display: 'flex', justifyContent: 'center',alignItems: 'center', 
                        padding: '5px 5px',  flexWrap: 'wrap',  cursor: 'pointer', height: '107px',
                         gap: '10px', backgroundColor: '#0e27c9' }}>
                   {Object.keys(activities).map((f, m)=>{
                         return(
                           <div key={m} style={{display: 'flex', justifyContent: 'center',  alignItems: 'center',
                             width: '120px', border: '1px solid', padding: '4px', background:'#fff',
                             borderRadius: '30px'}}
 
                             onClick={() => getFilterActivities(f)} 
                             >{f}</div>
                         )
                   })}
             </div>
 
             {
               filterActivities.length > 0 && 
                  <div style={{ display: 'flex', justifyContent: 'center',alignItems: 'center', 
                   padding: '20px 5px',  flexWrap: 'wrap', cursor: 'pointer', gap: '20px' }} >
                     {filterActivities.map((act, k)=> {
                       return(
                         <div key={k} style={{display: 'block',textAlign: 'center', justifyContent: 'center',  alignItems: 'center',
                           width: '120px', border: '1px solid', padding: '4px 5px',
                           borderRadius: '30px', 
                           overflow: 'hidden', 
                           whiteSpace: 'nowrap', 
                           textOverflow: 'ellipsis'}}
                           onClick={(e)=> setNewJoin((prev) => ({...prev, activities:!prev.activities.includes(act) ? [...prev.activities, act] : prev.activities})) }  
                           >{act}</div>
                       )
                     })}
                  </div>
             }
          
          </div> }
           </div> 
           
          
         </div>
 
 
 
         {(newJoin.imageprofile || newJoin.storageImage[0] ) && (
     <div
         style={{
             border: "0.5px solid",
             borderLeft: "none",
             borderRight: "none",
             borderTop: "none",
             padding: "5px",
             display: "flex",
             overflowX: "auto",
             alignItems: "center"
         }}
     >
         {/* Profile Image */}
         {newJoin.imageprofile && (
             <div style={{ width: "160px", marginRight: "10px" }}>
                 <img
                     src={newJoin.imageprofile}
                     style={{ width: "160px", height: "150px", borderRadius: "4px",   objectFit: "cover", }}
                     alt="imageProfile"
                 />
             </div>
         )}
 
         {/* Additional Images */}
         {newJoin.storageImage && (
             <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                 {newJoin.storageImage.map((file, index) => (
                     <img
                         key={index}
                         src={file}
                         alt={`Preview ${index}`}
                         style={{
                             width: "160px",
                             height: "110px",
                             objectFit: "cover",
                             borderRadius: "4px"
                         }}
                     />
                 ))}
             </div>
         )}
     </div>
 )}
 
 
        
     </div>
     )
}
export default  NewJoiner;