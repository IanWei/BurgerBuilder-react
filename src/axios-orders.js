import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-1d8f3.firebaseio.com/'
});

export default instance;