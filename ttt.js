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
const gridContainer = document.querySelector('div.container');
let grid = [];
for (i=0; i<3; i++) {
    grid.push(i);
}
grid.forEach(index => grid[index] = [0, 1, 2]);
console.log(grid);
let z = -1;
let y = 0;
grid.forEach(index => {
    z++;
    index.forEach(i => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-value', `${i}${z}`);
        cell.setAttribute('id', `${y}`);
        gridContainer.appendChild(cell);
        y++;
    })
})
const cellArray = Array.from(document.querySelectorAll('div.cell'));
console.log(cellArray);
let selection;
let id;
const clickFunction = (e) => {
    selection = Array.from(e.target.getAttribute('data-value'));
    id = e.target.getAttribute('id');
    board[id] = 1;
    e.target.textContent = 'X';
    evaluateMove(selection, "Player");
    console.log(selection);
}
cellArray.forEach(cell => {
    cell.addEventListener('click', clickFunction, { once : true})
})
let rowsContainer = [0, 0, 0];
let colsContainer = [0, 0, 0];
let diagContainer = 0;
let oppDiagContainer = 0;
const evaluateMove = (selection) => {
    let player = 'Amos';
    let cell = turnSelectionIntoMove(selection);
    board[cell] = 1;
    let x = Number(selection[0]);
    let y = Number(selection[1]);
    rowsContainer[y] +=1;
    if (rowsContainer[y] == 3) {
        console.log(`${player} has won via rows!`);
        win.player = 1;
    }
    colsContainer[x] +=1;
    if (colsContainer[x] == 3) {
        console.log(`${player} has won via cols!`);
        win.player = 1;
    }
    if (x == y) {
        diagContainer += 1;
        if (diagContainer == 3) {
            console.log(`${player} has won via diags!`);
            win.player = 1;
        }
    }
    if ((x + y + 1) == 3) {
        oppDiagContainer += 1;
        if (oppDiagContainer == 3) {
            console.log(`${player} has won via opp diags!`);
            win.player = 1;
        }
    }
}
const minimax = function minimax(position, depth, maximizingPlayer) {
    let eval;
    // let selection = turnMoveIntoSelection(position);
    let score = terminalState();
    if ((depth == 0) || (score != false)) {
        return score;
    }
    if (maximizingPlayer) {
        let maxEval = -Infinity;
        for (i=0; i<board.length; i++) {
            if (board[i] == 0) {
                let position = board[i];
                let selection = turnMoveIntoSelection(position);
                board[i] = 2;
                evaluateMoveAI(selection);
                eval = minimax(position, depth - 1, false);
                maxEval = Math.max(maxEval, eval);
                board[i] = 0;
                return maxEval;
            }
        }
    }
    else {
        let minEval = +Infinity;
        for (i=0; i<board.length; i++) {
            if (board[i] == 0) {
                let position = board[i];
                let selection = turnMoveIntoSelection(position);
                board[i] = 1;
                evaluateMove(selection);
                eval = minimax(position, depth - 1, true);
                minEval = Math.min(minEval, eval);
                board[i] = 0;
                return minEval;
            }
        }
    }
}
const bestMove = () => {
    let maxEval = -Infinity;
    let bestPosition;
    for (i=0; i<board.length; i++) {
        if (board[i] == 0) {
            console.log(i);
            let data = Array.from(cellArray[i].getAttribute('data-value'));
            let a = Number(data[0]); 
            let b = Number(data[1]);
            let selection = [a, b]
            console.log(selection);
            evaluateMoveAI(selection);
            let moveEval = minimax(board, 0, false);
            board[i] = 0;
            if (moveEval > maxEval) {
                maxEval = moveEval;
                bestPosition = i;
            }
        }
    }
    console.log(bestPosition);
    return bestPosition;
}
let rowsAI = [0, 0, 0];
let colsAI = [0, 0, 0];
let diagAI = 0;
let oppDiagAI = 0;
const evaluateMoveAI = (selection) => {
    let x = Number(selection[0]);
    let y = Number(selection[1]);
    let cell = turnSelectionIntoMove(selection);
    rowsAI[y] +=1;
    if (rowsAI[y] == 3) {
        console.log('Computer has won via rows!');
        win.computer = 1;
        }
    colsAI[x] +=1;
    if (colsAI[x] == 3) {
        console.log('Computer has won via cols!');
        win.computer = 1;
    }
    if (x == y) {
        diagAI += 1;
        if (diagAI == 3) {
            console.log('Computer has won via diags!')
            win.computer = 1;
        }
    }
    if ((x + y + 1) == 3) {
        oppDiagAI += 1;
        if (oppDiagAI == 3) {
            console.log('Computer has won via opp diags!');
            win.computer = 1;
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
            board[i] = 2;
            let data = Array.from(cellArray[i].getAttribute('data-value'));
            let selection = [Number(data[0]), Number(data[1])];
            evaluateMoveAI(selection);
            break;
        }
    }
}
const makeMovePlayer = () => {

}
const generateNumber = () => {
    const number = Math.floor((Math.random()*90) / 10);
    if (isNaN(number)) {
        generateNumber();
        } else {
        return number;
        }
    }
const game = (player) => {
    //make a move
    //check for win
    //check for draw
    //

}
const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
//problem with terminal - evaluateMove needs selection, and is specific to player (not AI)
// and both of those use same input
const terminalState = () => {
    let terminal = false;
    if (win.computer == 1) {
        return 1;
    }
    else if (win.player == 1) {
        return -1;
    } else if (checkDraw()) {
        return 0;
    }
    return terminal;
}
const checkDraw = () => {
    for (i=0; i<board.length; i++) {
        if (board[i] > 0) {
            continue;
        } else {
            return false;
        }
    }
    return true;
}
const checkPossibleMoves = () => {
    let possibleMoves = false;
    for (i=0; i<board.length; i++) {
        if (board[i] == 0) {
            possibleMoves = true;
        }
    }
    return possibleMoves;
}
const turnMoveIntoSelection = (move) => {
    console.log(move);
    let x = Array.from(cellArray[move].getAttribute('data-value'));
    let selection = [Number(x[0]), Number(x[1])];
    return selection;
}
const turnSelectionIntoMove = (selection) => {
    for (i=0; i<cellArray.length; i++) {
        if (selection == cellArray[i].getAttribute('data-value'))
        return [i];
    }
}
let win = {
    player: 0,
    computer: 0
}