import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadGig } from '../store/actions/gig.actions'

export function GigDetails() {

  const {gigId} = useParams()
  const gig = useSelector(storeState => storeState.gigModule.gig)

  useEffect(() => {
    loadGig(gigId)
  }, [gigId])

//   async function onAddCarMsg(carId) {
//     try {
//         await addCarMsg(carId, 'bla bla ' + parseInt(Math.random()*10))
//         showSuccessMsg(`Car msg added`)
//     } catch (err) {
//         showErrorMsg('Cannot add car msg')
//     }        

// }

  return (
    <section className="gig-details">
      <Link to="/gig">Back to list</Link>
      {gig && <div>
        <h1>{gig.title}</h1>
        <h4>${gig.price}</h4>
        {/* <pre> {JSON.stringify(car, null, 2)} </pre> */}
      </div>
      }
      {/* <button onClick={() => { onAddCarMsg(car._id) }}>Add car msg</button> */}

    </section>
  )
}