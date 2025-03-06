import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { gigService } from '../services/gig'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadGig } from '../store/actions/gig.actions'

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
      level='Level 1 ◆◇◇'
    } else if (gig.owner.level==='standard'){
      level='Level 2 ◆◆◇'
    } else if (gig.owner.level==='premium'){
      level='Level 3 ◆◆◆'
    }else{
      level=gig.owner.level
    }
  }
  if (!gig || gig._id!==gigId) return <p>Loading...</p> //when loading or swtichng gig

  return (
    <section className="gig-details">
      <Link to="/gig">Back to list</Link>
      {gig && <div className='gig-details-div'>
        <h1 className='gig-title'>{gig.title}</h1>
        <div className='owner-details-general'>
                <img  src={gig.owner.imgUrl}/>
                <div className='owner-details-data'>
                  <div className='name-level'>
                    <h5>{gig.owner.fullname}</h5>
                    <h6>{level}</h6>
                  </div>
                  <p>{repeatIcon('★',rateInt)} {gig.owner.rate} </p>
                </div>

        </div>
        <h4>${gig.price}</h4>
      </div>
      }
      {/* <button onClick={() => { onAddCarMsg(car._id) }}>Add car msg</button> */}

    </section>
  )
}