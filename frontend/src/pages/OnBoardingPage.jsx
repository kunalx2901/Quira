import React, { useState } from 'react';

const avatars = [
  'https://api.dicebear.com/7.x/bottts/svg?seed=Felix',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Tiger',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Spark',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Nova'
];

export default function OnboardingPage() {
  const [form, setForm] = useState({ fullName: '', bio: '', location: '' });
  const [avatar, setAvatar] = useState(avatars[Math.floor(Math.random() * avatars.length)]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Onboarding submitted:', { ...form, avatar });
  };

  const handleNewAvatar = () => {
    const random = avatars[Math.floor(Math.random() * avatars.length)];
    setAvatar(random);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Complete Your Profile</h1>

        <div className="text-center">
            <label className="block text-sm font-medium mb-2">Profile Avatar</label>
            <img
              src={avatar}
              alt="Profile Avatar"
              className="mx-auto h-24 w-24 rounded-full border-4 border-blue-200 shadow-md"
            />
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
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
}