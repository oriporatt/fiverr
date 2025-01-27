import { useState, useEffect } from 'react'
import MarkV from '../assets/svgs/markV.svg?react'
import DropDown from '../assets/svgs/DropDown.svg?react'
import Checked from '../assets/svgs/Checked.svg?react'
import Unchecked from '../assets/svgs/Unchecked.svg?react'

import { gigService } from '../services/gig/index'

export function GigFilterCategory({ filterToEdit,
                                    setFilterToEdit,
                                    filterBy,
                                    onSetFilterBy,                                    
                                    setFilterModalOpen,
                                    onUpdateFilterStore }) {


    // category filter



    function toggleCategoryCheckbox(category){
        const updatedCategoryFilterArray = filterToEdit.categoriesArray.map((categoryItem) =>
            categoryItem.category === category
                ? { ...categoryItem, active: !categoryItem.active }
                : categoryItem
        );

        setFilterToEdit({
            ...filterToEdit,
            categoriesArray: updatedCategoryFilterArray
        })

    }




    function resetFilterCategory(){

        onSetFilterBy({ 
            ...filterBy,
            ...filterToEdit,
            categoriesArray: gigService.uncheckedFilterArray
         })
        setFilterModalOpen('')


    }


    return <section className="gig-filter-category">


                        <div className='filter-categories-modal'>
                            <h3>Category</h3>
                            <ul >
                                {filterToEdit.categoriesArray.map((categoryItem,idx)=>(
                                    <li key={idx}>
                                        {categoryItem.active?  
                                            <Checked className='checked' onClick={()=>toggleCategoryCheckbox(categoryItem.category)}/>
                                            :<Unchecked className='unchecked' onClick={()=>toggleCategoryCheckbox(categoryItem.category)}/>}
                                        <p>{categoryItem.category}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className='bottom-buttons'>
                                <button className='clr-all-btn' onClick={resetFilterCategory}>Clear All</button>
                                <button className='apply-btn' onClick={onUpdateFilterStore}>Apply</button>
                        </div>

    </section>
}