import { useState, useEffect } from 'react'
import MarkV from '../assets/svgs/markV.svg?react'
import DropDown from '../assets/svgs/DropDown.svg?react'
import Checked from '../assets/svgs/Checked.svg?react'
import Unchecked from '../assets/svgs/Unchecked.svg?react'

import { gigService } from '../services/gig/index'

export function GigFilterSeller({ filterToEdit,
                                    setFilterToEdit,
                                    filterBy,
                                    onSetFilterBy,                                    
                                    setFilterModalOpen,
                                    onUpdateFilterStore }) {



    // Seller filter
    

    function toggleSellerLevelCheckbox(levelInput){
        const updatedSellerLevelList =
            filterToEdit.sellerLevels.includes(levelInput)?
                filterToEdit.sellerLevels.filter(thisLevel=>thisLevel!==levelInput)
                :
                [...filterToEdit.sellerLevels,levelInput]
        setFilterToEdit({
            ...filterToEdit,
            sellerLevels: updatedSellerLevelList
        })

    }

    function toggleSellerRateCheckbox(newRate){
        setFilterToEdit({
            ...filterToEdit,
            sellerRate: newRate
        })

    }




    function resetFilterSeller(){

        onSetFilterBy({ 
            ...filterBy,
            ...filterToEdit,
            sellerLevels: [],
            sellerRate:''
         })
        setFilterModalOpen('')


    }
    console.log(filterToEdit)

    return <section className="gig-seller">


                        <div className='seller-categories-modal'>
                            <h3>Seller Level</h3>
                            <ul >
                                {gigService.sellerLevels.map((level,idx)=>(
                                    <li key={idx}>
                                            {filterToEdit.sellerLevels.includes(level)?
                                                <Checked className='checked' onClick={()=>toggleSellerLevelCheckbox(level)}/>
                                                :<Unchecked className='unchecked' onClick={()=>toggleSellerLevelCheckbox(level)}/>}
                                        <p>{level.charAt(0).toUpperCase()+level.slice(1).toLowerCase()}</p>
                                    </li>
                                ))}
                            </ul>

                            <h3>Seller Rate</h3>
                            <ul >
                                {gigService.sellerRates.map((rateIndex,idx)=>(
                                    <li key={idx}>
                                        {filterToEdit.sellerRate?
                                            filterToEdit.sellerRate<=(idx+1)?
                                                <Checked className='checked' onClick={()=>toggleSellerRateCheckbox(idx+1)}/>
                                                :<Unchecked className='unchecked' onClick={()=>toggleSellerRateCheckbox(idx+1)}/>
                                        :
                                            <Unchecked className='unchecked' onClick={()=>toggleSellerRateCheckbox(idx+1)}/>}
                                        <p>{rateIndex}</p>
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