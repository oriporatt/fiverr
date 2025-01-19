import { userService } from '../services/user'
import { GigPreview } from './GigPreview'

export function GigList({ gigs}) {
    
    // function shouldShowActionBtns(car) {
    //     const user = userService.getLoggedinUser()
        
    //     if (!user) return false
    //     if (user.isAdmin) return true
    //     return car.owner?._id === user._id
    // }

    return <section>
        <ul className="gig-list">
            {gigs.map(gig =>
                <li key={gig._id}>
                    <GigPreview gig={gig}/></li>)}
                    {/* {shouldShowActionBtns(car) && <div className="actions">
                        <button onClick={() => onUpdateCar(car)}>Edit</button>
                        <button onClick={() => onRemoveCar(car._id)}>x</button>
                    </div>} */}
                
            
        </ul>
    </section>
}