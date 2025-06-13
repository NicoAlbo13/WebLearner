import { useFetch, useCounter } from "../hooks"
import { Loading } from "./Loading";
import { PokemonCard } from "./PokemonCard";

export const MultipleCustomHooks = () => {

  const { counter, increment, decrement } = useCounter(1);
  const {  data, hasError, isLoading } = useFetch(`https://pokeapi.co/api/v2/pokemon/${counter}`);

  return (
    <>
        <h1>Pokemon Info</h1>
        <hr />

        {isLoading? 
        <Loading/>
        : <PokemonCard 
        id={data.id} 
        name={data.name}
        sprites={[
          data.sprites.front_default,
          data.sprites.back_default,
          data.sprites.front_shiny,
          data.sprites.back_shiny,
        ]}
        />
        }

        <button 
        className="btn btn-primary mt-3"
        disabled={ isLoading }
        onClick={()=> (counter>1 ? decrement(): null)}
        >
          Previous
        </button>
        <button 
        className="btn btn-primary mt-3"
        disabled={ isLoading }
        onClick={()=>increment()}
        >
          Next
        </button>
    </>
  )
}
