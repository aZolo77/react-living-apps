// libraries
import axios from 'axios';
import { toast } from 'react-toastify';

// services

import logger from './logService';

// Interceptors usage to handle unexpected errors (ex: network down, server down, DB down, bug)
axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    // - Display a generic & friendly msg
    logger.log(error);
    toast.error('An unexpected Error occured');
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
