export function checkEnd(board){ 
    //console.log(board)
    for(let i=0;i<board.length;i++){
      if(board[i]===null){
        //console.log("Data",board[i], i)
        return false;
      }
    }
    return true;
  }

export function checkWinner(board) {
    for (let i = 0; i < board.length; i++) {
      if (board[i] != null) {
        if (
          checkRow(board, i) ||
          checkCol(board, i) ||
          checkDiagonal(board, i)
        ) return board[i];
      }
    }
    return false;
}

function checkRow(board, i) {
    const player = board[i];
    const row = Math.floor(i / 7);
    const col = i % 7;
    if (col > 3) return false; // Not enough room to the right
    for (let offset = 1; offset < 4; offset++) {
      if (board[i + offset] !== player) return false;
    }
    return true;
}

function checkCol(board, i) {
    const player = board[i];
    const row = Math.floor(i / 7);
    const col = i % 7;
    if (row > 2) return false; // Not enough room downward
    for (let offset = 1; offset < 4; offset++) {
      if (board[i + offset * 7] !== player) return false;
    }
    return true;
}

function checkDiagonal(board, i) {
    const player = board[i];
    const row = Math.floor(i / 7);
    const col = i % 7;

    // Check down-right diagonal
    if (row <= 2 && col <= 3) {
      if (
        board[i + 8] === player &&
        board[i + 16] === player &&
        board[i + 24] === player
      ) return true;
    }
  
    // Check down-left diagonal
    if (row <= 2 && col >= 3) {
      if (
        board[i + 6] === player &&
        board[i + 12] === player &&
        board[i + 18] === player
      ) return true;
    }
  
    return false;
}
