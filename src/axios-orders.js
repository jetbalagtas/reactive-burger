import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://reactive-burger-jet.firebaseio.com/'
});

export default instance;
