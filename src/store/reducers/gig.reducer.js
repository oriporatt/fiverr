export const SET_GIGS = 'SET_GIGS'
export const SET_GIG = 'SET_GIG'
export const REMOVE_GIG = 'REMOVE_GIG'
export const ADD_GIG = 'ADD_GIG'
export const UPDATE_GIG = 'UPDATE_GIG'
export const UPDATE_FILTER_BY='UPDATE_FILTER_BY'
// export const ADD_GIG_MSG = 'ADD_GIG_MSG'
import { gigService } from "../../services/gig/index"

const initialState = {
    gigs: [],
    gig: null,
    filterBy: gigService.getDefaultFilter()
    
}

export function gigReducer(state = initialState, action) {
    var newState = state
    var gigs
    var filterBy
    switch (action.type) {
        case SET_GIGS:
            newState = { ...state, gigs: action.gigs }
            break
        case SET_GIG:
            newState = { ...state, gig: action.gig }
            break
        case REMOVE_GIG:
            const lastRemovedGig = state.gigs.find(gig => gig._id === action.gigId)
            gigs = state.gigs.filter(gig => gig._id !== action.gigId)
            newState = { ...state, gigs, lastRemovedGig }
            break
        case ADD_GIG:
            newState = { ...state, gigs: [...state.gigs, action.gig] }
            break
        case UPDATE_GIG:
            cars = state.cars.map(gig => (gig._id === action.gig._id) ? action.gig : gig)
            newState = { ...state, gigs }
            break
        case UPDATE_FILTER_BY:
            let newFilter = action.filterBy
            newFilter=  {...state.filterBy,...newFilter}
            
            newState = { ...state, filterBy: newFilter}
            break
        // case ADD_GIG_MSG:
        //     newState = { ...state, car: { ...state.car, msgs: [...state.car.msgs || [], action.msg] } }
        //     break
        default:
    }
    return newState
}

// unitTestReducer()

// function unitTestReducer() {
//     var state = initialState
//     const car1 = { _id: 'b101', vendor: 'Car ' + parseInt(Math.random() * 10), msgs: [] }
//     const car2 = { _id: 'b102', vendor: 'Car ' + parseInt(Math.random() * 10), msgs: [] }

//     state = carReducer(state, { type: SET_CARS, cars: [car1] })
//     console.log('After SET_CARS:', state)

//     state = carReducer(state, { type: ADD_CAR, car: car2 })
//     console.log('After ADD_CAR:', state)

//     state = carReducer(state, { type: UPDATE_CAR, car: { ...car2, vendor: 'Good' } })
//     console.log('After UPDATE_CAR:', state)

//     state = carReducer(state, { type: REMOVE_CAR, carId: car2._id })
//     console.log('After REMOVE_CAR:', state)

//     const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
//     state = carReducer(state, { type: ADD_CAR_MSG, carId: car1._id, msg })
//     console.log('After ADD_CAR_MSG:', state)

//     state = carReducer(state, { type: REMOVE_CAR, carId: car1._id })
//     console.log('After REMOVE_CAR:', state)
// }

