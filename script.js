function createGameboard() {
    let gameboardArray = [
        ["-", "-", "-"],
        ["-", "-", "-"],
        ["-", "-", "-"]
    ];
    
    // function to print out the board
    function printGameboard() {
        console.log(gameboardArray);
    }

    return { gameboardArray, printGameboard };
}

function createPlayer(symbol) {
    return { symbol };
}

function createGame(player1, pLayer2) {
    let gameboard = createGameboard();
    gameboard.printGameboard();

    function game(movePlayer1, movePlayer2) {
        gameboard.gameboardArray[movePlayer1[0]][movePlayer1[1]] = player1.symbol;
        checkWinnerPlayer1();
        gameboard.gameboardArray[movePlayer2[0]][movePlayer2[1]] = player2.symbol;
        checkWinnerPlayer1();
        gameboard.printGameboard();
    }

    function checkWinnerPlayer1() {
        // Check rows
        for (let row = 0; row < 3; row++) {
            if (gameboard.gameboardArray[row][0] === player1.symbol && gameboard.gameboardArray[row][1] === player1.symbol && gameboard.gameboardArray[row][2] === player1.symbol) {
                return true;
                console.log("wins");
            }
        }

       // Check columns
        for (let col = 0; col < 3; col++) {
            if (gameboard.gameboardArray[0][col] === player1.symbol && gameboard.gameboardArray[1][col] === player1.symbol && gameboard.gameboardArray[2][col] === player1.symbol) {
                return true;
                console.log("wins");
            }
        }
        
        // Check diagonals
        if (gameboard.gameboardArray[0][0] === player1.symbol && gameboard.gameboardArray[1][1] === player1.symbol && gameboard.gameboardArray[2][2] === player1.symbol) {
            return true;
            console.log("wins");
        }
        if (gameboard.gameboardArray[0][2] === player1.symbol && gameboard.gameboardArray[1][1] === player1.symbol && gameboard.gameboardArray[2][0] === player1.symbol) {
            return true;
            console.log("wins");
        }
        
        return false;
    }

    return { game, checkWinnerPlayer1 };
}


let player1 = createPlayer('x');
let player2 = createPlayer('o');

let newGame = createGame(player1, player2);
newGame.game([0,0], [1,1]);
newGame.game([0, 1], [1, 0]);
newGame.game([0,2],[1,2]);
