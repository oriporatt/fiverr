import { useState, useEffect } from 'react'
import MarkV from '../assets/svgs/markV.svg?react'
import DropDown from '../assets/svgs/DropDown.svg?react'
import Checked from '../assets/svgs/Checked.svg?react'
import Unchecked from '../assets/svgs/Unchecked.svg?react'

import { gigService } from '../services/gig/index'

export function GigFilter({ filterBy, onSetFilterBy,gigsLength }) {
    
    // structuredClone(filterBy)
    const [ filterToEdit, setFilterToEdit ] = useState(filterBy)
    
    //update when store filter changed
    useEffect(() => {
        setFilterToEdit(filterBy)
    }, [filterBy.txt])

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
    

    // category filter
    const [filterModalOpen,setFilterModalOpen] = useState('')
    const uncheckedFilterArray =gigService.categories.map(category=>{
        return (
            {
            category: category,
            active:false,
            })
    })
    const [categoryFilterArray,setCategoryFilterArray] = useState(uncheckedFilterArray)



    useEffect(() => {
        onUpdateFilterLocal('categoriesArray',categoryFilterArray)
    }, [categoryFilterArray])

    
    function onSetFilterModalOpen(categoryClicked){
        setFilterModalOpen((lastState)=>{
            if (categoryClicked===lastState){
                return('')
            }else{
                return(categoryClicked)
            }
        })
        
        
    }

    
    function toggleCategoryCheckbox(category){
        setCategoryFilterArray((lastState)=>
            lastState.map(categoryItem=>{
                if (categoryItem.category===category){
                    return {category,
                            active:!categoryItem.active
                    }
                }else{
                    return categoryItem
                }
            }))

    }

    let outputLabels
    function makeCategoriesLabels(){
        outputLabels=filterBy.categoriesArray
            .filter(item=>(item.active===true))
            .map(item=>item.category)
    }

    function resetFilterCategory(){

        onSetFilterBy({ 
            ...filterBy,
            ...filterToEdit,
            categoriesArray:uncheckedFilterArray
         })
        setCategoryFilterArray(uncheckedFilterArray)
        setFilterModalOpen('')


    }

    makeCategoriesLabels()


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





    // function handleChange(ev) {
    //     const type = ev.target.type
    //     const field = ev.target.name
    //     let value

    //     switch (type) {
    //         case 'text':
    //         case 'radio':
    //             value = field === 'sortDir' ? +ev.target.value : ev.target.value
    //             if(!filterToEdit.sortDir) filterToEdit.sortDir = 1
    //             break
    //         case 'number':
    //             value = +ev.target.value || ''
    //             break
    //     }
    //     setFilterToEdit({ ...filterToEdit, [field]: value })
    // }

    function resetFilter() {
        setFilterToEdit({
            txt:'',
            categoriesArray: [], 
            deliveryMaxTime: '', 
            maxPrice: '',
            minPrice:'',
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
                        <div className='filter-categories-modal'>
                            <h3>Category</h3>
                            <ul >
                                {categoryFilterArray.map((categoryItem,idx)=>(
                                    <li key={idx}>
                                        {categoryItem.active?  
                                            <Checked className='checked' onClick={()=>toggleCategoryCheckbox(categoryItem.category)}/>
                                            :<Unchecked className='unchecked' onClick={()=>toggleCategoryCheckbox(categoryItem.category)}/>}
                                        <p>{categoryItem.category}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>}
                        {filterModalOpen==='category'&&
                        <div className='bottom-buttons'>
                                <button className='clr-all-btn' onClick={resetFilterCategory}>Clear All</button>
                                <button className='apply-btn' onClick={onUpdateFilterStore}>Apply</button>
                        </div>}
  
                </div>

                <div className='filter-button-template seller-details'>
                    <div className='btn-design'
                        onClick={()=>onSetFilterModalOpen('seller')}>
                            <p>Seller details</p>
                            <DropDown/>  
                    </div>
                </div>

                <div className='filter-button-template budget'>
                    <div className='btn-design'
                        onClick={()=>onSetFilterModalOpen('budget')}>
                            <p>Budget</p>
                            <DropDown/>
                    </div>

                </div>

                <div className='filter-button-template delivery-time'>


                    <div className='btn-design'
                        onClick={()=>onSetFilterModalOpen('deliveryTime')}>
                            <p>Delivery Time</p>
                            <DropDown/>
                    </div>
                </div>

            </div>

            {outputLabels.length!==0&&
                <ul className='labels-list'><p>Categories </p>{outputLabels.map(label=>(
                    <li key={label}>
                        <span className='label-filter'>{label}</span>
                    </li>))}
                </ul>}
            
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

            <button style={{backgroundColor:'green'}}
                className="set-filter" 
               >Set Filter
            </button>



    </section>
}