import { useState, useEffect,useRef } from 'react'
import { useSelector } from 'react-redux'

import {  loadGigs } from '../store/actions/gig.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { gigService } from '../services/gig/index'
import { userService } from '../services/user'

import { GigList } from '../cmps/GigList'
// import { CarFilter } from '../cmps/CarFilter'

export function GigIndex() {

    const [ filterBy, setFilterBy ] = useState(gigService.getDefaultFilter())
    const gigs = useSelector(storeState => storeState.gigModule.gigs)

        

    // useEffect(() => {
    //     loadGigs(filterBy)
    // }, [filterBy])

    useEffect(() => {
        loadGigs()
    }, [])

    // async function onRemoveCar(carId) {
    //     try {
    //         await removeCar(carId)
    //         showSuccessMsg('Car removed')            
    //     } catch (err) {
    //         showErrorMsg('Cannot remove car')
    //     }
    // }

    async function onAddCar() {
        const car = gigService.getEmptyCar()
        car.vendor = prompt('Vendor?')
        try {
            const savedCar = await addCar(car)
            showSuccessMsg(`Car added (id: ${savedCar._id})`)
        } catch (err) {
            showErrorMsg('Cannot add car')
        }        
    }

    async function onUpdateCar(car) {
        const speed = +prompt('New speed?', car.speed)
        if(speed === 0 || speed === car.speed) return

        const carToSave = { ...car, speed }
        try {
            const savedCar = await updateCar(carToSave)
            showSuccessMsg(`Car updated, new speed: ${savedCar.speed}`)
        } catch (err) {
            showErrorMsg('Cannot update car')
        }        
    }


    return (
        <main className="gig-index full">
            <div className='main-index main-container'>
                {gigs&&<GigList  gigs={gigs}/>}
                {/* <CarFilter filterBy={filterBy} setFilterBy={setFilterBy} /> */}
                {/* <CarList 
                    cars={cars}
                    onRemoveCar={onRemoveCar} 
                    onUpdateCar={onUpdateCar}/> */}

            </div>
        </main>
    )
}