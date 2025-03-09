import { orderService } from '../../services/order'
import { store } from '../store'
import { ADD_ORDER, REMOVE_ORDER,SET_ORDER,SET_ORDERS,UPDATE_ORDER } from '../reducers/order.reducer'

export async function loadOrders(filterBy) { 
    try {
        const orders = await orderService.query(filterBy) 
        store.dispatch( 
            {
            type: SET_ORDERS,
            orders
            })
    } catch (err) {
        console.log('Cannot load orders', err)
        throw err
    }
}

export async function loadOrder(orderId) {
    try {
        const order = await orderService.getById(orderId)
        store.dispatch(
            {
                type: SET_ORDER,
                order
            }
        )
    } catch (err) {
        console.log('Cannot load order', err)
        throw err
    }
}


export async function removeGig(orderId) {
    try {
        await carService.remove(orderId)
        store.dispatch(
            {
                type: REMOVE_ORDER,
                orderId
            }
        )
    } catch (err) {
        console.log('Cannot remove order', err)
        throw err
    }
}

export async function addOrder(order) {
    try {
        const savedOrder = await orderService.save(order)
        store.dispatch(
            {
                type: ADD_ORDER,
                order: savedOrder
            }
        )
        return savedOrder
    } catch (err) {
        console.log('Cannot add order', err)
        throw err
    }
}

export async function updateOrder(order) {
    try {
        const savedOrder = await orderService.save(order)
        store.dispatch(
            {
                type: UPDATE_ORDER,
                savedOrder
            }
        )
        return savedOrder
    } catch (err) {
        console.log('Cannot update order', err)
        throw err
    }
}



