import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const hashParams = new URLSearchParams(router.asPath.split('#')[1]);
    const idToken = hashParams.get('id_token');

    if (idToken) {
      localStorage.setItem('id_token', idToken);
      router.push('/'); // or redirect to other page
    }
  }, [router]);

  return <div>Loading...</div>;
}
