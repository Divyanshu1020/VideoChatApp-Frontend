import env from '@/constants/env';
import axios from 'axios';

export default axios.create({
    baseURL: env.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        // Add other default headers if needed
    },
    withCredentials: true
})