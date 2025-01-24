import { useState, useEffect } from 'react'
import MarkV from '../assets/svgs/markV.svg?react'

export function GigFilter({ filterBy, onSetFilterBy }) {
    // structuredClone(filterBy)
    const [ filterToEdit, setFilterToEdit ] = useState(filterBy)
    
    useEffect(() => {
        onSetFilterBy(filterToEdit)
    }, [filterToEdit])

    //sort:
    const [sortByField,setSortByField] = useState('price')
    const [sortByDirection,setSortByDirection] = useState(1)
    const [showSortByMenu,setShowSortByMenu] = useState(false)

    useEffect(() => {
        setFilterToEdit(
            {
            sortField: sortByField,
            sortDir:sortByDirection
            }
        )
    }, [sortByField,sortByDirection])



    function toggleSortMenu(){
        setShowSortByMenu((prevState)=>!prevState)
    }

    function onClickSortBy(field){
        setSortByField(field)
        setShowSortByMenu(false)
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
   


    let sortByTitle 
    switch (sortByField){
        case 'price':
            sortByTitle= 'Budget'
            break
        case 'daysToMake':
            sortByTitle= 'Delivery Time'
            break
    }


    return <section className="gig-filter">
            <h3>Filter:</h3>
            {/* <input
                type="text"
                name="txt"
                value={filterToEdit.txt}
                placeholder="Free text"
                onChange={handleChange}
                required
            />
            <input
                type="number"
                min="0"
                name="minSpeed"
                value={filterToEdit.minSpeed}
                placeholder="min. speed"
                onChange={handleChange}
                required
            />
            <button 
                className="btn-clear" 
                onClick={clearFilter}>Clear
            </button> */}

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
            <button 
                className="btn-clear" 
                onClick={resetFilter}>Reset Filter
            </button>



    </section>
}