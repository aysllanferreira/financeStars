import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signUp } from '../../utils/auth';

export default function SignUp() {
  const router = useRouter();

  const [data, setData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, confirmPassword } = data;

      // Email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Invalid email');
        return;
      }

    if (password !== confirmPassword || password === '' || confirmPassword === '') {
      alert('Passwords do not match');
      return;
    }

    try {
      await signUp({ email, password });
      localStorage.setItem('code', email);
      router.push('/auth/confirmation');
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <main className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-[450px]">
        <h1 className="text-2xl font-bold mb-4">Finance Star</h1>
        <p className="text-gray-700 mb-6">Sign Up</p>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label htmlFor="email" className="text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />

          <label htmlFor="password" className="text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />

          <label htmlFor="confirmPassword" className="text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-2 font-semibold hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Sign Up
          </button>

          <hr className="my-4" />

          <button
            type="button"
            className="bg-red-500 text-white rounded px-4 py-2 font-semibold hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            Sign Up with Google
          </button>

          <p className="text-gray-700 text-center mt-4">
            Already have an account?{' '}
            <a href="/auth/signin" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}
