import axios from 'axios';

const ApiConn = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default ApiConn;
