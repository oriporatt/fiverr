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
  
  let rateIdx 

  if (gig){
    rateIdx=roundRate(gig.owner.rate)
    if (rateIdx>1) {
      rateIdx--
    } else{
      rateIdx=0
    }
  }
  if (!gig || gig._id!==gigId) return <p>Loading...</p> //when loading or swtichng gig

  return (
    <section className="gig-details">
      <Link to="/gig">Back to list</Link>
      {gig && <div className='gig-details-div'>
        <h1 className='gig-title'>{gig.title}</h1>
        <div className='owner-details'>
                <img  src={gig.owner.imgUrl}/>
                <h5>{gig.owner.fullname}</h5>
                <h6>{gig.owner.level}</h6>
                <p>{gigService.sellerRates[rateIdx]} {gig.owner.rate} </p>
                
        </div>
        <h4>${gig.price}</h4>
      </div>
      }
      {/* <button onClick={() => { onAddCarMsg(car._id) }}>Add car msg</button> */}

    </section>
  )
}