import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from '../../utils/auth';
import OAuthGoogle from '../../components/oAuthGoogle'; // Here

export default function SignUp() {
  const router = useRouter();

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState({
    status: false,
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({
      status: false,
      message: '',
    });
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = data;

    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      setError({
        status: true,
        message: 'Please enter a valid email address',
      });
      return;
    }

    try {
      await signIn({ email, password });
      router.push('/app/dashboard');
    } catch (err: any) {
      setError({
        status: true,
        message: err.response.data.message,
      });
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

          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-2 font-semibold hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Sign In
          </button>
        </form>
        {error.status && <div className="text-red-500 text-sm mt-4">{error.message}</div>}
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
