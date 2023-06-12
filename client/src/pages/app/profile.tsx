import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import me from '@/utils/me';

export default function Profile() {
  const getMe = me();
  const router = useRouter();

  // State to store the form values
  const [formValues, setFormValues] = useState({ first_name: '', last_name: '' });

  // Function to handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', getMe?.username);
    formData.append('first_name', formValues.first_name);
    formData.append('last_name', formValues.last_name);

    try {
      await axios.post('http://localhost:4000/dev/profile/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      await axios.post('http://localhost:4000/dev/auth/refresh-token', {
        username: getMe?.username,
      }, { withCredentials: true });

      // refresh the page
      router.reload();

    } catch (error) {
      // handle error case
      console.error(error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>

      <p className="text-gray-600 mb-8">Here you can edit your profile.</p>

      <form className="bg-white shadow-md rounded px-8 py-6 w-96" onSubmit={handleSubmit}>
        <fieldset>
          <legend className="text-lg font-semibold mb-4">Personal information</legend>

          <div className="mb-4">
            <label htmlFor="first_name" className="block text-gray-700 font-medium mb-2">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              onChange={handleChange}
              className="border border-gray-300 rounded w-full px-3 py-2"
              placeholder={getMe?.given_name}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="last_name" className="block text-gray-700 font-medium mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              onChange={handleChange}
              className="border border-gray-300 rounded w-full px-3 py-2"
              placeholder={getMe?.family_name}
            />
          </div>

          <div className="mb-4"></div>
        </fieldset>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8"
        >
          Save
        </button>
      </form>
    </main>
  );
}
