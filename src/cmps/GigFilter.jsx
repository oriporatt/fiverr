import { useState, useEffect } from 'react'

export function GigFilter({ filterBy, setFilterBy }) {
    const [ filterToEdit, setFilterToEdit ] = useState(structuredClone(filterBy))
    const [sortByField,setSortByField] = useState('price')
    const [sortByDirection,setSortByDirection] = useState(1)

    const [showSortByMenu,setShowSortByMenu] = useState(false)


    useEffect(() => {
        setFilterBy(filterToEdit)
    }, [filterToEdit])


    useEffect(() => {
        setFilterToEdit((prevFilter) => ({
            ...prevFilter,
            sortField: sortByField,
            sortDir: sortByDirection,
        }));
    }, [sortByField,sortByDirection])

    function toggleSortMenu(){
        setShowSortByMenu((prevState)=>!prevState)
    }

    // function changeSortBy{

    // }
    

    function handleChange(ev) {
        const type = ev.target.type
        const field = ev.target.name
        let value

        switch (type) {
            case 'text':
            case 'radio':
                value = field === 'sortDir' ? +ev.target.value : ev.target.value
                if(!filterToEdit.sortDir) filterToEdit.sortDir = 1
                break
            case 'number':
                value = +ev.target.value || ''
                break
        }
        setFilterToEdit({ ...filterToEdit, [field]: value })
    }

    function clearFilter() {
        setFilterToEdit({ ...filterToEdit, txt: '', minSpeed: '', maxPrice: '' })
    }
    
    function clearSort() {
        setFilterToEdit({ ...filterToEdit, sortField: '', sortDir: '' })
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
                            <label onClick={()=>setSortByField('price')}>Budget</label>
                            <label onClick={()=>setSortByField('daysToMake')}>Delivery Time</label>
                            
                        </div>}
                </label>
            </div>
            <button 
                className="btn-clear" 
                onClick={clearSort}>Reset Filter
            </button>



    </section>
}