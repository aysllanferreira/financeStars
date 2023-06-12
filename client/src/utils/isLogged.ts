import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { GetMe } from './auth';
import { setMe } from '../redux/actions/auth';

const useIsLogged = () => {
  const router = useRouter();
  const me = useSelector((state: any) => state.auth.me);

  useEffect(() => {
    if (me) {
      router.push('/app/dashboard');
    } else {
      GetMe()
        .then((res) => {
          setMe(res.data);
          router.push('/app/dashboard');
        })
        .catch(() => {
          return;
        });
    }
  }, [me, router]);

  return me;
};

export default useIsLogged;
