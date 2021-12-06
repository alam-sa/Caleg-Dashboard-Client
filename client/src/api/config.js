import axios from 'axios';
export default axios.create({
    baseURL: `http://localhost:3001/api/`// development environment
    // baseURL: `${process.env.REACT_APP_API_URL}`// staging environment
})