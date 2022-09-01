import axios from 'axios';

const api = axios.create({
    baseURL: 'https://todoo.5xcamp.us/',
});


export { api }