import axios from 'axios';

const api = axios.create({
    baseURL: `https://my-json-server.typicode.com/wejesuss/s1cket/db`,
    method: 'GET',
});

export default api;
