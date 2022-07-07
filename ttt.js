// const gameBoard = (() => {
//     const gridContainer = document.querySelector('div.container');
//     const grid = () => {
//         for (i=0; i<9; i++) {
//             const square = document.createElement('div');
//             square.classList.add('square');
//             square.setAttribute('id', `${i}`);
//             gridContainer.appendChild(square);
//         }
//     }
//     let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
//     let selection = '';
//     const render = (array) => {
// // take array and display value in each div of grid 
//     const gridArray = Array.from(gridContainer.getElementsByClassName('square'));
//         for (i=0; i<board.length; i++) {
//             if (board[i] === 1) {
//                 gridArray[i].textContent = 'X';
//             } else if (board[i] === 2) {
//                 gridArray[i].textContent = 'O';
//             }
//         }
//     }
//     // const squareListeners = () => {
//     //     const gridArray = Array.from(gridContainer.getElementsByClassName('square'));
//     //     gridArray.forEach(function(part, index) {
//     //         gridArray[index].addEventListener('click', e => {
//     //             selection = e.target.id;
//     //             console.log(selection);
//     //             game.crossCheck(selection);
//     //             game.turn(pablo, pancho, selection);
//     //         })
//     //     })
//     // }
//     const clickFunction = (e) => {
//         selection = e.target.id;
//         game.turnPlayer(pablo, selection);
//     }
//     const addListeners = () => {
//         const gridArray = Array.from(gridContainer.getElementsByClassName('square'));
//         gridArray.forEach(cell => {
//             cell.addEventListener('click', clickFunction, { once : true })
//         })
//     }
//     const removeListeners = () => {
//         const gridArray = Array.from(gridContainer.getElementsByClassName('square'));
//         gridArray.forEach(square => {
//             square.removeEventListener('click', clickFunction, { once : true })
//         })
//     }
//     return { grid, render, board, gridContainer, addListeners, removeListeners };
// })();
// const playerFactory = (name, icon) => {
//     const declareIcon = () => console.log(`you've chosen ${icon}`);
//     const welcome = () => console.log(`welcome ${name}`);
//     const pickSquare = (selection) => {
//         let playerChoice = document.getElementById(`${selection}`);
//         playerChoice.classList.add(name);
//         playerChoice.textContent = `${icon}`;
//     }
//     return { name, icon, declareIcon, welcome, pickSquare };
// }
// const game = (() => {
//     const squareContainer = document.querySelector('div.container');
//     let counter = 1;
//     const turn = (x, y, selection) => {
//         if (counter % 2 === 0) {
//             x.pickSquare(selection);
//             gameBoard.board[selection] = 1;
//             round(x);
//         } else if (counter % 2 === 1) {
//             y.pickSquare(selection);
//             gameBoard.board[selection] = 2;
//             round(y);
//         } else {
//             console.log('houston, we have a problem');
//         }
//         counter++;
//     }
//     const turnPlayer = (x, selection) => {
//         x.pickSquare(selection);
//         gameBoard.board[selection] = 1;
//         round(x);
//     }
//     const turnAI = () => {
//         let selection = AI.findPlay();
//         console.log(selection);
//         if (selection !== undefined) {
//             let computer = AI.computerPlayer;
//             computer.pickSquare(selection);
//             gameBoard.board[selection] = 2;
//             round(computer);
//         } else {
//             console.log('she undefined');
//         }
//     }
// // // take argument, run check if play is valid, mark selection on page
// //     }
//     // const crossCheck = (selection) => {
//     //     if (!(gameBoard.board[selection] === 0)) {
//     //         alert('that square is taken, choose another!')
//     //         return false;
//     //     } else {
//     //         return true;
//     //     }
//     // }
// // // take argument and see if square is already taken or not
// // // if unavailable, deny + start turn again
// // // if available, mark selection
// //     }
//     const winCheck = (name) => {
//         const squareArray = Array.from(squareContainer.getElementsByClassName('square'));
//         console.log(squareArray);
// // // evaluate board, checking for 3 in a row
// // // what's best way to check??
//         const winningCombos = [
//             [0, 1, 2],
//             [3, 4, 5],
//             [6, 7, 8],
//             [0, 3, 6],
//             [1, 4, 7],
//             [2, 5, 8],
//             [0, 4, 8],
//             [2, 4, 6],
//         ]
//         return winningCombos.some(combination => {
//             return combination.every(index => {
//                 return squareArray[index].classList.contains(name);
//             })
//         })
//     }
//     const round = (player) => {
//         let board = gameBoard.board;
//         if (winCheck(player.name)) {
//             console.log(`${player.name} wins!`);
//             gameBoard.removeListeners();
//         } else if (board.every(isAboveZero)) {
//             console.log(`we have a tie!`);
//         } else {
//             console.log('still going!');
//         }
//     }
//     const isAboveZero = (currentValue) => currentValue > 0;
//     // const endGame = (player) => {
//     //     if (!(squareArray.every(square => squareArray[square].textContent == ''))) {
//     //         console.log('draw');
//     //     } else {
//     //         console.log(`${player} wins!`)
//     //     }
//     // }
//     // const declaration = () => {
// // // either declare winner or announce tie
// //     }
// //     const restart = () => {
// // // clear grid, clear board array 
// // //does this go here or under gameBoard?       
// //     }
// //     // const turn = () => {
// // // run all the functions..?        
// //     }
//     return { turn, turnPlayer, turnAI, winCheck };
// })();
// const AI = (() => {
//     const computerPlayer = {
//         name: 'computer',
//         icon: 'O',
//         pickSquare(selection) {
//             let computerChoice = document.getElementById(`${selection}`);
//             computerChoice.classList.add('computer');
//             computerChoice.textContent = `O`;
//         }
//     }
//     const generateNumber = () => {
//         const number = Math.floor((Math.random()*90) / 10);
//         // if (isNaN(number)) {
//         //     generateNumber();
//         // } else {
//         return number;
//         // }
//     }
//     const findPlay = () => {
//         let number = generateNumber();
//         while (gameBoard.board[number] > 0) {
//             number = generateNumber();
//             console.log('trying for a new number');
//         }
//         return number;
//     }
//     return { computerPlayer, findPlay }
// })();
// let pablo = playerFactory('pablo', 'X');
// let pancho = playerFactory('pancho', 'O');
// gameBoard.grid();
// gameBoard.addListeners();
// const cellArray = Array.from(document.querySelectorAll('div.cell'));
// console.log(cellArray);
// let selection;
// let id;
// const clickFunction = (e) => {
//     selection = Array.from(e.target.getAttribute('data-value'));
//     id = e.target.getAttribute('id');
//     board[id] = "X";
//     e.target.textContent = 'X';
//     evaluateMove(selection, "Player");
//     console.log(selection);
// }
// cellArray.forEach(cell => {
//     cell.addEventListener('click', clickFunction, { once : true})
// })
// let rowsContainer = [0, 0, 0];
// let colsContainer = [0, 0, 0];
// let diagContainer = 0;
// let oppDiagContainer = 0;
// const evaluateMove = (selection) => {
//     let player = 'Amos';
//     let cell = turnSelectionIntoMove(selection);
//     board[cell] = "X";
//     let x = Number(selection[0]);
//     let y = Number(selection[1]);
//     rowsContainer[y] +=1;
//     if (rowsContainer[y] == 3) {
//         console.log(`${player} has won via rows!`);
//         win.player = 1;
//     }
//     colsContainer[x] +=1;
//     if (colsContainer[x] == 3) {
//         console.log(`${player} has won via cols!`);
//         win.player = 1;
//     }
//     if (x == y) {
//         diagContainer += 1;
//         if (diagContainer == 3) {
//             console.log(`${player} has won via diags!`);
//             win.player = 1;
//         }
//     }
//     if ((x + y + 1) == 3) {
//         oppDiagContainer += 1;
//         if (oppDiagContainer == 3) {
//             console.log(`${player} has won via opp diags!`);
//             win.player = 1;
//         }
//     }
// }
const currentBoardState = ["X", 1, "O", "X", 4, "X", "O", "O", 8];
// let max = 1000;
// let min = -1000;
// function maximin(gameBoard, depth, player, alpha, beta) {
//     const possibleMoves = checkPossibleMoves(gameBoard);
//     if (winning(gameBoard, playerH)) {
//         return {score: -1};
//     } else if (winning(gameBoard, playerAI)) {
//         return {score: 1};
//     } else if (possibleMoves.length === 0) {
//         return {score: 0};
//     }
//     const moves = [];
//     for (let i=0; i<possibleMoves.length; i++) {
//         const move = {};
//         move.index = gameBoard[possibleMoves[i]];
//         gameBoard[possibleMoves[i]] = player.icon;
//         if (player === playerAI) {
//             const result = maximin(gameBoard, depth - 1, playerH, alpha, beta);
//             move.score = result.score;
//             if (result.score > alpha) {
//                 alpha = result.score;
//             } else if (alpha >= beta) {
//                 return result.score;
//             }
//         } else {
//             const result = maximin(gameBoard, depth - 1, playerAI, alpha, beta);
//             move.score = result.score;
//             if (result.score < beta) {
//                 beta = result.score;
//             } else if (alpha >= beta) {
//                 return result.score;
//             } 
//         }
//         gameBoard[possibleMoves[i]] = move.index;
//         moves.push(move);
//         console.log(move);
//     }
//     let bestMove = null;
//     if (player === playerAI) {
//         let maxEval = -Infinity;
//         for (i=0; i<moves.length; i++) {
//             if (moves[i].score > maxEval) {
//                 maxEval = moves[i].score;
//                 // alpha = Math.max(alpha, maxEval);
//                 bestMove = i;
//             }
//             // if (alpha >= beta) {
//             //     break
//             // }
//         }
//     } else {
//         let minEval = Infinity;
//         for (i=0; i<moves.length; i++) {
//             if (moves[i].score < minEval) {
//                 minEval = moves[i].score;
//                 // beta = Math.min(beta, minEval);
//                 bestMove = i;
//             }
//             // if (alpha >= beta) {
//             //     break
//             // }
//         }
//     }
//     return moves[bestMove];
// }

const evaluateMoveAI = (selection, player) => {
    let x = Number(selection[0]);
    let y = Number(selection[1]);
    let cell = turnSelectionIntoMove(selection);
    updateBoardAI(cell);
    player.rowsContainer[y] +=1;
    if (player.rowsContainer[y] == 3) {
        console.log(`${player.name} has won via rows!`);
        player.win = 1;
        // return `${player.name} won!`
    }
    player.colsContainer[x] +=1;
    if (player.colsContainer[x] == 3) {
        console.log(`${player.name} has won via cols!`);
        player.win = 1;
        // return `${player.name} won!`
    }
    if (x == y) {
        player.diagContainer += 1;
        if (player.diagContainer == 3) {
            player.win = 1;
            console.log(`${player.name} has won via diags!`);
            // return `${player.name} won!`
        }
    }
    if ((x + y + 1) == 3) {
        player.oppDiagContainer += 1;
        if (player.oppDiagContainer == 3) {
            console.log(`${player.name} has won via opp diags!`);
            player.win = 1;
            // return `${player.name} won!`
        }
    }
}
const findPlayAI = () => {
    let number = generateNumber();
    console.log(number);
    while (board[number] > 0) {
        number = generateNumber();
        console.log('trying for a new number');
    }
    return number;
}
const makeMoveAI = () => {
    let number = findPlayAI();
    for (i=0; i<cellArray.length; i++) {
        if (number == cellArray[i].getAttribute('id')) {
            cellArray[i].textContent = 'O';
            board[i] = "O";
            let data = Array.from(cellArray[i].getAttribute('data-value'));
            let selection = [Number(data[0]), Number(data[1])];
            evaluateMoveAI(selection);
            break;
        }
    }
}
const updateBoardAI = (number) => {
    for (i=0; i<cellArray.length; i++) {
        if (number == cellArray[i].getAttribute('id')) {
            cellArray[i].textContent = 'O';
            board[i] = "O";
        }
    }
}
// const makeMovePlayer = () => {

// }
const generateNumber = () => {
    const number = Math.floor((Math.random()*90) / 10);
    if (isNaN(number)) {
        generateNumber();
        } else {
        return number;
        }
    }
// const game = (player) => {
//     //make a move
//     //check for win
//     //check for draw
//     //

// }
const board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
// const terminalState = (gameBoard) => {
//     let terminal = false;
//     if (win.computer == 1) {
//         return {score: 1};
//     }
//     else if (win.player == 1) {
//         return {score: -1};
//     } else if (checkDraw(gameBoard)) {
//         return {score: 0};
//     }
//     return terminal;
// }
const checkScore = () => {
    if (win.computer == 1) {
        return {score: 1};
    }
    else if (win.player == 1) {
        return {score: -1};
    } else if (checkDraw()) {
        return {score: 0};
    }
}
const checkDraw = (gameBoard) => {
    for (i=0; i<gameBoard.length; i++) {
        if (gameBoard[i] == "X" || gameBoard[i] == "O") {
            continue;
        } else {
            return false;
        }
    }
    return true;
}
const turnMoveIntoSelection = (move) => {
    let x = Array.from(cellArray[move].getAttribute('data-value'));
    let selection = [Number(x[0]), Number(x[1])];
    return selection;
}
const turnSelectionIntoMove = (selection) => {
    let selectionArray = [`${selection[0]}`, `${selection[1]}`];
    arrayAttributes = [];
    for (i=0; i<cellArray.length; i++) {
        arrayAttributes.push(Array.from(cellArray[i].getAttribute('data-value')));
    }
    for (i=0; i<arrayAttributes.length; i++) {
        if (selectionArray[0] == arrayAttributes[i][0]) {
            if (selectionArray[1] == arrayAttributes[i][1]) {
            return i;
            }
            else {
                continue;
            }
        }
    }
}

// const newEvaluateMove = (selection, player) => {
//     let cell = turnSelectionIntoMove(selection);
//     board[cell] = player.icon;
//     cellArray[cell].textContent = player.icon;
//     let x = Number(selection[0]);
//     let y = Number(selection[1]);
//     player.rowsContainer[y] +=1;
//     if (player.rowsContainer[y] == 3) {
//         console.log(`${player.name} has won via rows!`);
//         player.win = 1;
//         // return `${player.name} won!`
//     }
//     player.colsContainer[x] +=1;
//     if (player.colsContainer[x] == 3) {
//         console.log(`${player.name} has won via cols!`);
//         player.win = 1;
//         // return `${player.name} won!`
//     }
//     if (x == y) {
//         player.diagContainer += 1;
//         if (player.diagContainer == 3) {
//             player.win = 1;
//             console.log(`${player.name} has won via diags!`);
//             // return `${player.name} won!`
//         }
//     }
//     if ((x + y + 1) == 3) {
//         player.oppDiagContainer += 1;
//         if (player.oppDiagContainer == 3) {
//             console.log(`${player.name} has won via opp diags!`);
//             player.win = 1;
//             // return `${player.name} won!`
//         }
//     }
// }

// const checkScore = () => {
//     if (win.computer == 1) {
//         return {score: 1};
//     }
//     else if (win.player == 1) {
//         return {score: -1};
//     } else if (checkDraw()) {
//         return {score: 0};
//     }
// }
// const undoMove = function(selection, player) {
//     let cell = turnSelectionIntoMove(selection);
//     board[cell] = cell;
//     cellArray[cell].textContent = '';
//     let x = Number(selection[0]);
//     let y = Number(selection[1]);
//     player.rowsContainer[y] -=1;
//     player.colsContainer[x] -=1;
//     if (x == y) {
//         player.diagContainer -= 1;
//     }
//     if ((x + y + 1) == 3) {
//         player.oppDiagContainer -= 1;
//     }
//     if (player.win == 1) {
//         player.win = 0;
//     }
// }
// scoreboard:
// -> player cards (name, marker, running score)
// -> start button?
const scoreboardContainer = document.querySelector('div.scoreboardContainer');
const scoreboard = Array.from(scoreboardContainer.children);
const p1Card = scoreboard[0];
const p2Card = scoreboard[2];
// pCards.forEach(index => {
//     const name = document.createElement('div');
//     name.classList.add('name');
//     // name.textContent = 'Name: ';
//     index.appendChild(name);
//     const marker = document.createElement('div');
//     marker.classList.add('marker');
//     // marker.textContent = 'Marker: ';
//     index.appendChild(marker);
//     const wins = document.createElement('div');
//     wins.classList.add('wins');
//     // wins.textContent = 'Wins: ';
//     index.appendChild(wins);
// })
// console.log(pCards);
// create board
// give each cell an id # that correlates with index position in board array
const grid = (() => {
    const gridContainer = document.querySelector('div.gridContainer');
    let cellArray;
    const create = () => {
        let grid = [];
        for (i=0; i<3; i++) {
            grid.push(i);
        }
        grid.forEach(index => grid[index] = [0, 1, 2]);
        let y = 0;
        grid.forEach(index => {
            index.forEach(i => {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('id', `${y}`);
                gridContainer.appendChild(cell);
                y++;
            })
        })
         // add 'click' listeners to each cell, limit to one click per cell per game
        cellArray = Array.from(document.querySelectorAll('div.cell'));
        cellArray.forEach(cell => {
            cell.addEventListener('click', newClickFunction, { once : true })
        })
    }
// create click functionality
// click inputs id of cell into turn function
    const newClickFunction = (e) => {
        let id = e.target.getAttribute('id');
        console.log(id);
        game.turn(id);
    }
    // display board array on browser
    const displayBoard = (input) => {
        cellArray = Array.from(document.querySelectorAll('div.cell'));
        for (i=0; i<cellArray.length; i++) {
            cellArray[i].textContent = `${input[i]}`;
        }
    }
    const reset = () => {
        cellArray = Array.from(gridContainer.querySelectorAll('div.cell'));
        cellArray.forEach(cell => {
            cell.removeEventListener('click', newClickFunction, { once: true })
        })
        while (gridContainer.firstChild) {
            gridContainer.removeChild(gridContainer.firstChild);
        }
    }
    create();
    return { newClickFunction, displayBoard, reset, create, };
})();
// create players with factory function, return their name and marker
const playerFactory = (name, icon, wins) => {
    return {name, icon, wins};
}
const playerH = playerFactory("player", "O", 0);
const playerAI = playerFactory("AI", "X", 0);
const game = (() => {
    let circleTurn = false;
    // const currentClass = circleTurn ? playerH : playerAI;
    // turn for player (and for PvP)
    const basicMoveAI = () => {
        if (!circleTurn) {
            turn(randomMoveAI());
        }
    }
    const advancedMoveAI = () => {
        if (!circleTurn) {
            if (checkPossibleMoves(board).length == 9) {
                turn(0);
            } else {
                console.log('fire');
            turn(minimax(board, playerAI).index);
            }
        }
    }
    const turn = (input) => {
        const cellArray = Array.from(document.querySelectorAll('div.cell'));
        const currentPlayer = circleTurn ? playerH : playerAI;
        if (check(input) == -1) {
            alert('Please choose an empty square!')
        } else {
            board[input] = currentPlayer.icon;
            cellArray[input].textContent = `${currentPlayer.icon}`;
            console.log(currentPlayer.icon);
            if (terminalState(board, currentPlayer)) {
                // display endgame message
                console.log('fire');
            } else {
            alternateTurn();
            }
        }
    }
    const terminalState = (board, player) => {
        if (winCheck(board, player)) {
            console.log(`${player.name} wins!`);
            return true;
        } else if (checkPossibleMoves(board).length == 0) {
            console.log(`It's a draw!`);
            return true;
        } else {
            return false;
        }
    }
    // alternate player turns
    // can set up a currentClass function (for PvP version) that lets x go for its turn, otherwise o goes
    const alternateTurn = () => {
        circleTurn = !circleTurn;
    }
    // generate random move for AI:
    // -> checks for available moves
    // -> randomly generates index number to select move
    // -> returns index
    const randomMoveAI = () => {
        let moves = checkPossibleMoves(board);
        return moves[Math.floor(Math.random() * moves.length)];
    }
    // the minimax algorithm:
    // -> checks for a winner, and assigns a score (for win, loss, or tie)
    // -> catalogues potential moves
    // -> for each potential move, algorithm plays out the board (recursively calling minimax) and assigns a score
    // -> maximizing player selects move to maximize their score, minimizing player seeks to minimize opponent's score
    // ->
    function minimax(gameBoard, player) {
        const possibleMoves = checkPossibleMoves(gameBoard);
        if (winCheck(gameBoard, playerH)) {
            return {score: -1};
        } else if (winCheck(gameBoard, playerAI)) {
            return {score: 1};
        } else if (possibleMoves.length === 0) {
            return {score: 0};
        }
        const moves = [];
        for (let i=0; i<possibleMoves.length; i++) {
            const move = {};
            move.index = gameBoard[possibleMoves[i]];
            gameBoard[possibleMoves[i]] = player.icon;
            if (player === playerAI) {
                const result = minimax(gameBoard, playerH);
                move.score = result.score;
            } else {
                const result = minimax(gameBoard, playerAI);
                move.score = result.score; 
            }
            gameBoard[possibleMoves[i]] = move.index;
            moves.push(move);
            console.log(move);
        }
        let bestMove = null;
        if (player === playerAI) {
            let maxEval = -Infinity;
            for (i=0; i<moves.length; i++) {
                if (moves[i].score > maxEval) {
                    maxEval = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            let minEval = Infinity;
            for (i=0; i<moves.length; i++) {
                if (moves[i].score < minEval) {
                    minEval = moves[i].score;
                    bestMove = i;
                }
            }
        }
        return moves[bestMove];
    }
    // iterate over board array and return indexes that are available
    const checkPossibleMoves = (gameBoard) => {
        return gameBoard.filter(index => index != "X" && index != "O");
    }
    // utility function: checks board for win
    function winning(board, player){
        if (
        (board[0] === player.icon && board[1] === player.icon && board[2] === player.icon) ||
        (board[3] === player.icon && board[4] === player.icon && board[5] === player.icon) ||
        (board[6] === player.icon && board[7] === player.icon && board[8] === player.icon) ||
        (board[0] === player.icon && board[3] === player.icon && board[6] === player.icon) ||
        (board[1] === player.icon && board[4] === player.icon && board[7] === player.icon) ||
        (board[2] === player.icon && board[5] === player.icon && board[8] === player.icon) ||
        (board[0] === player.icon && board[4] === player.icon && board[8] === player.icon) ||
        (board[2] === player.icon && board[4] === player.icon && board[6] === player.icon)
        ) {
        return true;
        } else {
        return false;
        }
    }
    // alternate utility function:
    // faster?
    // not 100% that it works. still testing. remember to change in minimax fn.
    const winCheck = (gameBoard, name) => {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
        return winningCombos.some(combination => {
            return combination.every(index => {
                return gameBoard[index] === (name.icon)
                })
        })
    }
    const check = (id) => {
        let moves = checkPossibleMoves(board);
        if (moves[0] == id) {
            return id
        } else if (moves.find(index => index == id)) {
            return id;
        } else {
            return -1;
        }
    }
    const restart = () => {
        for (i=0; i<9; i++) {
            board[i] = i;
        }
        circleTurn = false;
    }
    return { turn, basicMoveAI, advancedMoveAI, restart }
})();
// modal (on initialization)
// -> add name, choose icon, select game mode
// -> if PvP, open section of form for second player name and icon
const modalContainer = document.querySelector('div.modalContainer');
const modals = Array.from(modalContainer.children);
const p1Modal = modals[0];
const p2Modal = modals[1];
const modalListener = () => {
    document.addEventListener("DOMContentLoaded", function() {
        setTimeout(function() {
            modal();
        }, 1000);
    })
    const modal = () => {
        modalContainer.style.display = "block";
    }
    const pvpbtn = p1Modal.children[3].children[1];
    const pvpFn = () => {
        console.log('pvp mode!')
    }
    pvpbtn.addEventListener('click', pvpFn);
    const easybtn = p1Modal.children[3].children[2];
    const easyFn = () => {
        console.log('easy mode!')
    }
    easybtn.addEventListener('click', easyFn);
    const expertbtn = p1Modal.children[3].children[3];
    const expertFn = () => {
        console.log('expert mode!');
    }
    expertbtn.addEventListener('click', expertFn);
}
modalListener();
const p1Input = [p1Modal.children[2].children[1], p1Modal.children[3].children[1]];
const uploadP1 = () => {
    let name = p1Input[0].value;
    if (name == '') {
        name = "Player One";
    }
    p1Card.children[1].textContent = `Name: ${name}`;
    let icon = p1Input[1].value;
    if (icon == '') {
        icon = "O";
    }
    p1Card.children[2].textContent = `Icon: ${icon}`;
}
