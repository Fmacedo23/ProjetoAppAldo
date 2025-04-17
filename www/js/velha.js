document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll('.cell');
    const playerTurn = document.getElementById('playerTurn');
    const statusMessage = document.querySelector('.status');
  
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;
  
    function makeMove(index) {
      if (board[index] !== '' || !gameActive) return;
  
      board[index] = currentPlayer;
      document.getElementById(`cell${index}`).innerText = currentPlayer;
  
      if (checkWinner()) {
        statusMessage.innerHTML = `Jogador ${currentPlayer} venceu!`;
        gameActive = false;
      } else if (board.every(cell => cell !== '')) {
        statusMessage.innerHTML = 'Empate!';
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerTurn.innerText = currentPlayer;
        statusMessage.innerHTML = `Vez de ${currentPlayer}`;
      }
    }
  
    function checkWinner() {
      const combos = [
        [0,1,2],[3,4,5],[6,7,8], // linhas
        [0,3,6],[1,4,7],[2,5,8], // colunas
        [0,4,8],[2,4,6]          // diagonais
      ];
  
      return combos.some(([a,b,c]) => 
        board[a] && board[a] === board[b] && board[a] === board[c]
      );
    }
  
    function resetGame() {
      board = ['', '', '', '', '', '', '', '', ''];
      currentPlayer = 'X';
      gameActive = true;
      playerTurn.innerText = currentPlayer;
      statusMessage.innerHTML = `Vez de ${currentPlayer}`;
      cells.forEach(cell => cell.innerText = '');
    }
  
    window.makeMove = makeMove;
    window.resetGame = resetGame;
  });
  