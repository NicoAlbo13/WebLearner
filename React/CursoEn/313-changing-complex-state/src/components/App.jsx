import React, { useState } from "react";

function App() {

  const [fName, setFName ] = useState("");

  const [lName, setLName] = useState("");

  return (
    <div className="container">
      <h1>Hello {fName} {lName}</h1>
      <form>
        <input name="fName" placeholder="First Name" onChange={(e)=>{setFName(e.target.value)}} value={fName}/>
        <input name="lName" placeholder="Last Name" onChange={(e)=>{setLName(e.target.value)}} value={lName}/>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
