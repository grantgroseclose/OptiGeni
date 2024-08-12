import { create, ApiResponse } from 'apisauce';
import { TApiResponse } from '../types/ApiResponse';




const api = create({
    baseURL: 'http://10.0.0.29:3000/api',
    headers: {
      'Accept': 'application/json',
    },
});


class APIClient<TReq, TRes> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll = async (): Promise<TRes[]> => {
        const res = await api.get<TRes[]>(this.endpoint);

        return this.handleResponse(res) as TRes[];
    };

    get = async (): Promise<TRes> => {
        const res = await api.get<TRes>(this.endpoint);

        return this.handleResponse(res) as TRes;
    };

    post = async (data: TReq): Promise<TRes> => {
        const res = await api.post<TRes>(this.endpoint, data);

        return this.handleResponse(res) as TRes;
    };

    delete = async (): Promise<void> => {
        await api.delete<TRes>(this.endpoint);

        return;
    };

    private handleResponse = (res: ApiResponse<TRes | TRes[]>): TApiResponse<TRes> => {
        if (res.data && typeof res.data === 'object' && 'error' in res.data && res.data.error !== "") {
            return { error: res.data.error as string } as TApiResponse<TRes>;
        }

        return res.data as TApiResponse<TRes>;
    };
}




export default APIClient;

