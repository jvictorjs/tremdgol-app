import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.tremdgol.com',
    headers: { "Cache-Control": "no-cache" } 
});

export default api;