import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti'
import Square from './components/Square';
import WinnerDial from './components/WinnerDial';
import { checkEnd } from './logic/check';
import { checkWinner } from './logic/check';
import { TURNS } from './constants';
import { COLORS } from './constants';


function App() {
  const [turn, setTurn] = useState(TURNS.p1);
  const [board, setBoard]=useState(Array(42).fill(null));
  const [winner, setWinner] = useState(null);//null is not a winner, false is tie

  function resetGame(){ 
    setTurn(TURNS.p1);
    setBoard(Array(42).fill(null))
    setWinner(null);
    setColor(COLORS.c1)
  }

  function makeMove(index){

    if(board[index]!=null)return
    const newBoard = [...board];
    //Made all pieces start from bottom row
    let finalIndex=index;
    const row = Math.floor((finalIndex/7));
    for(let i=(5-row);i>0;i--){
      if(board[finalIndex+7]==null){
        finalIndex+=7;
      }
    }
    newBoard[finalIndex] = turn;
    setBoard(newBoard)

    const newTurn = (turn==TURNS.p1) ? TURNS.p2 : TURNS.p1;
    setTurn(newTurn)
    const newColor = (color==COLORS.c1) ? COLORS.c2 : COLORS.c1;
    setColor(newColor)  

    const newWinner = checkWinner(newBoard);
    //console.log("NewWinner",newWinner)
    if(newWinner){
      setEnable(!enable)
      confetti()
      setWinner(newWinner);
      //console.log("NewWinner inside", winner);
    }else if(checkEnd(newBoard)){
      setEnable(!enable)
      setWinner(false);
    }
  }

  const [enable, setEnable] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState(COLORS.c1);
  useEffect(()=>{
    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
    }

    if (enable) {
      document.addEventListener('pointermove', handleMove)
    }

    return ()=>{
      setPosition({ x: 0, y: 0 })
      document.removeEventListener('pointermove', handleMove)
    }
  },[enable])

  return (
    <>
      <div style={{
          position: 'absolute',
          backgroundColor: `${color}`,
          border: '4px solid black',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
        />
      <main className="board">
        <h1>Connect Four</h1>
        <button onClick={()=>{setEnable(!enable)}}>{enable?"Disable":"Enable"} Follower</button>
        <button onClick={resetGame}>Reset game</button>
        <section className='game'>
          {board.map((element, index)=>{
            //console.log(element);
            return(
            <Square 
            key={index}
            index={index}
            onClick={makeMove}
            element = {element}
            />
            )})}
        </section>
        <section className='turn'>
            <Square
              element={TURNS.p1}
              mark={turn===TURNS.p1}/>
            <Square
              element={TURNS.p2}
              mark={turn===TURNS.p2}/>
        </section>
        <WinnerDial winner={winner} resetGame={resetGame}/>
      </main>
    </>
  )
}

export default App
