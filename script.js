let player1 = createPlayer('x');
let player2 = createPlayer('o');
let currentPlayer = player1;

function createGameboard() {
    let gameboardArray = [
        ["-", "-", "-"],
        ["-", "-", "-"],
        ["-", "-", "-"]
    ];
    
    // Function to print out the board
    function printGameboard() {
        console.log(gameboardArray);
    }

    return { gameboardArray, printGameboard };
}

function createPlayer(symbol) {
    return { symbol };
}

function createGame(player1, player2) {
    let gameboard = createGameboard();
    
    function game(movePlayer, player) {
        // Apply the move to the game board
        gameboard.gameboardArray[movePlayer[0]][movePlayer[1]] = player.symbol;
        
        //update button

        document.getElementById(`btn-${movePlayer[0]}-${movePlayer[1]}`).textContent = currentPlayer.symbol;


        // Print the state of the game board after the move
        console.log("Board after move:");
        gameboard.printGameboard();
        
        // Check for a winner
        if (checkWinnerPlayer(player)) {
            console.log(`${player.symbol} wins`);
            disableButtons();
            document.getElementById("result").textContent = "player: " + player.symbol + " wins!";
        }

        if (checkFull()) {
            console.log("Board is full");
            disableButtons();
        }

        //swap currentPlayer
        if(player == player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    function checkWinnerPlayer(player) {
        // Check rows
        for (let row = 0; row < 3; row++) {
            if (gameboard.gameboardArray[row][0] === player.symbol && 
                gameboard.gameboardArray[row][1] === player.symbol && 
                gameboard.gameboardArray[row][2] === player.symbol) {
                return true;
            }
        }

        // Check columns
        for (let col = 0; col < 3; col++) {
            if (gameboard.gameboardArray[0][col] === player.symbol && 
                gameboard.gameboardArray[1][col] === player.symbol && 
                gameboard.gameboardArray[2][col] === player.symbol) {
                return true;
            }
        }
        
        // Check diagonals
        if (gameboard.gameboardArray[0][0] === player.symbol && 
            gameboard.gameboardArray[1][1] === player.symbol && 
            gameboard.gameboardArray[2][2] === player.symbol) {
            return true;
        }
        if (gameboard.gameboardArray[0][2] === player.symbol && 
            gameboard.gameboardArray[1][1] === player.symbol && 
            gameboard.gameboardArray[2][0] === player.symbol) {
            return true;
        }
        
        return false;
    }

    function checkFull() {
        for(let i = 0; i < 3; ++i) {
            for(let j = 0; j < 3; ++j) {
                if(gameboard.gameboardArray[i][j] == "-") {
                    return false;
                }
            }
        }
        return true;
    }

    function disableButtons() {
        document.querySelectorAll(".button-container button").forEach(button => {
            button.disabled = true;
        });
    }

    function clearGameboard() {
        //update array
        for(let i = 0; i < 3; ++i) {
            for(let j = 0; j < 3; ++j) {
                gameboard.gameboardArray[i][j] = "-";
            }
        }

        //update gameboard buttons
        document.querySelectorAll(".button-container button").forEach(button => {
            button.textContent = "-";
        });

        //update result field
        document.getElementById("result").textContent = "";
    }

    return { game, checkWinnerPlayer, checkFull, disableButtons, clearGameboard };
}

let newGame = createGame(player1, player2);

document.getElementById("btn-0-0").addEventListener("click", () => newGame.game([0,0], currentPlayer));
document.getElementById("btn-0-1").addEventListener("click", () => newGame.game([0,1], currentPlayer));
document.getElementById("btn-0-2").addEventListener("click", () => newGame.game([0,2], currentPlayer));
document.getElementById("btn-1-0").addEventListener("click", () => newGame.game([1,0], currentPlayer));
document.getElementById("btn-1-1").addEventListener("click", () => newGame.game([1,1], currentPlayer));
document.getElementById("btn-1-2").addEventListener("click", () => newGame.game([1,2], currentPlayer));
document.getElementById("btn-2-0").addEventListener("click", () => newGame.game([2,0], currentPlayer));
document.getElementById("btn-2-1").addEventListener("click", () => newGame.game([2,1], currentPlayer));
document.getElementById("btn-2-2").addEventListener("click", () => newGame.game([2,2], currentPlayer));

//if clear is pressed
document.getElementById("clear").addEventListener("click", () => {
    document.querySelectorAll(".button-container button").forEach(button => {
        button.disabled = false;
    });
    newGame.clearGameboard();
});