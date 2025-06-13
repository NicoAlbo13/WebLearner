import { useState } from "react";
import PropTypes from "prop-types";

export const AddCategory = ({onAddCategory})=> {

    const [inputValue, setInputValue] = useState("");

    const handleChange = (e)=>{
        setInputValue(e.target.value);
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(inputValue.trim().length<=1) return;

        onAddCategory(inputValue.trim());
        setInputValue("");
    }

  return (
    <form onSubmit={handleSubmit} aria-label="form">
        <input 
        type="text" 
        placeholder="Search your Gif"
        value={inputValue}
        onChange={handleChange}
        />
    </form>
  )
}

AddCategory.propTypes = {
  onAddCategory: PropTypes.func.isRequired
}
