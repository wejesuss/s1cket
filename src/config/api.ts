import axios from 'axios';

const api = axios.create({
    baseURL: `https://www.alphavantage.co/query`,
    method: 'GET',
});

api.interceptors.request.use((config) => {
    config.params = config.params || {};
    config.params['apikey'] = process.env.ALPHA_VANTAGE_KEY;
    return config;
});

export default api;
