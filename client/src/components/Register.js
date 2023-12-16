import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";



const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const apiUrl = 'http://localhost:5000';

  const [isRecaptchaVerified, setRecaptchaVerified] = useState(false);

  const handleRegister = () => {
    if (!isRecaptchaVerified) {
      alert('Please verify reCAPTCHA.');
      return;
    }

    // Make HTTP request to register endpoint
    fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Registration successful:', data.message);
        window.alert('Registration successful!');
        navigate('/login', { replace: true });
      } else {
        console.error('Registration failed:', data.message);
        window.alert('Registration failed.');
      }
    })
    .catch(error => {
      console.error('Error during registration:', error);
      window.alert('An error occurred during registration.');
    });
  };

  const onChange = () => {
    setRecaptchaVerified(true);
  };

  return (
    <section className="bg-gray-50 under">
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <h1 className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          REGISTER    
        </h1>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create and account
            </h1>
            <form className='space-y-4 md:space-y-6'>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                <input 
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"  
                  required=""
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
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
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required=""/>
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" to="#">Terms and Conditions</Link></label>
                </div>
              </div>
              <button onClick={handleRegister} type="button" className="w-full text-white bg-indigo-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center">
                Create an account
              </button>
              <p className=" text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <a className="font-medium text-primary-600 hover:underline dark:text-primary-500"><Link to="/login">Login here</Link></a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
