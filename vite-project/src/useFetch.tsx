import { useState, useEffect } from 'react';

const useFetch = (url: string): { data: any[], isPending: boolean, error: string | null } => {
    const [data, setData] = useState<any[]>([]);
    const [isPending, setIsPending] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
                .then(res => {
                    if (!res.ok) {
                        throw Error('Could not fetch the data for that resource');
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data);
                    setIsPending(false);
                    setError(null);
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        console.log('fetch aborted');
                        return;
                    } else {
                        console.log(err.message);
                        setIsPending(false);
                        setError(err.message);
                    }
                });
        }, 2000);

        return () => abortCont.abort();
    }, [url]);

    return { data, isPending, error };
};

export default useFetch;
