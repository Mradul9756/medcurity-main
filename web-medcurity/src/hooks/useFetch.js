import {useEffect, useState} from 'react';
import axios from 'axios';

export function useFetch (url) {

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [serverError, setServerError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        
        async function fetchData () {
            try{
                const res = await axios.get(url);
                const resData = await res?.data;
                
                setData(resData);
                setIsLoading(false);

            } catch (error) {
                setServerError(error);
                setIsLoading(false);
            }
        }

        fetchData();

    }, [url]);
    
    return {isLoading, data, serverError}
}
