import axios from 'axios';

// Mac
  // baseURL: "http://10.0.0.86:3000/api"

// Win
  // baseURL: "http://10.0.0.29:3000/api"


const axiosInstance = axios.create({
  baseURL: 'http://10.0.0.29:3000/api',
});


class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async () => {
    return axiosInstance
      .get<T[]>(this.endpoint)
      .then((res) => res.data);
  }

  post = async (data: T) => {
    return axiosInstance
      .post<T>(this.endpoint, data)
      .then(res => res.data);
  }

  delete = async (id: string) => {
    return axiosInstance
      .delete<T>(`${this.endpoint}/delete/${id}`)
      .then(res => res.data);
  }
}




export default APIClient;

