import React from "react";
import { useState } from "react";

function App() {

  const [item, setItem] = useState("");
  const [listItem, setList] = useState([]);

  function saveText(e){
    const newItem = e.target.value;
    setItem(newItem);
  }

  function newItem(){
    setList((prev)=>{return [item,...prev]});
    setItem("");
  }


  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input type="text" onChange={saveText} value={item}/>
        <button onClick={newItem}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {listItem.map((i)=>{
            return <li key={i}>{i}</li>
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
