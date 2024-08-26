import { ApiResponse, ApisauceInstance } from "apisauce";
import { AuthHeader, IdParam } from "./AuthHeader";
import api from "../../services/ApiInstance";
import { AxiosRequestConfig } from "axios";
import { z } from "zod";




class APIClient<TReq extends z.ZodTypeAny, TRes extends z.ZodTypeAny, TResRaw = undefined> {
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

    getAll = async (): Promise<TResRaw[]> => {
        const res = await api.get(this.endpoint, {}, this.getHeader());

        return this.handleResponse(res, true);
    };


    get = async (): Promise<z.infer<TRes>> => {
        const res = await api.get(this.endpoint, {}, this.getHeader());

        return this.handleResponse(res);
    };

    post = async (data: z.infer<TReq>): Promise<z.infer<TRes>> => {
        const res = await api.post(this.endpoint, data, this.getHeader());

        return this.handleResponse(res);
    };

    delete = async (data: z.infer<TReq>): Promise<z.infer<TRes>> => {
                                                        // TODO: Fix param type any
        const res = await api.delete(`${this.endpoint}/delete`, { uId: data.uId }, this.getHeader());

        return this.handleResponse(res);
    };


    protected getHeader = (): AxiosRequestConfig | undefined => {
        return this.header ? { headers: this.header } : undefined;
    };

    protected handleResponse = (res: ApiResponse<unknown>, expectArray: boolean = false): z.infer<TRes> | z.infer<z.ZodArray<z.infer<TRes>>> | Promise<never> => {
        try {
            if (expectArray) {
                const result = z.array(this.schema).parse(res.data) as z.infer<z.ZodArray<z.infer<TRes>>>;

                return result;
            }

            const result = this.schema.parse(res.data) as z.infer<TRes>;

            return result;
        } catch (err) {
            if (err instanceof z.ZodError) {
                return Promise.reject(err);
            }
        }
    };
};


export default APIClient;