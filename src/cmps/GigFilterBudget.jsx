import { useState, useEffect } from 'react'

import RadioOff from '../assets/svgs/RadioOff.svg?react'
import RadioOn from '../assets/svgs/RadioOn.svg?react'

import { gigService } from '../services/gig/index'

export function GigFilterBudget({ filterToEdit,
                                    setFilterToEdit,
                                    filterBy,
                                    onSetFilterBy,                                    
                                    setFilterModalOpen,
                                    onUpdateFilterStore }) {



    // Budget filter
    
    const [ customMaxPrice, setCustomMaxPrice ] = useState(filterBy.maxPrice)

    useEffect(() => {
        if (filterToEdit.filterPriceGroup==='custom'){
            setFilterToEdit({
                ...filterToEdit,
                maxPrice: customMaxPrice,
                minPrice:'',
            })
        }
    }, [customMaxPrice])
        


    function changeRadioButton(newGroup){
        if (newGroup.name.toLowerCase()!=='custom'){
            setFilterToEdit({
                ...filterToEdit,
                filterPriceGroup: newGroup.name.toLowerCase(),
                minPrice: newGroup.minPrice,
                maxPrice: newGroup.maxPrice,
            })
        }else{
            setFilterToEdit({
                ...filterToEdit,
                filterPriceGroup: 'custom',
                minPrice: '',
                maxPrice: customMaxPrice,
            })
            
        }

    }



    
    function resetFilterSeller(){

        onSetFilterBy({ 
            ...filterBy,
            ...filterToEdit,
            maxPrice: '',
            minPrice:'',
            filterPriceGroup: '',
         })
        setFilterModalOpen('')


    }

    function calcStringText(groupName,minPrice,maxPrice){
        if (minPrice==='' && maxPrice){
            return `Under ${maxPrice}$`
        }else if (minPrice && maxPrice){
            return `${minPrice}$-${maxPrice}$`
        }else if (minPrice && maxPrice==='') {
            return `${minPrice}$ & Above`
 
        }else if (groupName==='custom'){
            return ""
        }
    }


    function onChangeInput(event) {
		const searchValue = event.target.value;
		setCustomMaxPrice(searchValue)
	}

    return <section className="gig-filter-category">


                        <div className='budget-filter-modal'>
                            <h3>Budget</h3>
                            <ul >
                                {gigService.budgetList.map((group,idx)=>(
                                    <li key={idx}>
                                        {group.name.toLowerCase()===filterToEdit.filterPriceGroup?
                                        <RadioOn className='radio-checked' onClick={()=>changeRadioButton(group)}/>
                                        :<RadioOff className='radio-unchecked' onClick={()=>changeRadioButton(group)}/>
                                        }
                                        <p>{group.name} <span>{calcStringText(group.name,group.minPrice,group.maxPrice)}</span></p>
                                    </li>
                                ))}
                            </ul>
                            <h4>Up to</h4>
                            <input 
                                type="number"
                                name="customMaxPrice"
                                value={customMaxPrice}
                                placeholder="$"
                                onChange={onChangeInput}
                            />



                           

                        </div>

                        <div className='bottom-buttons'>
                                <button className='clr-all-btn' onClick={resetFilterSeller}>Clear All</button>
                                <button className='apply-btn' onClick={onUpdateFilterStore}>Apply</button>
                        </div> 

    </section>
}