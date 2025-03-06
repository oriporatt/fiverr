// ImageCarousel.jsx
import { useState } from 'react';
import Dot from '../assets/svgs/dot.svg?react'
import LeftArrow from '../assets/svgs/leftArrow.svg?react'
import RightArrow from '../assets/svgs/rightArrow.svg?react'

import { useNavigate } from 'react-router-dom';


export function GigPreviewCarrousel({ images,gigId=undefined }) { //images is the array of images to show in index and details. gigId only relevant for index to navigate to the gig once click on the picture only
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  let navBarList =[]

  function navigateToGig(gigId){
    navigate(`/gig/${gigId}`)
  }


  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  function calcNavBar(){
    if (images.length<=5){
      navBarList = Array(images.length).fill('B');
      navBarList[currentIndex]='W'
    }else{
      navBarList = ['W','B','B','B','s']
      if (currentIndex<4 && currentIndex>0){
        navBarList[0]='B'
        navBarList[currentIndex]='W'
      }else if (currentIndex>=4){
        navBarList[0]='s'
        if (currentIndex+2===images.length){ 
          navBarList[4]='B'
          navBarList[3]='W'
        }else if (currentIndex+1===images.length){
          navBarList[4]='W'
          navBarList[3]='B'
        }else{
          navBarList[3]='W'
        }
      }
    }


  }
  calcNavBar()


  return (
    <div className="gig-preview-carrousel">
      <div
        className="carousel-card"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, idx) => (

            <img 
            onClick={gigId ? () => navigateToGig(gigId) : undefined}  
            key={idx} src={img} alt={`Image ${idx + 1}`} 
            className="carousel-image" />
          // <img key={idx} src={img} alt={`Image ${idx + 1}`} className="carousel-image" />
        ))}
      </div>
      
      <div className='status-nav-bar'>
        <ul>
        {navBarList.map((item, idx) => (
          <li key={idx}>
            {item==='B'&&<Dot className='big-dot'/>}
            {item==='W'&&<Dot className='white-dot'/>}
            {item==='s'&&<Dot className='small-dot'/>}


          </li>  ))}
        </ul>        
      </div>

      {/* <button className="carousel-button left" onClick={goToPrevious}>{'<'}</button> */}
      <button className="carousel-button left" onClick={goToPrevious}><LeftArrow/></button>
      <button className="carousel-button right" onClick={goToNext}><RightArrow/></button>
    </div>
  );
}
    