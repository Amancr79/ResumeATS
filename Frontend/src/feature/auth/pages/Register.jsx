import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../hook/auth.hook';

import './auth.form.scss'

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {loading , handleRegister} = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    await handleRegister(username, email, password);
    navigate('/homepage');
  }
 
  if(loading){
    return <div className="loading">Loading...</div>
  }

  return (
    <main>
     <div className="form-container">
        <div className="form-header">
          <h2>Create your account</h2>
          <p>Make a wise idea to keep your assets safe, and better together for free.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input 
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              type="text" id="username" placeholder="Username" />
            </div>
          </div>

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

          <button className="btn btn-primary" type="submit">Create Account</button>
          <p>Already have account ? <Link to={'/login'} className="link">Login</Link> </p>
        </form>
     </div>
    </main>
  )
}
