import axios from 'axios';

export const searchUser = async (term: string) => {
  const res = await axios.get(`https://api.github.com/users/${term}`);
  return res.data;
};
