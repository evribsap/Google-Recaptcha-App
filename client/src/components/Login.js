import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { loginUser } = useUser();

  const apiUrl = 'http://localhost:5000';

  const [isRecaptchaVerified, setRecaptchaVerified] = useState(false);

  const handleLogin = () => {
    if (!isRecaptchaVerified) {
      alert('Please verify reCAPTCHA.');
      return;
    }
  
    fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          console.log('Login successful:', data.message);
          window.alert('Login successful!');
          const userData = data.user;
          loginUser(userData);
          navigate('/dashboard', { replace: true });
        } else {
          console.error('Login failed:', data.error);
          window.alert('Login failed.');
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        window.alert('An error occurred during login.');
      });
  };

  const onChange = () => {
    setRecaptchaVerified(true);
  };

  return (
    <section className="bg-gray-50 under">
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <h1 className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          LOGIN    
        </h1>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 '>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            <form className='space-y-4 md:space-y-6'>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                <input 
                  type="email" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                  placeholder="name@company.com" 
                  required=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                  required=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />  
              </div>
              <div>
                <ReCAPTCHA
                  sitekey="6LfEkzMpAAAAANS1clj7ZWnZ5cwtaUd6ii-eFreu"
                  onChange={onChange}
                />
              </div>
              <button onClick={handleLogin} type="button" className="w-full text-white bg-indigo-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center">
                Sign in
              </button>
              <p className=" text-sm font-light text-gray-500">
                Don’t have an account yet? <a className="font-medium text-primary-600 hover:underline"><Link to="/register">Sign Up</Link></a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
