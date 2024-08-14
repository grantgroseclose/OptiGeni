import { ApiResponse } from 'apisauce';
import { AxiosRequestConfig } from 'axios';
import { TApiResponse } from '../types/api/ApiResponse';
import api from './ApiInstance';




export type AuthHeader = {
    'x-auth-token': string;
} | undefined;


class APIClient<TReq, TRes> {
    endpoint: string;
    authHeader: AuthHeader;

    constructor(endpoint: string, header?: AuthHeader) {
        this.endpoint = endpoint;
        this.authHeader = header;
    }

    private getHeader = (): AxiosRequestConfig | undefined => {
        return this.authHeader ? { headers: this.authHeader } : undefined;
    };

    getAll = async (): Promise<TRes[]> => {
        const res = await api.get<TRes[]>(this.endpoint, {}, this.getHeader());

        return this.handleResponse(res) as TRes[];
    };

    get = async (): Promise<TRes> => {
        const res = await api.get<TRes>(this.endpoint, {}, this.getHeader());

        return this.handleResponse(res) as TRes;
    };

    post = async (data: TReq): Promise<TRes> => {
        const res = await api.post<TRes>(this.endpoint, data, this.getHeader());

        return this.handleResponse(res) as TRes;
    };

    delete = async (): Promise<void> => {
        await api.delete<TRes>(this.endpoint, {}, this.getHeader());

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

