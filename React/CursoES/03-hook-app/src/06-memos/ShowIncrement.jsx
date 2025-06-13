import React from "react";

export const ShowIncrement = React.memo(({increment}) => {

    console.log('running in the back :(');
    
  return (
    <button
    className="btn btn-primary"
    onClick={()=>{increment(3)}}
    >
        Add
    </button>
  )
})
