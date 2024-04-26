import axios from 'axios';
// config
import { AUTH_URL, ROOM_URL } from '../config';

// ----------------------------------------------------------------------

const axiosAuth = axios.create({ baseURL: AUTH_URL });

axiosAuth.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

const axiosRoom = axios.create({ baseURL: ROOM_URL });

axiosRoom.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export { axiosAuth, axiosRoom };