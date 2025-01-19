import { Link, NavLink ,useLocation} from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'

export function AppHeader() {
	const location = useLocation();
	const isHomePage = location.pathname==='/'
	const isGigsIndexPage=location.pathname.startsWith('/gig');


	const user = useSelector(storeState => storeState.userModule.user)
	const searchBoxPos = useSelector(storeState => storeState.systemModule.searchBoxPosition)
	
	const navigate = useNavigate()
	let showSearchOnTop=false
	async function onLogout() {
		try {
			await logout()
			navigate('/')
			showSuccessMsg(`Bye now`)
		} catch (err) {
			showErrorMsg('Cannot logout')
		}
	}
	if (searchBoxPos==='top' && isHomePage){
		showSearchOnTop=true
	}
	
	return (
		<header className={`app-header main-container ${isGigsIndexPage ? 'header-regular' : ''}`}>
			<div className='header-elements'>
				<NavLink to="/" className="side-menu">
					<img src="/img/menu.svg" alt="menu" className="menu-img"/>
				</NavLink>

				<NavLink to="/" className="logo">
					<img src="/img/fiverr_logo.svg" alt="Fiverr Logo" className="logo-img"/>
				</NavLink>

				{showSearchOnTop&&
				<div className='top-search-box'>
                    <input type="text" placeholder="What service are you looking for today?"/>
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" 
						fill="currentFill">
						<path d="m15.89 14.653-3.793-3.794a.37.37 0 0 0-.266-.109h-.412A6.499 6.499 0 0 0 6.5 0C2.91 0 0 2.91 0 6.5a6.499 6.499 0 0 0 10.75 4.919v.412c0 .1.04.194.11.266l3.793 3.794a.375.375 0 0 0 .531 0l.707-.707a.375.375 0 0 0 0-.53ZM6.5 11.5c-2.763 0-5-2.238-5-5 0-2.763 2.237-5 5-5 2.762 0 5 2.237 5 5 0 2.762-2.238 5-5 5Z">
						</path>
					</svg>
                </div>}

				<nav>

					<NavLink className='gig-link' to="gig">Explore Gigs</NavLink>
					<NavLink className='become-seller' to="">Become a Seller</NavLink>

					{/* {user?.isAdmin && <NavLink to="/admin">Admin</NavLink>} */}

					{!user && <NavLink to="login" className="login-link">Sing in</NavLink>}
					{user && (
						<div className="user-info">
							<Link to={`user/${user._id}`}>
								{/* {user.imgUrl && <img src={user.imgUrl} />} */}
								{user.fullname}
							</Link>
							{/* <span className="score">{user.score?.toLocaleString()}</span> */}
							<button onClick={onLogout}>logout</button>
						</div>
					)}
					<NavLink className='join' to=""><button>Join</button></NavLink> 
				</nav>
			</div>
		
		</header>
	)
}
