import { useCallback, useState } from "react";
import { ShowIncrement } from "./ShowIncrement";

export const CallbackHook = () => {
    const [ counter, setCounter ] = useState(10);

    const increment = useCallback((val=1)=>{
        setCounter(prev=>prev+val);
    },[])

  return (
    <>
    <h1>useCallback Hook: { counter }</h1>
    <hr />

    <ShowIncrement increment={increment}/>
    </>
  )
}
