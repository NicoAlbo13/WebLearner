import { useRef } from "react"

export const FocusScreen = () => {

    const focus = useRef();
    // console.log(focus);
    
    const handleClick = ()=>{
        focus.current.select();
    }

    return (
    <>
        <h1>FocusScreen</h1>
        <hr />

        <input
        ref={focus}
        type="text"
        placeholder="Type your name"
        className="form-control"
        />

        <button 
        onClick={handleClick}
        className="btn btn-primary mt-3"
        >
            Focus
        </button>
    </>
    )
}
