import { Link, NavLink ,useLocation} from 'react-router-dom'
import { useState,useEffect ,useRef} from 'react'
import { useNavigate } from 'react-router'
import { useSelector ,useDispatch} from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import { UPDATE_FILTER_BY } from '../store/reducers/gig.reducer'
import RejectSVG from '../assets/svgs/rejectSVG.svg?react'
import CloseModal from '../assets/svgs/closeModal.svg?react'
import Skiller from '../assets/svgs/skiller.svg?react'
import { SET_SYSTEM_MODE } from '../store/reducers/system.reducer'
import {  loadUsers } from '../store/actions/user.actions'
import { loadOrders } from '../store/actions/order.actions'
import { orderService } from '../services/order'
import { OrdersModal } from './OrdersModal'
//check
export function AppHeader() {
	const location = useLocation();

	const dispatch = useDispatch()
	const searchBoxTextGlobal = useSelector(storeState => storeState.gigModule.filterBy.txt)
	const systemMode = useSelector(storeState => storeState.systemModule.mode)
	const [ showX, setShowX ] = useState(false)
	const [ localInput, setLocalInput ] = useState(searchBoxTextGlobal)
	const [ showLogoutBtn, setShowLogoutBtn ] = useState(false)
	const button1Ref = useRef(null);
    const button2Ref = useRef(null);
	const buttonCloseModalRef = useRef(null);
	const [ showOrdersModal, setShowOrdersModal ] = useState(false)




	const isHomePage = location.pathname==='/'
	const isGigsIndexPage=location.pathname.startsWith('/gig');


	const user = useSelector(storeState => storeState.userModule.user)
	const searchBoxPos = useSelector(storeState => storeState.systemModule.searchBoxPosition)
	
	const navigate = useNavigate()
	let showSearchOnTop=false

	
    useEffect(() => {
        const handleClickOutside = (event) => {
			if (buttonCloseModalRef.current&&buttonCloseModalRef.current.contains(event.target)){
				setShowLogoutBtn(false);
			}else if (button2Ref.current &&
				(!button2Ref.current.contains(event.target)&&!button1Ref.current.contains(event.target))) {
                setShowLogoutBtn(false);
            }
        };

        if (showLogoutBtn) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showLogoutBtn]);



	async function onLogout() {
		try {
			
			await logout()
			navigate('/')
			showSuccessMsg(`Logout Successfully`)
		} catch (err) {
			showErrorMsg('Cannot logout')
		}
		finally{
			setShowLogoutBtn(false)
		}
	}
	if ((searchBoxPos==='top' && isHomePage) || isGigsIndexPage){
		showSearchOnTop=true
	}

	function onSubmitSearch(event) {
		event.preventDefault(); 
	
		dispatch({
			type: UPDATE_FILTER_BY,
			filterBy: { 'txt': localInput }
		});
	}
	
	function onClearSearchBox(event) {
		event.preventDefault(); 
		setLocalInput('')
		setShowX(false)
		dispatch({
			type: UPDATE_FILTER_BY,
			filterBy: { 'txt': '' }
		});
	}

	function onChangeInput(event) {
		const searchValue = event.target.value;
		if (searchValue!==''){
			setShowX(true)
		} else{
			setShowX(false)
		}
		setLocalInput(searchValue)
	}

	function onSwitchToBuying(){
		dispatch({
			type: SET_SYSTEM_MODE,
			mode: 'buyer'
		});
	}
	function onSwitchToSelling(){
		dispatch({
			type: SET_SYSTEM_MODE,
			mode: 'seller'
		});
	}


	

	useEffect(()=>{
		setLocalInput(searchBoxTextGlobal)
		if (searchBoxTextGlobal){
			setShowX(true)
		}else{
			setShowX(false)
		}
	},
	[searchBoxTextGlobal])

	useEffect(()=>{
		loadUsers()
		loadOrders(orderService.getDefaultFilter())
	},
	[])


	function onCloseMyOrders(){
		setShowOrdersModal(false)
	}
	
	function onToggleOrdersModal(){
		setShowOrdersModal(lastState=>!lastState)
	}

	return (
		<header className={`app-header main-container ${isGigsIndexPage ? 'header-regular' : ''}`}>
			<div className='header-elements'>
				<NavLink to="/" className="side-menu">
					<img src="/img/menu.svg" alt="menu" className="menu-img"/>
				</NavLink>

				<NavLink to="/" className="logo">
					<div className='logo-img'><Skiller/></div>
					{/* <img src="/img/fiverr_logo.svg" alt="Fiverr Logo" className="logo-img"/> */}
				</NavLink>

				{showSearchOnTop&&
				<form className='top-search-box' onSubmit={onSubmitSearch}>
					
                    <input  type="text" value={localInput}  onChange={onChangeInput} name='searchBox' placeholder="What service are you looking for today?"/>
                    <button type='submit' >
						<svg  width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" 
							fill="currentFill">
							<path d="m15.89 14.653-3.793-3.794a.37.37 0 0 0-.266-.109h-.412A6.499 6.499 0 0 0 6.5 0C2.91 0 0 2.91 0 6.5a6.499 6.499 0 0 0 10.75 4.919v.412c0 .1.04.194.11.266l3.793 3.794a.375.375 0 0 0 .531 0l.707-.707a.375.375 0 0 0 0-.53ZM6.5 11.5c-2.763 0-5-2.238-5-5 0-2.763 2.237-5 5-5 2.762 0 5 2.237 5 5 0 2.762-2.238 5-5 5Z">
							</path>
						</svg>
						{showX&& <RejectSVG className='x-button' onClick={onClearSearchBox} /> }
	

					</button>
                </form>}

				<nav>

					{systemMode==='buyer'&&<NavLink className='gig-link' to="gig">Explore Gigs</NavLink>}
					{systemMode==='buyer'&&user&&<NavLink className='switch-seller' to="/seller" onClick={onSwitchToSelling}>Switch to Selling</NavLink>}
					{systemMode==='seller'&&user&&<NavLink className='switch-buying' to="" onClick={onSwitchToBuying}>Switch to Buying</NavLink>}
					{systemMode==='buyer'&&user&&<div className='button-my-orders-div'>
						<button className='buyer-orders' onClick={onToggleOrdersModal}>
						My orders
						</button>						
						{showOrdersModal&&<OrdersModal onCloseMyOrders={onCloseMyOrders}/>}
					</div>}
						

					{!user && <NavLink to="login" className="login-link">Sing in</NavLink>}
					{!user && <NavLink className='join' to="login/signup"><button>Join</button></NavLink>}
					{user && (
						<div className="user-info"
							ref={button1Ref} 
							onClick={() => {setShowLogoutBtn(true)}}
						>
							{/* <Link to={`user/${user._id}`}> */}
								<div className="user-circle"
									>
									{user.fullname[0]}
								</div>
							{/* </Link> */}
							{showLogoutBtn && (
								<div ref={button2Ref} className='logout-modal'>
									<div className='user-name-modal'>
										<h4>{user.fullname}</h4>
										<div className='close-user' 
											ref={buttonCloseModalRef}
											onClick={()=>{setShowLogoutBtn(false)}}>
											<CloseModal />
										</div>
									</div> 
										
									<button 
										onClick={onLogout}>Logout
									</button>
								</div>
							)}
						</div>
					)}
					
				</nav>
			</div>
		
		</header>
	)
}
