
// export type TApiOkResponse<TResData> =  { ok: true; data: TResData | TResData[]; };
// export type         TApiErrResponse  =  { ok: false; error: string; };


export type TApiOkResponse<TResData> =  TResData | TResData[];
export type         TApiErrResponse  =  { error: string; };

export type TApiResponse<TResData> = 
    | TApiOkResponse<TResData>
    | TApiErrResponse;

