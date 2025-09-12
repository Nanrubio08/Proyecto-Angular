import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", 
});

// Interceptor para adjuntar el token JWT en cada petición
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
        const msg = error.response?.data?.msg || 'Error de red';
        if (msg==='Token no valido') {
            localStorage.removeItem('token')
            window.location.href = '/home'
        }
        return Promise.reject(error);
    }
  )
 
  export default api;