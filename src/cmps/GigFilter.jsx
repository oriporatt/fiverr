import { useState, useEffect } from 'react'
import MarkV from '../assets/svgs/markV.svg?react'
import DropDown from '../assets/svgs/DropDown.svg?react'
import Checked from '../assets/svgs/Checked.svg?react'
import Unchecked from '../assets/svgs/Unchecked.svg?react'
import { GigFilterCategory } from './GigFilterCategory'
import { GigFilterSeller } from './GigFilterSeller'
import { GigFilterBudget } from './GigFilterBudget'
import { GigFilterDeliveryTime } from './GigFilterDeliveryTime'

import { gigService } from '../services/gig/index'

export function GigFilter({ filterBy, onSetFilterBy,
                            gigsLength,closeWindow }) {
    
    // structuredClone(filterBy)
    const [ filterToEdit, setFilterToEdit ] = useState(filterBy)
    
    //update when store filter changed
    useEffect(() => {
        setFilterToEdit(filterBy)
    }, [filterBy])

    //sort:
    const [sortByField,setSortByField] = useState('price')
    const [sortByDirection,setSortByDirection] = useState(1)
    const [showSortByMenu,setShowSortByMenu] = useState(false)

    useEffect(() => {
        const newSort=
            {
            sortField: sortByField,
            sortDir:sortByDirection
            }
            //update local
            onUpdateFilterLocalSort(newSort)

        //update global
        onSetFilterBy(newSort)

    }, [sortByField,sortByDirection])


    let sortByTitle 
    switch (sortByField){
        case 'price':
            sortByTitle= 'Budget'
            break
        case 'daysToMake':
            sortByTitle= 'Delivery Time'
            break
    }

    function toggleSortMenu(){
        setShowSortByMenu((prevState)=>!prevState)
    }

    function onClickSortBy(field){
        setSortByField(field)
        setShowSortByMenu(false)
    }
    
    // open modal states
    const [filterModalOpen,setFilterModalOpen] = useState('')

    function onSetFilterModalOpen(categoryClicked){
        setFilterModalOpen((lastState)=>{
            if (categoryClicked===lastState){
                return('')
            }else{
                return(categoryClicked)
            }
        })
    }

    //make gray labels
    let outputLabels
    function makeCategoriesLabels(){
        outputLabels=filterBy.categoriesArray
            .filter(item=>(item.active===true))
            .map(item=>item.category)
    }
    
    makeCategoriesLabels()

    let budgetLabel
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
    budgetLabel=calcStringText(
        filterBy.filterPriceGroup,
        filterBy.minPrice,
        filterBy.maxPrice,
    )


    // update store and states functions

    function onUpdateFilterLocal(field,value){
        setFilterToEdit({ ...filterToEdit, [field]: value })
    }

    function onUpdateFilterLocalSort(newSortBy){
        setFilterToEdit({ ...filterToEdit, ...newSortBy })
    }


    function onUpdateFilterStore(){
        
        onSetFilterBy({ ...filterBy, ...filterToEdit })
        setFilterModalOpen('')
    }







    function resetFilter() {
        onSetFilterBy({
            txt:'',
            categoriesArray: gigService.uncheckedFilterArray, 
            deliveryMaxTime: 'anytime', 
            maxPrice: '',
            minPrice:'',
            filterPriceGroup: '',
            sellerRate:'',
            sellerLevels:[],
            sortDir:1,
            sortField:'price',
         })

    }
   


    return <section className="gig-filter">

            <h3>Results for <span className='results-for'>{filterBy.txt}</span> </h3>

            <div className='filter-buttons'>
                <div className='filter-button-template btn-category-filter'>
                        <div className='btn-design'
                        onClick={()=>onSetFilterModalOpen('category')}>
                            <p>Category</p>
                            <DropDown/>  
                        </div>
                        {filterModalOpen==='category'&&
                        <GigFilterCategory
                            filterToEdit={filterToEdit}
                            setFilterToEdit={setFilterToEdit}
                            filterBy={filterBy}
                            onSetFilterBy={onSetFilterBy}
                            setFilterModalOpen={setFilterModalOpen}
                            onUpdateFilterStore={onUpdateFilterStore}
                        />}
  
                </div>

                <div className='filter-button-template seller-details'>
                    <div className='btn-design'
                        onClick={()=>onSetFilterModalOpen('seller')}>
                            <p>Seller details</p>
                            <DropDown/>  
                    </div>
                    {filterModalOpen==='seller'&&
                        <GigFilterSeller
                            filterToEdit={filterToEdit}
                            setFilterToEdit={setFilterToEdit}
                            filterBy={filterBy}
                            onSetFilterBy={onSetFilterBy}
                            setFilterModalOpen={setFilterModalOpen}
                            onUpdateFilterStore={onUpdateFilterStore}
                        />}
                </div>

                <div className='filter-button-template budget'>
                    <div className='btn-design'
                        onClick={()=>onSetFilterModalOpen('budget')}>
                            <p>Budget</p>
                            <DropDown/>
                    </div>
                    {filterModalOpen==='budget'&&
                        <GigFilterBudget
                            filterToEdit={filterToEdit}
                            setFilterToEdit={setFilterToEdit}
                            filterBy={filterBy}
                            onSetFilterBy={onSetFilterBy}
                            setFilterModalOpen={setFilterModalOpen}
                            onUpdateFilterStore={onUpdateFilterStore}
                        />}
                </div>


                <div className='filter-button-template delivery-time'>


                    <div className='btn-design'
                        onClick={()=>onSetFilterModalOpen('deliveryTime')}>
                            <p>Delivery Time</p>
                            <DropDown/>
                    </div>
                    {filterModalOpen==='deliveryTime'&&
                        <GigFilterDeliveryTime
                            filterToEdit={filterToEdit}
                            setFilterToEdit={setFilterToEdit}
                            filterBy={filterBy}
                            onSetFilterBy={onSetFilterBy}
                            setFilterModalOpen={setFilterModalOpen}
                            onUpdateFilterStore={onUpdateFilterStore}
                        />}
                </div>

            </div>
            

            {/* filter tags */}
            <div className='filter-tags'>
                {outputLabels.length!==0&&
                    <ul className='labels-list'>{outputLabels.map(label=>(
                        <li key={label}>
                            <span className='label-filter'>{label}</span>
                        </li>))}
                    </ul>}

                {(filterBy.sellerLevels.length>0||filterBy.sellerRate)&&
                <ul className='labels-list'>{filterBy.sellerLevels.map(level=>(
                    <li key={level}>
                        <span className='label-filter'>{level}</span>
                    </li>))}
                    {filterBy.sellerRate&&<p className='stars'>{'⭐'.repeat(filterBy.sellerRate)}{filterBy.sellerRate<5? '+':''}</p>}
                </ul>}

                {filterBy.filterPriceGroup&&
                <ul className='labels-budget'>
                    <li className='label-filter'><p className='budget-label-p'>{budgetLabel}</p></li>
                </ul>}

                {filterBy.deliveryMaxTime!=='anytime'&&
                <ul className='labels-delivery-time'>
                    <li className='label-filter'><p className='delivery-time-p'>Up to {filterBy.deliveryMaxTime===1? '24H':filterBy.deliveryMaxTime+' days'} </p></li>
                </ul>}
            </div>
            
            
             {/* buttom menu sort */}
            <div className='bottom-menu'>
                <h3 className='results-num'>{gigsLength} results</h3>
                <div className='sort-by-menu'>
                    <label>Sort by: <span className='sort-by-title' onClick={toggleSortMenu}>{sortByTitle}</span>
                        {showSortByMenu&&
                            <div className='sort-by-modal'>
                                <label onClick={()=>onClickSortBy('price')}>
                                    {(sortByField==='price')&&<span className='mark-v'><MarkV/></span>}
                                    <span className='title'>Budget</span>
                                </label>
                                <label onClick={()=>onClickSortBy('daysToMake')}>
                                    {(sortByField==='daysToMake')&&<span className='mark-v'><MarkV/></span>}
                                    <span className='title'>Delivery Time</span>
                                </label>
                                
                            </div>}
                    </label>
                </div>
            </div>


            <button 
                className="btn-clear" 
                onClick={resetFilter}>Reset Filter
            </button>




    </section>
}