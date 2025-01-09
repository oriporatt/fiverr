import { gigService } from '../../services/gig/gig.service.local'
import { store } from '../store'
import { ADD_GIG, REMOVE_GIG,SET_GIG,SET_GIGS,UPDATE_GIG } from '../reducers/gig.reducer'

export async function loadGigs() { //(filterBy)
    try {
        const gigs = await gigService.query() //(filterBy)
        store.dispatch(getCmdSetGigs(gigs))
    } catch (err) {
        console.log('Cannot load gigs', err)
        throw err
    }
}

export async function loadGig(gigId) {
    try {
        const gig = await carService.getById(gigId)
        store.dispatch(getCmdSetGig(gig))
    } catch (err) {
        console.log('Cannot load gig', err)
        throw err
    }
}


export async function removeGig(gigId) {
    try {
        await carService.remove(gigId)
        store.dispatch(getCmdRemoveGig(gigId))
    } catch (err) {
        console.log('Cannot remove gig', err)
        throw err
    }
}

export async function addGig(gig) {
    try {
        const savedGig = await carService.save(gig)
        store.dispatch(getCmdAddGig(savedGig))
        return savedGig
    } catch (err) {
        console.log('Cannot add gig', err)
        throw err
    }
}

export async function updateGig(gig) {
    try {
        const savedGig = await carService.save(gig)
        store.dispatch(getCmdUpdateGig(savedGig))
        return savedGig
    } catch (err) {
        console.log('Cannot save gig', err)
        throw err
    }
}

// export async function addCarMsg(carId, txt) {
//     try {
//         const msg = await carService.addCarMsg(carId, txt)
//         store.dispatch(getCmdAddCarMsg(msg))
//         return msg
//     } catch (err) {
//         console.log('Cannot add car msg', err)
//         throw err
//     }
// }

// Command Creators:
function getCmdSetGigs(gigs) {
    return {
        type: SET_GIGS,
        gigs
    }
}
function getCmdSetGig(gig) {
    return {
        type: SET_GIG,
        gig
    }
}
function getCmdRemoveGig(gigId) {
    return {
        type: REMOVE_GIG,
        gigId
    }
}
function getCmdAddGig(gig) {
    return {
        type: ADD_GIG,
        gig
    }
}
function getCmdUpdateGig(gig) {
    return {
        type: UPDATE_GIG,
        gig
    }
}
// function getCmdAddCarMsg(msg) {
//     return {
//         type: ADD_CAR_MSG,
//         msg
//     }
// }

// unitTestActions()
async function unitTestActions() {
    await loadCars()
    await addCar(carService.getEmptyCar())
    await updateCar({
        _id: 'm1oC7',
        title: 'Car-Good',
    })
    await removeCar('m1oC7')
    // TODO unit test addCarMsg
}
