import { useEffect, useState } from 'react';

const localCache = {};

export const useFetch = (url) => {

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        errorMessage: null,
    })

    useEffect(()=>{
        getFetch()
    },[url])

    const seLoadingState = ()=>{
        setState({
        data: null,
        isLoading: true,
        hasError: false,
        errorMessage: null,
        })  
    }


    const getFetch = async ()=>{
        seLoadingState();

        //if data already on cache retrieve from there
        if(localCache[url]){
            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                errorMessage: null,
            });
            return;
        }

        const response = await fetch(url);

        await new Promise(resolve => setTimeout(resolve, 900))

        if(!response.ok){
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                errorMessage: {
                    code: response.status,
                    message: response.statusText
                },
            })

            return;
        }

        const data = await response.json();
        setState({
            data: data,
            isLoading: false,
            hasError: false,
            errorMessage: null,
        })

        // console.log({data});
        //save to cache
        localCache[url]=data;
    }

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError
  }
}
