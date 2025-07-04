import axios from 'axios'
import {getEnvVariables} from '../helpers/getEnvVariables'

const  { VITE_APIURL } = getEnvVariables();

const calendarApi = axios.create({
    baseURL: VITE_APIURL
});

//Config interceptors
calendarApi.interceptors.request.use( config => {
    //all the requests will include this header
    config.headers = {
        ...config.headers, //keep other headers (just in case)
        'x-token': localStorage.getItem('token'),
    }

    return config;
} )



export default calendarApi;
