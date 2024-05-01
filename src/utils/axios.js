import axios from 'axios';
// config
import { AUTH_URL, MEMBER_URL, PRIVATE_CHAT_URL, ROOM_URL } from '../config';

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

const axiosMember = axios.create({ baseURL: MEMBER_URL });

axiosMember.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

const axiosPrivateChat = axios.create({ baseURL: PRIVATE_CHAT_URL });

axiosPrivateChat.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export { axiosAuth, axiosRoom, axiosMember, axiosPrivateChat };