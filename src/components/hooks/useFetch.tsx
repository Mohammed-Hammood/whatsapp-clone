import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { MethodTypes } from "types";
import { CustomError } from 'utils';


interface InitialRequest {
    method: MethodTypes;
    headers: {
        [key: string]: string
    },
    body?: any
}

type Props = {
    callback?: ({ data, method, url }: any) => void;
    url?: string | null;
    showMessage?: boolean;
    condition?: ((res: any) => boolean) | boolean;
    headers?: any;
    loading?: boolean;
    method?: MethodTypes;
    data?: any;
};

function useFetch(props: Props) {
    const [loading, setLoading] = useState<boolean>(props.loading !== undefined ? props.loading : false);
    const [callback, setCallback] = useState<((value: any) => void) | null>(() => props.callback || null);
    const [message, setMessage] = useState<null | { status: number, message: string }>(null)
    const [method, setMethod] = useState<MethodTypes>(props.method || "GET");
    const [data, setData] = useState<any>(props.data || null);
    const [url, setUrl] = useState<string | null | undefined>(props.url);
    const dispatch = useDispatch();

    useEffect(() => {
        const headers = props.headers || { 'Content-Type': 'application/json', };
        const options: InitialRequest = {
            headers: headers,
            method: method
        }
        if (data && ['POST', 'PUT', 'DELETE'].includes(method)) options.body = JSON.stringify(data);

        const sendRequest = async (url: string): Promise<void> => {
            try {
                const req = await fetch(url, options);
                if (req.status !== 200) {
                    throw new CustomError({ message: req.statusText, status: req.status, ok: req.ok, type: req.type });
                }
                const res = await req.json();
                if (callback) {
                    callback(res);
                }
            } catch (err: any) {
                setMessage({ status: err.status, message: err.message });
            } finally {
                setLoading(false);
                setUrl(null);
            }
        }
        if (url && !loading) {
            setLoading(true);
            setMessage(null);
            sendRequest(url);
        }
         // eslint-disable-next-line 
    }, [dispatch, url, loading, data, message,  method,  props.headers, setUrl, setMethod, setLoading, props])
    return {
        loading,
        message,
        method,
        url,
        setUrl,
        setMessage,
        setData,
        setMethod,
        setLoading,
        setCallback,
    }
}
export default useFetch;