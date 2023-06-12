import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { GetMe } from './auth';
import { setMe } from '../redux/actions/auth';

const useMe = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const me = useSelector((state: any) => state.auth.me);

  useEffect(() => {
    if (!me) {
      GetMe()
        .then((res) => {
          dispatch(setMe(res.data));
        })
        .catch(() => {
          router.push('/auth/sign-in');
        });
    }
  }, [me, dispatch, router]);

  return me;
};

export default useMe;
