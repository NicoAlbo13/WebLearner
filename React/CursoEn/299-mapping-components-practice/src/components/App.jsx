import React from "react";
import Entry from "./Entry";
import emojipedia from "../emojipedia";



function App() {
  const emote=emojipedia.map((item)=>{
    return item.meaning.substring(0,99);
  })
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>
      { console.log(emote)}
      <dl className="dictionary">
        {emojipedia.map(emoji =>(<Entry 
        key={emoji.id} 
        emoji={emoji.emoji} 
        name={emoji.name} 
        meaning={emoji.meaning}/>))}
      </dl>
    </div>
  );
}

export default App;
