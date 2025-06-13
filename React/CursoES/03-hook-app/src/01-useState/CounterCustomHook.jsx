import { useCounter } from "../hooks/useCounter"

export const CounterCustomHook = () => {

    const { counter, increment, reset, decrement } = useCounter()

  return (
    <>
        <h1>Counter with Hook: {counter}</h1>
        <hr />

        <button className="btn btn-primary" onClick={()=>increment(3)}>+3</button>
        <button className="btn btn-primary" onClick={reset}>Reset</button>
        <button className="btn btn-primary" onClick={()=>decrement(2)}>-2</button>
    </>
  )
}
