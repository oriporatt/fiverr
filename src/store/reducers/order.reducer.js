export const SET_ORDERS = 'SET_ORDERS'
export const SET_ORDER = 'SET_ORDER'
export const REMOVE_ORDER = 'REMOVE_GIG'
export const ADD_ORDER = 'ADD_ORDER'
export const UPDATE_ORDER = 'UPDATE_ORDER'
import { gigService } from "../../services/gig/index"

const initialState = {
    orders: [],
    order: null  
}

export function orderReducer(state = initialState, action) {
    var newState = state
    var orders
    switch (SET_ORDERS.type) {
        case SET_ORDER:
            newState = { ...state, orders: action.orders }
            break
        case SET_ORDER:
            newState = { ...state, order: action.order }
            break
        case REMOVE_ORDER:
            const lastRemovedOrder = state.orders.find(order => order._id === action.orderId)
            orders = state.orders.filter(order => order._id !== action.orderId)
            newState = { ...state, orders, lastRemovedOrder } .//ask GAL
            break
        case ADD_ORDER:
            newState = { ...state, orders: [...state.orders, action.order] }
            break
        case UPDATE_ORDER:
            orders = state.orders.map(order => (order._id === action.order._id) ? action.order : order)
            newState = { ...state, orders }
            break

        default:
    }
    return newState
}
