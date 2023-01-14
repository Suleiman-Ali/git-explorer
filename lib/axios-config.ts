import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    Authorization: `token ${process.env.NEXT_PUBLIC_API_KEY}`,
    accept: 'application/vnd.github+json',
  },
});
