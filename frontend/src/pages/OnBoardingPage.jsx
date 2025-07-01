import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast, { LoaderIcon } from 'react-hot-toast';
import { completingOnboarding } from '../lib/api.js';

import useAuthUser from '../hooks/useAuthUser.js';
import { useOnboarding } from '../hooks/useOnboarding.js';
import { useThemeStore } from '../store/useThemeStore.js';


export default function OnboardingPage() {

  const authUser = useAuthUser();
  const {theme,setTheme} = useThemeStore();
  const [form, setForm] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    profileAvatar: authUser?.profileAvatar || '',
    location: authUser?.location || ""
  });

  const {onBoardingMutation, isPending} = useOnboarding();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onBoardingMutation(form);
  };

  const handleNewAvatar = async() => {
    const random = Math.floor(Math.random() * 100) + 1;
    console.log(random);
    const avatar = `https://avatar.iran.liara.run/public/${random}.png`
    setForm({ ...form, profileAvatar: avatar });
    await toast.success("Random Avatar Generated!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" data-theme={theme}>
      <div className="w-full max-w-xl shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Complete Your Profile</h1>

        <div className="text-center mb-4">
          <label className="block text-sm font-medium mb-2">Profile Avatar</label>
          {form.profileAvatar == '' ? <img
            src="/profile.png"
            alt="Profile Avatar"
            className="mx-auto h-24 w-24 rounded-full border-4 shadow-md"
          /> : <img
            src={form.profileAvatar}
            alt="Profile Avatar"
            className="mx-auto h-24 w-24 rounded-full border-4 shadow-md"
          />}
          <button type="button" className="btn btn-outline btn-sm mt-2" onClick={handleNewAvatar}>
            Randomize Avatar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              rows={3}
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <LoaderIcon /> Onboarding...
              </span>
            ) : (
              "Complete Onboarding"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
