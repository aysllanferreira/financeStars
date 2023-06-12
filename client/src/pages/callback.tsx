import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const hashParams = new URLSearchParams(router.asPath.split('#')[1]);
    const idToken = hashParams.get('id_token');

    if (idToken) {
      const url = `${process.env.NEXT_PUBLIC_ENDPOINT}/auth/auth0`;
      const saveToken = async () => {
        try {
          const token = idToken;
          
          await axios.post(url, { token }, { withCredentials: true });
          router.push('/app/dashboard');
        } catch (err) {
          console.log(err);
        }
      }
      saveToken();
    }
  }, [router]);

  return <div>Loading...</div>;
}
