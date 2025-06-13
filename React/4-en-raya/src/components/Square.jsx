import React from "react";

function Square({element, onClick, index, mark}){

    function handleClick(){
        onClick(index)
    }

    return(
        <div onClick={handleClick} className="square" style={mark?{"color": "#fff", "background": "#09f"}:null}>
        {element}
        </div>
    )
}

export default Square;
