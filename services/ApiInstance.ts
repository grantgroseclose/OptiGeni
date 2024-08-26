import { create } from 'apisauce';


const api = create({
    baseURL: 'http://192.168.1.84:3000/api',
    headers: {
      'Accept': 'application/json'
    }
});



export default api;