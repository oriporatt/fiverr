import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'

export function AppHeader() {
	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()

	async function onLogout() {
		try {
			await logout()
			navigate('/')
			showSuccessMsg(`Bye now`)
		} catch (err) {
			showErrorMsg('Cannot logout')
		}
	}

	return (
		<header className="app-header full">
			<NavLink to="/" className="logo">
				<img src="/img/fiverr_logo.svg" alt="Fiverr Logo" className="logo-img"/>
			</NavLink>
			<nav>

				<NavLink to="gig">Explore Gigs</NavLink>
				<NavLink to="">Become a Seller</NavLink>

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
				<NavLink to="">Join</NavLink> 
			</nav>
		
		</header>
	)
}
