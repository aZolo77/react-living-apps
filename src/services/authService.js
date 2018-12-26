// libraries
import jwtDecode from 'jwt-decode';

// services and config files
import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = `${apiUrl}/auth`;
const tokenKey = 'token';

http.setJwt(getJwt());

// getting JWT token
function getJwt() {
  return localStorage.getItem(tokenKey);
}

// Login
export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

// Login with JWT
export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

// Logout
export function logout() {
  localStorage.removeItem(tokenKey);
}

// getting user data from JWT [localStorage]
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    // console.log(ex);
    return null;
  }
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser
};
