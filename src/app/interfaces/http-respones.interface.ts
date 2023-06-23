export interface HttpResponseApi<T>{
    OK: boolean;
    msg:    string;
    data?:  T;
}
export interface HttpResponseApiArray<T>{
    OK: boolean;
    msg:    string;
    data:  T[];
}