import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Aquí debes colocar la URL base de tu API
  headers: {
    'Content-Type': 'application/json', // Tipo de contenido JSON por defecto
  },
});

// Función para establecer el token JWT en los encabezados de autorización
export const setAuthToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export default axiosInstance;
