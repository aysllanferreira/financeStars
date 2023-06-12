import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { confirmSignUp } from '../../utils/auth';

export default function Confirmation() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState({
    status: false,
    message: '',
  });

  useEffect(() => {
    const lsEmail = localStorage.getItem('code');
    if (lsEmail) {
      setEmail(lsEmail);
    } else {
      router.push('/auth/sign-up');
    }
  }, []);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { email, code };

    try {
      await confirmSignUp(data);
      router.push('/auth/sign-in');
      localStorage.removeItem('code');
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
          <label htmlFor="code" className="text-gray-700">
            Code
          </label>
          <input
            type="code"
            id="code"
            name="code"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              setCode(e.target.value);
              setError({
                status: false,
                message: '',
              });
            }}
          />

          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-2 font-semibold hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Send
          </button>
        </form>
        {error.status && <div className="text-red-500 text-sm mt-4">{error.message}</div>}
      </div>
    </main>
  );
}
