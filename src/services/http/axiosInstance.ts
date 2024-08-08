import axios from 'axios';
import { useHistory } from 'react-router';

const axiosInstance = axios.create({
  baseURL: "http://192.168.0.20:5001/api/v2", // Aquí debes colocar la URL base de tu API
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
