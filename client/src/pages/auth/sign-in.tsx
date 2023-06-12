import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn, me } from '../../utils/auth';
import OAuthGoogle from '../../components/oAuthGoogle'; // Here

export default function SignUp() {
  const router = useRouter();

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = data;

    // Email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email');
      return;
    }

    try {
      await signIn({ email, password });
      router.push('/');
    } catch (err: any) {
      alert(err.message);
    }
  };

  useEffect(() => {
    const getMe = async () => {
      try {
        const data = await me();
        console.log(data);
        
      } catch (err: any) {
        console.log(err.message);
      }
      
    };
    getMe();
  }, []);

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

          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-2 font-semibold hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
        <hr className="my-4" />

        <OAuthGoogle />

        <p className="text-gray-700 text-center mt-4">
          Dont have an account?{' '}
          <a href="/auth/sign-up" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </main>
  );
}
