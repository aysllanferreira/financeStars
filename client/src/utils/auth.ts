import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_ENDPOINT || 'http://localhost:4000/dev';

export const signUp = async (email: string, password: string) => {
  try {
    const { data } = await axios.post(`${URL}/auth/signup`, {
      email,
      password,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};