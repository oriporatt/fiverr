import { useState, useEffect,useRef } from 'react'

import { gigService } from '../services/gig/index'
import { Link, NavLink ,useLocation} from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector,useDispatch } from 'react-redux'
import { UPDATE_FILTER_BY } from '../store/reducers/gig.reducer'

export function CategoriesHeader() {
    const location = useLocation();
	const isHomePage = location.pathname==='/'
	const isGigsIndexPage=location.pathname.startsWith('/gig');
    const searchBoxPos = useSelector(storeState => storeState.systemModule.searchBoxPosition)
    const navigate = useNavigate()
    let show =false
    let showSticky=false

    if (isGigsIndexPage || isHomePage){
        show=true;
    }
    if (searchBoxPos==='top' && isHomePage){
        showSticky=true
    }
    

    // horiznal scroll:
    const [leftScrollButton, setLeftScrollButton] = useState(false)
    const [rightScrollButton, setRightScrollButton] = useState(true)

    const categoriesList = useRef(null);
    
    const scrollLeft = () => {
        categoriesList.current.scrollBy({
        left: -categoriesList.current.offsetWidth, 
        behavior: "smooth",
        });
        setLeftScrollButton(false)
        setRightScrollButton(true)
    };
    
    const scrollRight = () => {
        categoriesList.current.scrollBy({
        left: categoriesList.current.offsetWidth, 
        behavior: "smooth",
        });
        setLeftScrollButton(true)
        setRightScrollButton(false)


    };
        
    const headerCategories = gigService.categories


    const dispatch = useDispatch()

    const emptyFilterBy =gigService.getDefaultFilter()



    function onClickCategory(newCategory){
        let newCategoriesArray = [...emptyFilterBy.categoriesArray]

        newCategoriesArray= newCategoriesArray.map(catObj=>{
            if (catObj.category===newCategory){
                return {
                    category: catObj.category,
                    active:true}
            }else{
                return catObj
            }
        })

        const newFilterBy={
            ...emptyFilterBy,
            categoriesArray:newCategoriesArray
        }

        dispatch({
            type: UPDATE_FILTER_BY,
            filterBy: newFilterBy
        });
        navigate('/gig')

    }
    return (
        <main className={`categories-header full ${showSticky?'home-upper':''}`}>
            {show&&<header className='index-header main-container'>      
                <div className='header-element-layout'>

                    {rightScrollButton&&<button className="scroll-button-main-categories right" onClick={scrollRight} >
                    <svg width="8" height="16" viewBox="0 0 8 16" xmlns="http://www.w3.org/2000/svg"><path d="M0.772126 1.19065L0.153407 1.80934C0.00696973 1.95578 0.00696973 2.19322 0.153407 2.33969L5.80025 8L0.153407 13.6603C0.00696973 13.8067 0.00696973 14.0442 0.153407 14.1907L0.772126 14.8094C0.918563 14.9558 1.156 14.9558 1.30247 14.8094L7.84666 8.26519C7.99309 8.11875 7.99309 7.88131 7.84666 7.73484L1.30247 1.19065C1.156 1.04419 0.918563 1.04419 0.772126 1.19065Z"></path></svg>
                    </button>}

                    {leftScrollButton&&<button className="scroll-button-main-categories left" onClick={scrollLeft} >
                    <svg width="8" height="15" viewBox="0 0 8 15" xmlns="http://www.w3.org/2000/svg"><path d="M7.2279 0.690653L7.84662 1.30934C7.99306 1.45578 7.99306 1.69322 7.84662 1.83968L2.19978 7.5L7.84662 13.1603C7.99306 13.3067 7.99306 13.5442 7.84662 13.6907L7.2279 14.3094C7.08147 14.4558 6.84403 14.4558 6.69756 14.3094L0.153374 7.76518C0.00693607 7.61875 0.00693607 7.38131 0.153374 7.23484L6.69756 0.690653C6.84403 0.544184 7.08147 0.544184 7.2279 0.690653Z"></path></svg>
                    </button>}

                    <ul className='categories-header 'ref={categoriesList}>
            

                    {headerCategories.map(category=>{
                        return(
                        <li key={category} >
                            <a onClick={()=>onClickCategory(category)}> {category}</a>
                        </li>
                        )
                    })}
                    </ul>
                </div>
            </header>}
        </main>
    )
}