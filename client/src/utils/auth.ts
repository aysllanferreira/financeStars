import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_ENDPOINT || 'http://localhost:4000/dev';

interface User {
  email: string;
  password: string;
}

interface SignInResponse {
  email: string;
  code: string;
}

interface SignIn {
  email: string;
  password: string;
}

export const signUp = async (user: User) =>
  axios.post(`${URL}/auth/signup`, {
    email: user.email,
    password: user.password,
  });

export const confirmSignUp = async (info: SignInResponse) =>
  axios.post(
    `${URL}/auth/confirmation`,
    {
      email: info.email,
      code: info.code,
    },
    { withCredentials: true },
  );

export const signIn = async (user: SignIn) =>
  axios.post(
    `${URL}/auth/signin`,
    {
      email: user.email,
      password: user.password,
    },
    { withCredentials: true },
  );

export const GetMe = async () => axios.get(`${URL}/auth/me`, { withCredentials: true });
