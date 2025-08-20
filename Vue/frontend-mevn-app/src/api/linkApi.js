import axios from "axios";


const linkApi = axios.create({
    baseURL: 'http://localhost:3000/api',
    // Activate credentials so we can receive a cookie
    withCredentials: true
});

export default linkApi;
