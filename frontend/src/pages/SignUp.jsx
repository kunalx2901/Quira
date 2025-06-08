import React, { useState } from 'react';
import { Navigate } from 'react-router';

const SignUp = () => {
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // TODO: Add Firebase/Auth logic
    console.log('Signing up with:', signupData);
  };


  return (
    <div className="flex flex-col md:flex-row h-screen w-screen px-60 py-44" data-theme="light">
      <div className='border-2 border-gray-200 border-solid shadow-xl shadow-gray-300 rounded-lg flex w-full'>
          {/* Left side - Branding/Illustration */}
      <div className="md:w-1/2 w-full bg-base-200 hidden lg:flex items-center justify-center p-8 text-center">
        <div>
          <img
            src="/signup_logo.png"
            alt="Chat Illustration"
            className="w-96 h-auto mx-auto"
          />
          <p className="text-2xl font-bold text-gray-600 mb-6  ">
            Connect, collaborate and chat in real time.
          </p>
        </div>
      </div>

      {/* Right side - Signup Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-base-100 p-8">
        <form
          onSubmit={handleSignup}
          className="w-full max-w-md bg-white shadow-xl rounded-lg p-6 space-y-6"
        >
          <h2 className="text-2xl font-semibold text-center">Create an Account</h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={signupData.fullName}
              onChange={handleChange}
              className="input input-bordered"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email Address</span>
            </label>
            <input
              type="email"
              name="email"
              value={signupData.email}
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
              value={signupData.password}
              onChange={handleChange}
              className="input input-bordered"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Sign Up
          </button>

          <p className="text-sm text-center mt-2">
            Already have an account? <a className="link link-primary">Log in</a>
          </p>
        </form>
      </div>
      </div>
    </div>
  );
};

export default SignUp;
