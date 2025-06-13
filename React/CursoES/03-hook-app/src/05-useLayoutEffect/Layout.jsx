import { useFetch } from "../hooks/useFetch"
import { useCounter } from '../hooks/useCounter'
import { Loading } from "../03-examples/Loading";
import { PokemonCard } from "../03-examples/PokemonCard";

export const Layout = () => {

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
        onClick={()=> (counter>1 ? decrement(): null)}
        >
          Previous
        </button>
        <button 
        className="btn btn-primary mt-3"
        onClick={()=>increment()}
        >
          Next
        </button>
    </>
  )
}
