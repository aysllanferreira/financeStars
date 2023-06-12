import React from 'react';

export default function OAuthGoogle() {
  const handleClick = () => {
    const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN || '';
    const clientId = process.env.NEXT_PUBLIC_COGNITO_ID || '';
    const redirectUri = process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URL || '';

    window.location.href = `${domain}/oauth2/authorize?identity_provider=Google&redirect_uri=${redirectUri}&response_type=token&client_id=${clientId}&scope=email+openid+profile`;
  };

  return <button className='bg-red-500 text-white rounded px-4 py-2 font-semibold hover:bg-red-600 focus:outline-none focus:bg-red-600 w-full' onClick={handleClick}>Login with Google</button>;
}
