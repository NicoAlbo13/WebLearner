import React, { useMemo, useState } from 'react'
import { useCounter } from '../hooks/useCounter';


const heavy = (iterations=100)=> {
    for(let i=0; i<iterations;i++){
        console.log("working...");
    }
    return `${iterations} iterations completed!`
}

export const MemoHook = () => {
    const { counter, increment } = useCounter(1000);
    const [ show, setShow ] = useState(true);

    const memoValue = useMemo(() => heavy(counter), [counter])

    return (
        <>
            <h1>Counter:  <small>{counter}</small></h1>
            <hr />

            <h4>{memoValue}</h4>

            <button
                className="btn btn-primary"
                onClick={ () => increment() }
            >
                +1
            </button>

            <button
                className="btn btn-outline-primary"
                onClick={ () => setShow( !show )  }
            >
                Show/Hide { JSON.stringify(show) } 
            </button>
        
        </>
    )
}
