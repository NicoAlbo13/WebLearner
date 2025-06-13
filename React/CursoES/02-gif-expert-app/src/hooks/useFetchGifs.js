import { useState, useEffect } from "react";
import getGifs from "../helpers/getGifs";

export const useFetchGifs = (category) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getFinalGifs = async ()=>{
        const newGif = await getGifs(category);
        setData(newGif)
        setIsLoading(false)
    }

    useEffect(() => {
        getFinalGifs();
    }, [])


    return {
        images: data,
        isLoading: isLoading
    }
}
