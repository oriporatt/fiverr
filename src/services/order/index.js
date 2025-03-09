const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId } from '../util.service'

import { orderService as local } from './order.service.local'
// import { gigService as remote } from './car.service.remote'

// function getEmptyOrder() {
// 	return {
// 		vendor: makeId(),
// 		speed: getRandomIntInclusive(80, 240),
// 		msgs: [],
// 	}
// }



function getDefaultFilter() {
    return {
        clientId: '',
        providerId:''
    }
}

const service = VITE_LOCAL === 'true' ? local : local //remote
export const orderService = { getDefaultFilter,
    ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.orderService = orderService
