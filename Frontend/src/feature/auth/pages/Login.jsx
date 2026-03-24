import React, { useState } from 'react'
import {Link , useNavigate} from "react-router"
import { useAuth } from '../hook/auth.hook';
import './auth.form.scss'

export default function Login() {

  const [email, setEmail]= useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const {loading , handleLogin} = useAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    await handleLogin(email, password);
    navigate('/homepage');
  }

  if(loading){
    return <div className="loading">Loading...</div>
  }
  return (
    <main>
     <div className="form-container">
        <div className="form-header">
          <h2>Sign in with email</h2>
          <p>Make a wise idea to keep your assets safe, and better together for free.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <input 
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              type="email" id="email" placeholder="Email" />
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 1C6.477 1 2 5.477 2 11v9a9 9 0 0 0 18 0v-9c0-5.523-4.477-10-10-10zm0 2c4.418 0 8 3.582 8 8v9a7 7 0 0 1-14 0v-9c0-4.418 3.582-8 8-8z" />
                <circle cx="12" cy="12" r="4" fill="currentColor" />
              </svg>
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                placeholder="Password" 
                value={password}
                onChange={(e)=>(setPassword(e.target.value))}
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? '👁' : '👁‍🗨'}
              </button>
            </div>
          </div>

          <a href="#" className="forgot-password">Forgot password?</a>

          <button className="btn btn-primary" type="submit">Get Started</button>
          <p>Don't have account ? <Link to={'/register'} className="link">register</Link> </p>

        </form>
     </div>
    </main>
  )
}
