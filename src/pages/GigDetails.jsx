import React from 'react';
import { useEffect,useState } from 'react'
import { useParams,NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { gigService } from '../services/gig'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadGig } from '../store/actions/gig.actions'
import Home from '../assets/svgs/home.svg?react'
import BlackStar from '../assets/svgs/blackStar.svg?react'
import GrayDiamond from '../assets/svgs/grayDiamond.svg?react'
import BlackDiamond from '../assets/svgs/blackDiamond.svg?react'
import { GigPreviewCarrousel } from '../cmps/GigPreviewCarrousel'


export function GigDetails() {

  const {gigId} = useParams()
  const gig = useSelector(storeState => storeState.gigModule.gig)
  const [orderPackage, setOrderPackage] = useState('Basic')

  useEffect(() => {
    loadGig(gigId)
    window.scrollTo(0, 0); 

  }, [gigId])

  function roundRate(rate){
    return Math.round(rate)
  }



  function updateCloudinaryUrl(url) {
    return url.replace("c_fill,w_400,h_240", "c_fill,w_660,h_400");
}

  let rateInt 
  let level
  let bigImgs
  if (gig){
    rateInt=roundRate(gig.owner.rate)

    if (gig.owner.level==='basic'){
      level='Level 1'
    } else if (gig.owner.level==='standard'){
      level='Level 2'
    } else if (gig.owner.level==='premium'){
      level='Level 3'
    }else{
      level=gig.owner.level
    }
  
    bigImgs= gig.imgs.map(url=>updateCloudinaryUrl(url))
  }
  if (!gig || gig._id!==gigId) return <p>Loading...</p> //when loading or swtichng gig

  return (
    <section className="gig-details">

      <div className='nav-bar-line'>
        
        <ul className="nav-bar-list">
          <li>
            <NavLink className='home-link' to="/">
              <Home/>
            </NavLink>
          </li>
          <li className='slash'>
            /
          </li>
          {gig.tags.map((tag, index) => (
            <React.Fragment key={tag}>
              <li><NavLink to="/gig">{tag}</NavLink></li>
              {index < gig.tags.length - 1 && <li className='slash' key={`${tag}-separator`}>/</li>}
            </React.Fragment>
          ))}
        </ul>
      </div>
      
      <div className='main-layout-gig-details'>

        
        <div className='side-order-menu'>
          <div className='package-chose'>
            <button onClick={()=>setOrderPackage('Basic')} className={orderPackage==='Basic'? 'active-btn':''}>Basic</button>
            <button onClick={()=>setOrderPackage('Standard')} className={orderPackage==='Standard'? 'active-btn':''}>Standard</button>
            <button onClick={()=>setOrderPackage('Premium')} className={orderPackage==='Premium'? 'active-btn':''}>Premium</button>
          </div>

          <div className='package-expand-details'>
            <div className='details-header'>
              <h4>{orderPackage} Package</h4>
              <h2>{gig.price}$</h2>
            </div>
            {(orderPackage.toLowerCase()==='basic')&&<p>{gig.packageDetails.basic}</p>}
            {(orderPackage.toLowerCase()==='standard')&&<p>{gig.packageDetails.standard}</p>}
            {(orderPackage.toLowerCase()==='premium')&&<p>{gig.packageDetails.premium}</p>}
          </div>
        </div>

        {gig && <div className='gig-details-div'>
          <h1 className='gig-title'>{gig.title}</h1>
          <div className='owner-details-general'>
                  <img  src={gig.owner.imgUrl}/>
                  <div className='owner-details-data'>
                    <div className='name-level'>
                      <h5>{gig.owner.fullname}</h5>
                      {(level==='Level 1')&&<div className='owner-level'>
                            <p>{level}</p> <BlackDiamond/> <GrayDiamond/> <GrayDiamond/>
                      </div>}
                      {(level==='Level 2')&&<div className='owner-level'>
                            <p>{level}</p> <BlackDiamond/> <BlackDiamond/> <GrayDiamond/>
                      </div>}
                      {(level==='Level 3')&&<div className='owner-level'>
                            <p>{level}</p> <BlackDiamond/> <BlackDiamond/> <BlackDiamond/>
                      </div>}
                      
                    </div>
                    {/* <p>{repeatIcon('★',rateInt)} {gig.owner.rate} </p> */}
                    <div className='rate'>
                      {Array.from({ length: rateInt}, (_, index) => (
                        <BlackStar key={index} />
                      ))}
                      <p>{gig.owner.rate}</p>
                    </div>

                  </div>

          </div>
          
          <div className="img-container-big">
              <GigPreviewCarrousel images={bigImgs} />
          </div>
          <div className='about-gig'>
            <h4>About This gig</h4>
            <p>{gig.description}</p>

            {gig.aboutGig.title1&&
            <h5>{gig.aboutGig.title1}</h5>}
            
            {gig.aboutGig.p1&&
            <p>{gig.aboutGig.p1}</p>
            }
            
            {gig.aboutGig.title2&&
            <h5>{gig.aboutGig.title2}</h5>}
            
            {gig.aboutGig.p2&&
            <p>{gig.aboutGig.p2}</p>
            }

            {gig.aboutGig.title3&&
            <h5>{gig.aboutGig.title3}</h5>}
            
            {gig.aboutGig.p3&&
            <p>{gig.aboutGig.p3}</p>
            }

          </div>
        </div>
        }

      </div>

     



    </section>
  )
}