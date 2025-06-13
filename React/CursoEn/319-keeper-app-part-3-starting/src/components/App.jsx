import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote){
    //console.log(newNote);
    setNotes((prev)=>{
      return [newNote, ...prev]
    })
  }

  function deleteNote(deleteIndex){
    const newNotes = notes.filter((val, index)=>{
      return !(deleteIndex === index);
    });
    //console.log(newNotes);
    setNotes(newNotes);
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote}/>
      {notes.map((itemNote, index)=>{
        return <Note key={index} id={index} title={itemNote.title} content={itemNote.content} onDelete={deleteNote}/>
      })}
      <Footer />
    </div>
  );
}

export default App;
