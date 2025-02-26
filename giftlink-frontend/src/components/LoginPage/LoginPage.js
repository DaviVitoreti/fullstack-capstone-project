import React, { useState,useEffect } from 'react';
import './LoginPage.css';
import {urlConfig} from '../../config';
import { useAppContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [incorrect, setIncorrect] = useState('');
const navigate = useNavigate();
const bearerToken = sessionStorage.getItem('bearer-token');
const { setIsLoggedIn } = useAppContext();

function LoginPage() {
    useEffect(() => {
        if (sessionStorage.getItem('auth-token')) {
        navigate('/app')
        }
    }, [navigate])

    const handleLogin = async () => {
        console.log("Inside handleLogin");
    }

        return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="login-card p-4 border rounded">
              <h2 className="text-center mb-4 font-weight-bold">Login</h2>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
                id="email"
                type="text"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>Login</button>
                <p className="mt-4 text-center">
                    New here? <a href="/app/register" className="text-primary">Register Here</a>
                </p>

            </div>
          </div>
        </div>
      </div>
    )
}

const handleLogin = async () => {
    try{
        //first task
      const response = await fetch(`/api/auth/login`, {
           method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': bearerToken ? `Bearer ${bearerToken}` : '', // Include Bearer token if available
            },
            body: JSON.stringify({    
                email: email,
                password: password,
            })
     })
      }catch (e) {
        console.log("Error fetching details: " + e.message);

        const json = await res.json();
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('name', json.userName);
        sessionStorage.setItem('email', json.userEmail);
        setIsLoggedIn(true);
        navigate('/app')

        if (json.authtoken) {
            // Tasks 1-4 done previously
            } else {
                document.getElementById("email").value="";
                document.getElementById("password").value="";
                setIncorrect("Wrong password. Try again.");
            //Below is optional, but recommended - Clear out error message after 2 seconds
                setTimeout(() => {
                    setIncorrect("");
                }, 2000);
        }
        <span style={{color:'red',height:'.5cm',display:'block',fontStyle:'italic',fontSize:'12px'}}>{incorrect}</span>
    }
}

export default LoginPage;