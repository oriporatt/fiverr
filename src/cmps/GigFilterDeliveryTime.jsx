import { useState, useEffect } from 'react'

import RadioOff from '../assets/svgs/RadioOff.svg?react'
import RadioOn from '../assets/svgs/RadioOn.svg?react'

import { gigService } from '../services/gig/index'

export function GigFilterDeliveryTime({ filterToEdit,
                                    setFilterToEdit,
                                    filterBy,
                                    onSetFilterBy,                                    
                                    setFilterModalOpen,
                                    onUpdateFilterStore }) {



    // Delivery Time filter
    

   


    function changeRadioButton(newButton){
            setFilterToEdit({
                ...filterToEdit,
                deliveryMaxTime: newButton,
            })
            
    }

    


    
    function resetFilterSeller(){

        onSetFilterBy({ 
            ...filterBy,
            ...filterToEdit,
            deliveryMaxTime: 'anytime',
         })
        setFilterModalOpen('')


    }

    console.log(filterToEdit)
    return <section className="gig-filter-delivery-time">


                        <div className='delivery-time-filter-modal'>
                            
                            <ul >
                                {gigService.deliveryTimeList.map((item,idx)=>(
                                    
                                    <li key={idx}>
                                        {console.log(filterToEdit.deliveryMaxTime)}
                                        {item.value===filterToEdit.deliveryMaxTime?
                                        <RadioOn className='radio-checked' onClick={()=>changeRadioButton(item.value)}/>
                                        :<RadioOff className='radio-unchecked' onClick={()=>changeRadioButton(item.value)}/>
                                        }
                                        <p>{item.title}</p>
                                    </li>
                                ))}
                            </ul>

                        </div>

                        <div className='bottom-buttons'>
                                <button className='clr-all-btn' onClick={resetFilterSeller}>Clear All</button>
                                <button className='apply-btn' onClick={onUpdateFilterStore}>Apply</button>
                        </div> 

    </section>
}