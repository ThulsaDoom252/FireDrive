import React from 'react'
import anonymous from './anonymous.png'

function Login() {
    return (
        <div className='login-wrapper'>
            <div className="login-container">
                <img className='anonymous-avatar' src={anonymous} alt="anonymous.jpg"/>
                <h1 className='login-title'>Welcome guest</h1>
                <div className='login-errors-block'>
                    <p>*Error 1</p>
                    <p>*Error 2</p>
                </div>
                <input className='login-input login-inputs' placeholder='username' type="text"/>
                <input className='password-input login-inputs' type="password" placeholder='password'/>
                <button className='signIn-button login-buttons'>Login</button>
                <button className='restore-login-button login-buttons'>Forgot login/password?</button>
                <button className='signUp-button login-buttons'>No account? Sign up</button>
            </div>
        </div>
    );
}

export default Login;