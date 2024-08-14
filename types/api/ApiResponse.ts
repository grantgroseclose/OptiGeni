export type TApiOkResponse<TResData> =  TResData | TResData[];
export type         TApiErrResponse  =  { error: string; };

export type TApiResponse<TResData> = TApiOkResponse<TResData> | TApiErrResponse;