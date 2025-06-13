import React from "react";
import { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({title:"", content:""});

  function handleNote(e){
    const {name, value} = e.target;

    setNote((prev)=>{
      return {
        ...prev,
        [name]:value
      }
    })
  }

  function handleAdd(e){
    e.preventDefault();
    props.onAdd(note);
    setNote({title:"", content:""})
  }

  return (
    <div>
      <form>
        <input name="title" placeholder="Title" onChange={handleNote} value={note.title}/>
        <textarea name="content" placeholder="Take a note..." rows="3" onChange={handleNote} value={note.content}/>
        <button onClick={handleAdd}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
