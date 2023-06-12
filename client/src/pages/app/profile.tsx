import me from '@/utils/me';

export default function Profile() {
  me();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>

      <p className="text-gray-600 mb-8">Here you can edit your profile.</p>

      <form className="bg-white shadow-md rounded px-8 py-6 w-96">
        <fieldset>
          <legend className="text-lg font-semibold mb-4">Personal information</legend>

          <div className="mb-4">
            <label htmlFor="first_name" className="block text-gray-700 font-medium mb-2">First Name</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              className="border border-gray-300 rounded w-full px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="last_name" className="block text-gray-700 font-medium mb-2">Last Name</label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              className="border border-gray-300 rounded w-full px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="picture" className="block text-gray-700 font-medium mb-2">Picture</label>
            <input
              type="file"
              name="picture"
              id="picture"
              className="border border-gray-300 rounded w-full px-3 py-2"
            />
          </div>
        </fieldset>
      </form>
    </main>
  );
}
