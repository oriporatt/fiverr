const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId } from '../util.service'

import { gigService as local } from './gig.service.local'
// import { gigService as remote } from './car.service.remote'

function getEmptyCar() {
	return {
		vendor: makeId(),
		speed: getRandomIntInclusive(80, 240),
		msgs: [],
	}
}


//filters params:
const sellerLevels=['basic','standard','premium']

const sellerRates=[
                    '⭐+',
                    '⭐⭐+',
                    '⭐⭐⭐+',
                    '⭐⭐⭐⭐+',
                    '⭐⭐⭐⭐⭐',
                    ]

const budgetList=[
                    {name:'Value',minPrice:'', maxPrice:100},
                    {name:'Mid-range',minPrice:100, maxPrice:200},
                    {name:'High-end',minPrice:200, maxPrice:''},
                    {name:'Custom',minPrice:'', maxPrice:''}

                ]

                
const deliveryTimeList=[
    {title:'Express 24H',value:1},
    {title:'Up to 3 days',value:3},
    {title:'Up to 7 days',value:7},
    {title:'Anytime',value:'anytime'},

]


 
const uncheckedFilterArray =local.categories.map(category=>{
    return (
        {
        category: category,
        active:false,
        })
})

function getDefaultFilter() {
    return {
        txt: '',
        categoriesArray:uncheckedFilterArray,
        minPrice:'',
        maxPrice: '',
        filterPriceGroup: '',
        deliveryMaxTime:'anytime',
        sellerRate:'',
        sellerLevels:[],
        sortField: '',
        sortDir: '',
    }
}

const service = VITE_LOCAL === 'true' ? local : local //remote
export const gigService = { getEmptyCar, getDefaultFilter,
    uncheckedFilterArray,sellerLevels, sellerRates,budgetList,deliveryTimeList,
    ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.carService = gigService
