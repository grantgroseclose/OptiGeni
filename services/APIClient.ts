import axios, { AxiosResponse } from 'axios';




export const axiosInstance = axios.create({
    baseURL: 'http://10.0.0.29:3000/api',
    // withCredentials: true
});


// axiosInstance.interceptors.request.use((config) => {
//     const token = useAuthStore.getState().token;
//     config.headers.Authorization = `Bearer ${token}`;
//     return config;
// });


class APIClient<ReqT, ResT> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    get = async () => {
        return axiosInstance
            .get<ReqT>(this.endpoint)
            .then((res) => res.data);
    }

    getAll = async () => {
        return axiosInstance
            .get<ReqT[]>(this.endpoint)
            .then((res) => res.data);
    }

    post = async (data: ReqT): Promise<ResT> => {
        return axiosInstance
            .post<ReqT, AxiosResponse<ResT>>(this.endpoint, data)
            .then(res => res.data);
    }

    delete = async (id: string) => {
        return axiosInstance
            .delete<ReqT>(`${this.endpoint}/delete/${id}`)
            .then(res => res.data);
    }
}




export default APIClient;

