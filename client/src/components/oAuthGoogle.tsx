export default function oAuthGoogle() {
  const handleClick = () => {
    const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN || '';
    const clientId = process.env.NEXT_PUBLIC_COGNITO_ID || '';
    const redirectUri = process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URL || '';

    window.location.href = `${domain}/oauth2/authorize?identity_provider=Google&redirect_uri=${redirectUri}&response_type=token&client_id=${clientId}&scope=email+openid+profile`;
  };

  return <button onClick={handleClick}>Login with Google</button>;
}
