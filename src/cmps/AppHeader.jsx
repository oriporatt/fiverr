import { Link, NavLink ,useLocation} from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'

export function AppHeader() {
	const location = useLocation();
	const isHomePage = location.pathname==='/'

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
		<header className="app-header main-container">
			<div className='header-elements'>
				<NavLink to="/" className="side-menu">
					<img src="/img/menu.svg" alt="menu" className="menu-img"/>
				</NavLink>

				<NavLink to="/" className="logo">
					<img src="/img/fiverr_logo.svg" alt="Fiverr Logo" className="logo-img"/>
				</NavLink>

				{showSearchOnTop&&<div className='topSearchBox'>
					<p>Top Search Box</p>
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
