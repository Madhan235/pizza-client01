// api.js
import axios from 'axios';

const API_BASE_URL =  `https://pizza-server-1grp.onrender.com
`
const api = axios.create({
  baseURL: API_BASE_URL,
});

 
// https://pizza-server-1grp.onrender.com

// export const createItem = (data) => api.post('/items', data);
// export const getItems = () => api.get('/items');
// export const getItem = (id) => api.get(`/items/${id}`);
// export const updateItem = (id, data) => api.put(`/items/${id}`, data);
// export const deleteItem = (id) => api.delete(`/items/${id}`);

export default api;
