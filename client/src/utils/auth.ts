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