import React, { useState } from 'react'
import './Login.css'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../../firebase'


function Login() {
    const history = useHistory()
    // set inputs to empty an empty string
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = e => {
        // prevent page from refreshing
        e.preventDefault()
        auth
            .signInWithEmailAndPassword(email, password)
            .then((auth) => {
                // change url after login
                if (auth) {
                    history.push('/')
                }
            })
            .catch(error => alert(error.message))
    }
    const register = e => {
        e.preventDefault()
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                if (auth) {
                    history.push('/')
                }
            })
            .catch(error => alert(error.message))
    }
    return (
        <div className="login">
            <Link to="/">
                <img 
                    className="login__logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" 
                    alt="Amazon Logo"
                />
            </Link>
            <div className="login__container">
                <h1>Sign-in</h1>
                <form action="">
                    <h5>Email or mobile phone number</h5>
                    <input 
                        type="text" 
                        value={email} 
                        // track when user types
                        // 'e.target.value' is what the user types
                        onChange={e => setEmail(e.target.value)}/>
                    <h5>Password</h5>
                    <input 
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button 
                        type='submit'
                        onClick={signIn}
                        className="login__signInButton">
                            Sign in
                    </button>
                </form>
                <p>By continuing, you agree to AMAZON FAKE CLONE Conditions of Use and Privacy Notice.</p>
                <button 
                    onClick={register}
                    className="login__registerButton">
                        Create your Amazon account
                </button>
            </div>
        </div>
    )
}

export default Login

