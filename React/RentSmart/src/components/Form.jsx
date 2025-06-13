import React, { useState } from "react";

function Form(props){
    const inputs = props.inputs;

    function handleInputs(item, index){
        console.log(item);
        return(
        <input  key={index} type={item.type} name={item.name.toLowerCase()} placeholder={item.name}/>)
    }

    return(
        <div>
            <form action={props.route}>
            <h1>{"User "+props.name}</h1>
            {inputs.map(handleInputs)}
            <button>{props.name}</button>
            </form>
        </div>
    )
}

export default Form;
