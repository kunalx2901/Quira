import React, { useEffect, useState } from 'react';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../lib/api';
import { useLogin } from '../hooks/useLogin';
import { useThemeStore } from '../store/useThemeStore';


const Login = () => {
  const {theme,setTheme} = useThemeStore();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  
  const {loginMutation, isPending, error} = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="flex flex-col justify-center items-center md:flex-row h-screen w-screen lg:px-60 lg:py-44" data-theme={theme}>
      <div className='border-2 border-solid shadow-xl rounded-lg flex lg:w-full'>
        {/* Left side - Illustration */}
        <div className="md:w-1/2 w-full bg-base-200 hidden lg:flex items-center justify-center p-8 text-center">
          <div className='flex justify-center items-center flex-col gap-5'> 
            <img
              src="/login.png"
              alt="Chat Illustration"
              className="w-96 h-auto mx-auto"
            />
            <p className="text-2xl font-bold mb-6">
              Secure. Simple. Smart Chat.
            </p>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="md:w-1/2 w-full flex items-center justify-center bg-base-100 p-8">
          <form onSubmit={handleLogin} className="w-full max-w-md shadow-xl rounded-lg p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-center">Welcome Back</h2>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                className="input input-bordered"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                className="input input-bordered"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="text-sm text-red-500 text-center">
                Login failed. Check credentials.
              </div>
            )}

              <button type="submit" disabled={isPending} className="btn btn-primary w-full mt-4">
                {isPending ? 'Logging in...' : 'Login'}
              </button>

            <p className="text-sm text-center mt-2">
              Don't have an account? <a href="/signup" className="link link-primary">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
