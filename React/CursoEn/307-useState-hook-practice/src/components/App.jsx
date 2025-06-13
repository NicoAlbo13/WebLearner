import React, { useState } from "react";

function App() {
  let time = new Date().toLocaleTimeString();
  console.log(time);
  const [usetime, newTime] = useState(time);

  function getTime(){
    let Rtime = new Date().toLocaleTimeString();
    newTime(Rtime)
  }

  setInterval(getTime, 100);
  return (
    <div className="container">
      <h1>{usetime}</h1>
      <button onClick={getTime}>Get Time</button>
    </div>
  );
}

export default App;
