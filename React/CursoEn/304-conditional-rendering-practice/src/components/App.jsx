import React from "react";
import Form from "./Form";

var userIsRegistered = false;

function App() {
  return (
    <div className="container">
      <Form type={userIsRegistered}/>
      
    </div>
  );
}

export default App;
