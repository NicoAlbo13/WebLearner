import PropTypes from "prop-types";
import GifItem from "./GifItem";
import { useFetchGifs } from "../hooks/useFetchGifs";

export const GifGrid = ({category}) => {

    const { images, isLoading} = useFetchGifs(category);


return (
    <>
        <h3>{category}</h3>
        {isLoading && <h2>Loading Images...</h2>}
        <div className="card-grid">
            {images.map((gif)=>(
                <GifItem 
                key={gif.id}
                {...gif}
                />
            ))}
        </div>
    </>
)
}

GifGrid.propType={
    category: PropTypes.string.isRequired,
}
