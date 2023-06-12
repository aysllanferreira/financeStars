import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_ENDPOINT || 'http://localhost:4000/dev';

interface User {
  email: string;
  password: string;
}

export const signUp = async (user : User) => {
  try {
    const { data } = await axios.post(`${URL}/auth/signup`, {
      email: user.email,
      password: user.password,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

interface SignInResponse {
  email: string;
  code: string;
}

export const confirmSignUp = async (info : SignInResponse) => {
  try {
    const { data } = await axios.post(`${URL}/auth/confirmation`, {
      email: info.email,
      code: info.code,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};