import React from 'react';
import { useEffect } from 'react'
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

export function GigDetails() {

  const {gigId} = useParams()
  const gig = useSelector(storeState => storeState.gigModule.gig)

  useEffect(() => {
    loadGig(gigId)
  }, [gigId])

  function roundRate(rate){
    return Math.round(rate)
  }

  function repeatIcon (icon, times) {
    return icon.repeat(times); 
  } 

  let rateInt 
  let level
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

    gig.tags
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
     
      {/* <Link to="/gig">Back to list</Link> */}
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
        <h4>${gig.price}</h4>
      </div>
      }
      {/* <button onClick={() => { onAddCarMsg(car._id) }}>Add car msg</button> */}

    </section>
  )
}