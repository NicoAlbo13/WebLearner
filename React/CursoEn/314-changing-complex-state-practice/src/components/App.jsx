import React, { useState } from "react";

function App() {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: ""
  });

  function handleChange(e){
    //console.log(e.target.value);
    const {name, value} = e.target;
    //console.log(name, value)

    setContact((prev)=>{
      if(name === "fName"){
        return {fName: value, lName: prev.lName, email: prev.email}
      }else if(name === "lName"){
        return {fName: prev.fName, lName: value, email: prev.email}
      }else{
        return {fName: prev.fName, lName: prev.lName, email: value}
      }
    });
  }

  return (
    <div className="container">
      <h1>
        Hello {contact.fName} {contact.lName}
      </h1>
      <p>{contact.email}</p>
      <form>
        <input name="fName" placeholder="First Name" onChange={handleChange} value={contact.fName}/>
        <input name="lName" placeholder="Last Name" onChange={handleChange} value={contact.lName}/>
        <input name="email" placeholder="Email" onChange={handleChange} value={contact.email}/>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
