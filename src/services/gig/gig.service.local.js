
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'
import {saveToStorage,loadFromStorage} from '../util.service'

const STORAGE_KEY = 'gig'

const categories = ['Graphics & Design','Programming & Tech','Digital Marketing',
    'Video & Animation','Writing & Translation','Music & Audio',
    'Business','Finance','AI Services',
    'Personal Growth','Consulting','Photography']

export const gigService = {
    query,
    getById,
    save,
    remove,
    categories,
    // addCarMsg
}
window.cs = gigService

_makeDummyGigs()






// async function query(filterBy = { txt: '', price: 0 }) {
async function query() {

    var gigs = await storageService.query(STORAGE_KEY)
    // const { txt, maxPrice, sortField, sortDir } = filterBy

    // if (txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     cars = cars.filter(car => regex.test(car.vendor) || regex.test(car.description))
    // }
    // if (minSpeed) {
    //     cars = cars.filter(car => car.speed >= minSpeed)
    // }
    // if(sortField === 'vendor' || sortField === 'owner'){
    //     cars.sort((car1, car2) => 
    //         car1[sortField].localeCompare(car2[sortField]) * +sortDir)
    // }
    // if(sortField === 'price' || sortField === 'speed'){
    //     cars.sort((car1, car2) => 
    //         (car1[sortField] - car2[sortField]) * +sortDir)
    // }
    
    // cars = cars.map(({ _id, vendor, price, speed, owner }) => ({ _id, vendor, price, speed, owner }))
    return gigs
}

function getById(carId) {
    return storageService.get(STORAGE_KEY, carId)
}

async function remove(carId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, carId)
}

async function save(car) {
    var savedCar
    if (car._id) {
        const carToSave = {
            _id: car._id,
            price: car.price,
            speed: car.speed,
        }
        savedCar = await storageService.put(STORAGE_KEY, carToSave)
    } else {
        const carToSave = {
            vendor: car.vendor,
            price: car.price,
            speed: car.speed,
            // Later, owner is set by the backend
            owner: userService.getLoggedinUser(),
            msgs: []
        }
        savedCar = await storageService.post(STORAGE_KEY, carToSave)
    }
    return savedCar
}

async function addCarMsg(carId, txt) {
    // Later, this is all done by the backend
    const car = await getById(carId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    car.msgs.push(msg)
    await storageService.put(STORAGE_KEY, car)

    return msg
}


function _makeDummyGigs(){
    let gigs = loadFromStorage(STORAGE_KEY)
    if (!gigs || !gigs.length) {
        gigs = [
        {
            "_id": "i101",
            "title": "I will design your logo",
            "price": 12,
            "owner": {
            "_id": "u101",
            "fullname": "Dudu Da",
            "imgUrl": "url",
            "level": "basic/premium",
            "rate": 4
            },
            "daysToMake": 3,
            "description": "Make unique logo...",
            "imgUrl": "",
            "tags": [
            "logo-design",
            "artisitic",
            "proffesional",
            "accessible"
            ],
            "likedByUsers": ['mini-user'] // for user-wishlist : use $in
        },
        {
            "_id": "i102",
            "title": "I will create a modern website",
            "price": 50,
            "owner": {
            "_id": "u102",
            "fullname": "Sara Green",
            "imgUrl": "url",
            "level": "premium",
            "rate": 5
            },
            "daysToMake": 10,
            "description": "Build a responsive and modern website tailored to your needs.",
            "imgUrl": "",
            "tags": [
            "web-development",
            "responsive",
            "modern",
            "seo-friendly"
            ],
            "likedByUsers": ['mini-user', 'pro-user']
        },
        {
            "_id": "i103",
            "title": "I will write engaging blog posts",
            "price": 20,
            "owner": {
            "_id": "u103",
            "fullname": "Mike Johnson",
            "imgUrl": "url",
            "level": "basic",
            "rate": 3.5
            },
            "daysToMake": 5,
            "description": "Craft unique and engaging blog content for your audience.",
            "imgUrl": "",
            "tags": [
            "content-writing",
            "blogging",
            "engaging",
            "seo-optimized"
            ],
            "likedByUsers": ['user123']
        },
        {
            "_id": "i104",
            "title": "I will design an eye-catching business card",
            "price": 15,
            "owner": {
            "_id": "u104",
            "fullname": "Emily Rose",
            "imgUrl": "url",
            "level": "standard",
            "rate": 4.5
            },
            "daysToMake": 2,
            "description": "Design professional and memorable business cards for your brand.",
            "imgUrl": "",
            "tags": [
            "graphic-design",
            "business-card",
            "branding",
            "creative"
            ],
            "likedByUsers": ['pro-user']
        },
        {
            "_id": "i105",
            "title": "I will edit your videos professionally",
            "price": 30,
            "owner": {
            "_id": "u105",
            "fullname": "John Smith",
            "imgUrl": "url",
            "level": "premium",
            "rate": 5
            },
            "daysToMake": 7,
            "description": "Professional video editing to take your content to the next level.",
            "imgUrl": "",
            "tags": [
            "video-editing",
            "professional",
            "cinematic",
            "engaging"
            ],
            "likedByUsers": ['mini-user', 'user456']
        }
        ]
        
        saveToStorage(STORAGE_KEY, gigs)
    }
}