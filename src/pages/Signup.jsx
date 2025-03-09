import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router'

import { signup } from '../store/actions/user.actions'

import { ImgUploader } from '../cmps/ImgUploader'
import { userService } from '../services/user'

export function Signup() {
    const [credentials, setCredentials] = useState(userService.getEmptyUser())
    const navigate = useNavigate()

    function clearState() {
        setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
    }

    function handleChange(ev) {
        const type = ev.target.type

        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }
    
    async function onSignup(ev = null) {
        if (ev) ev.preventDefault()

        if (!credentials.username || !credentials.password || !credentials.fullname) return
        await signup(credentials)
        clearState()
        navigate('/')
    }

    function onUploaded(imgUrl) {
        setCredentials({ ...credentials, imgUrl })
    }
    useEffect(()=>{
        clearState()
        
    },
    [])

    return (
        <form className="signup-form" onSubmit={onSignup}>
            <div className='input-fullname'>
                <label htmlFor="fullname">Full Name</label>
                <input
                    type="text"
                    name="fullname"
                    value={credentials.fullname}
                    placeholder="Fullname"
                    onChange={handleChange}
                    required
                    autoComplete="off"

                />
            </div>

            <div className='input-username'>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    placeholder="Username"
                    onChange={handleChange}
                    required
                    autoComplete="off"

                />
            </div>

            <div className='input-password'>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    autoComplete="new-password"

                />
            </div>
            {/* <ImgUploader onUploaded={onUploaded} /> */}
            <button>Signup</button>
        </form>
    )
}