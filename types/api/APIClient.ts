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

    getAll = async (): Promise<z.infer<z.ZodArray<TRes>> | z.infer<ApiErrorResponse>> => {
        const res = await api.get(this.endpoint, {}, this.getHeader());

        return this.handleResponse(res, true);
    };


    get = async (): Promise<z.infer<TRes> | z.infer<ApiErrorResponse>> => {
        const res = await api.get(this.endpoint, {}, this.getHeader());

        return this.handleResponse(res);
    };

    post = async (data: z.infer<TReq>): Promise<z.infer<TRes> | z.infer<ApiErrorResponse>> => {
        const res = await api.post(this.endpoint, data, this.getHeader());

        return this.handleResponse(res);
    };

    delete = async (data: z.infer<TReq>): Promise<z.infer<TRes> | z.infer<ApiErrorResponse>> => {
                                                        // TODO: Fix param type any
        const res = await api.delete(`${this.endpoint}/delete`, { uId: data.uId }, this.getHeader());

        return this.handleResponse(res);
    };



    protected getHeader = (): AxiosRequestConfig | undefined => {
        return this.header ? { headers: this.header } : undefined;
    };
    

    protected handleResponse = (res: ApiResponse<unknown>, expectArray: boolean = false): z.infer<TRes> | z.infer<z.ZodArray<TRes>> | z.infer<ApiErrorResponse> | Promise<never> => {
        // Check for server-side error
        if (!res.ok) {
            if (res.data && typeof res.data === 'object' && 'error' in res.data) {
                const err = { error: (res.data as { error: string }).error } as z.infer<ApiErrorResponse>;
                // console.log(err);
                return { error: (res.data as { error: string }).error } as z.infer<ApiErrorResponse>;
            }
        }

        // Validate response type
        try {
            if (expectArray) {
                const result = z.array(this.schema).parse(res.data) as z.infer<z.ZodArray<TRes>>;
                return result;
            }
    
            const result = this.schema.parse(res.data) as z.infer<TRes>;
            return result;
        } catch (err) {
            if (err instanceof z.ZodError) {
                // console.log(err);
                return Promise.reject(err);
            }
            return Promise.reject(new Error('An unknown error occurred during response parsing.'));
        }
    }
};





export default APIClient;