import React from 'react';

export default function SignUp() {
  return (
    <main className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-[450px]">
        <h1 className="text-2xl font-bold mb-4">Finance Star</h1>
        <p className="text-gray-700 mb-6">Sign Up</p>

        <form className="grid gap-4">
          <label htmlFor="email" className="text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="password" className="text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="confirmPassword" className="text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}
