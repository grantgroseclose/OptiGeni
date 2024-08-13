import { create } from 'apisauce';


const api = create({
    baseURL: 'http://10.0.0.29:3000/api',
    headers: {
      'Accept': 'application/json'
    }
});



export default api;