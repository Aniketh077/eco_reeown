import axios from 'axios';

// Normalize base URL - remove trailing /api if present, then add it
let BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

// Remove trailing slash
BASE_URL = BASE_URL.replace(/\/$/, '');

// Remove /api if it exists at the end (to prevent double /api/api)
if (BASE_URL.endsWith('/api')) {
  BASE_URL = BASE_URL.slice(0, -4);
}

// Add /api to base URL
BASE_URL = `${BASE_URL}/api`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000, 
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // console.log(`Making ${config.method.toUpperCase()} request to: ${config.baseURL}${config.url}`);
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => {
//     console.log(`Response from ${response.config.url}:`, response.status);
//     return response;
//   },
//   (error) => {
//     console.error('Response interceptor error:', error.response || error);
    
//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized access
//       localStorage.removeItem('user');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;