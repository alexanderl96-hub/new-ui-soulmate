import React, { useEffect, useState, useRef } from 'react'

import './galery.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Galery = ({setActivateGalery, imagePerfile, imagePosition}) => {
  // const photos = [images, images, images, images, images, images, images,  images, images, images, images]
  const [next, setNext] = useState(0);
  // const [trackPosition, setTrackPosition] = useState(imagePosition)
  const thumbnailRef = useRef(null);
  
  useEffect(() => {
    if (imagePosition > 0) {
      setNext(imagePosition);
    }
  }, [imagePosition]);

  function increment() {
    if (next < imagePerfile.length - 1) {
      setNext(prevNext => {
        const newNext = prevNext + 1;
        scrollThumbnails(newNext);
        return newNext;
      });
    }
  }

  function decrement() {
    if (next > 0) {
      setNext(prevNext => {
        const newNext = prevNext - 1;
        scrollThumbnails(newNext);
        return newNext;
      });
    }
  }
  function scrollThumbnails(newNext) {
    const container = thumbnailRef.current;
    if (container) {
      const thumbnailWidth = 125; // The width of each thumbnail
      const scrollAmount = newNext * thumbnailWidth;
      container.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }
  
  return (
    <div className='main-galery-photos'>
          <div className='galery-navbar'>
               <div><FontAwesomeIcon icon={faHeart}  className='galery-nav-icon-heart'/></div>
               <div onClick={()=> setActivateGalery(false)}>
                    <FontAwesomeIcon icon={faCircleXmark} className='galery-nav-icon-x' />
               </div>
          </div>

          <div className='container-galery-photos'> 
              <div className='container-full-zise'>
                    <div className='container-hold-arrow'
                          onClick={decrement}> 
                           <div >
                              <FontAwesomeIcon icon={faChevronLeft} 
                                        className='container-full-zise-pre' />
                            </div> 
                    </div>

                    <div className='full-size-photos' >
                      {imagePerfile.slice(next, next + 1).map((full, d)=>{
                        return(
                          <img src={full} alt='name' key={d}  
                                />
                        )
                      })}
                       
                    </div>
                    <div className='container-hold-arrow' 
                        onClick={increment}  >
                          <div >
                            <FontAwesomeIcon icon={faChevronRight}
                                          className='container-full-zise-next'
                                          />
                          </div>
                      
                    </div>

              </div> 
              <div className='container-small-size' ref={thumbnailRef}>
                  {imagePerfile.map((space, b)=> {
                    return(
                          <img src={space} alt='name' key={b}
                               id={b}  className='small' 
                               style={{   opacity: (b === next ) ? 1 : 0.3}} />
                    )
                      
                  })}
             </div>

          </div>
           
    </div>
   
  )
}

export default Galery