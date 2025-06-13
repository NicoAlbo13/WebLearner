import Square from "./Square";

function WinnerDial(props){
    //console.log(props)
    if(props.winner==null) return null;
    const text = props.winner ? "Winner" : "Tie";
    return(
        <section className='winner'>
            <div className='text'>
                <h2>{text}</h2>
                <header className='win'>
                {
                props.winner ? (<Square element={props.winner}/>) : null
                }
                </header>
                <footer>
                <button onClick={props.resetGame}>Reset Game</button>
                </footer>
            </div>
        </section>
    )
}

export default WinnerDial