import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSelector ,useDispatch} from 'react-redux'

import { userService } from '../services/user'
import { login } from '../store/actions/user.actions'

export function Login() {

    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
	

    const navigate = useNavigate()

    useEffect(() => {
        // loadUsers()
    }, [])

    // async function loadUsers() {
    //     const users = await userService.getUsers()
    //     setUsers(users)
    // }

    async function onLogin(ev = null) {
        if (ev) ev.preventDefault()

        if (!credentials.username) return
        await login(credentials)
        navigate('/')
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    return (
        // <form className="login-form" onSubmit={onLogin}>
        //     <select
        //         name="username"
        //         value={credentials.username}
        //         onChange={handleChange}>
        //             <option value="">Select User</option>
        //             {users.map(user => <option key={user._id} value={user.username}>{user.fullname}</option>)}
        //     </select>
        //     <button>Login</button>
        // </form>

        <form className="login-form" onSubmit={onLogin}>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
            />

            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
            />

            <button type="submit">Login</button>
        </form>

    )
}