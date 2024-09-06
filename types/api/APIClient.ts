import { ApiResponse, ApisauceInstance } from "apisauce";
import { AuthHeader } from "./AuthHeader";
import api from "../../services/ApiInstance";
import { AxiosRequestConfig } from "axios";
import { z } from "zod";




export type  ApiErrorResponse = z.ZodObject<{ error: z.ZodString }>;


class APIClient<TReq extends z.ZodTypeAny, TRes extends z.ZodTypeAny> {
    protected api: ApisauceInstance;
    protected endpoint: string;
    protected header: AuthHeader;
    protected schema: TRes;

    constructor(api: ApisauceInstance, endpoint: string, schema: TRes, header?: AuthHeader) {
        this.api = api;
        this.endpoint = endpoint;
        this.schema = schema;
        this.header = header;
    }

    getAll = async () => {
        const res = await api.get(this.endpoint, {}, this.getHeader());

        if (!res.ok) {
            if (res.data && typeof res.data === 'object' && 'error' in res.data) {
                const err = { error: (res.data as { error: string }).error } as z.infer<ApiErrorResponse>;
                return err;
            }
        }
            
        return res.data as z.infer<z.ZodArray<TRes>>;
    };


    get = async () => {
        const res = await api.get(this.endpoint, {}, this.getHeader());

        if (!res.ok) {
            if (res.data && typeof res.data === 'object' && 'error' in res.data) {
                const err = { error: (res.data as { error: string }).error } as z.infer<ApiErrorResponse>;
                return err;
            }
        }

        return res.data as z.infer<TRes>;
    };

    post = async (data: z.infer<TReq>) => {
        const res = await api.post(this.endpoint, data, this.getHeader());

        if (!res.ok) {
            if (res.data && typeof res.data === 'object' && 'error' in res.data) {
                const err = { error: (res.data as { error: string }).error } as z.infer<ApiErrorResponse>;
                return err;
            }
        }

        return res.data as z.infer<TRes>;
    };

    delete = async (data: z.infer<TReq>) => {
                                                        // TODO: Fix param type any
        const res = await api.delete(`${this.endpoint}/delete`, { uId: data.uId }, this.getHeader());

        if (!res.ok) {
            if (res.data && typeof res.data === 'object' && 'error' in res.data) {
                const err = { error: (res.data as { error: string }).error } as z.infer<ApiErrorResponse>;
                return err;
            }
        }

        return res.data as z.infer<TRes>;
    };


    protected getHeader = (): AxiosRequestConfig | undefined => {
        return this.header ? { headers: this.header } : undefined;
    };
};





export default APIClient;