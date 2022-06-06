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
grid.forEach(index => {
    z++;
    index.forEach(i => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-value', `${i}${z}`);
        gridContainer.appendChild(cell);
    })
})
const cellArray = Array.from(document.querySelectorAll('div.cell'));
console.log(cellArray);
let selection;
const clickFunction = (e) => {
    selection = Array.from(e.target.getAttribute('data-value'));
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
const evaluateMove = (selection, player) => {
    let x = Number(selection[0]);
    let y = Number(selection[1]);
    rowsContainer[y] +=1;
    if (rowsContainer[y] == 3) {
        console.log(`${player} has won via rows!`);
    }
    colsContainer[x] +=1;
    if (colsContainer[x] == 3) {
        console.log(`${player} has won via cols!`);
    }
    if (x == y) {
        // diagContainer[x] +=1;
        // let totalSum = 0;
        // for (i=0; i<diagContainer.length; i++) {
        //     totalSum += diagContainer[i];
        // }
        // if (totalSum == 3) {
        //     console.log('Player has won via diags!');
        // }
        diagContainer += 1;
        if (diagContainer == 3) {
            console.log(`${player} has won via diags!`)
        }
    }
    if ((x + y + 1) == 3) {
        oppDiagContainer += 1;
        if (oppDiagContainer == 3) {
            console.log(`${player} has won via opp diags!`);
        }
    }
}
const minimax = function minimax(position, depth, maximizingPlayer) {
    let eval;
    if (depth == 0) /*OR game over in this position*/ {
        return position;
    }
    if (maximizingPlayer) {
        let maxEval = -Infinity;
        for (let child in position.children) {
            eval = minimax(child, depth - 1, false);
            maxEval = Math.max(maxEval, eval);
            return maxEval;
        }
    }
    else {
        let minEval = +Infinity;
        for(let child in position.children) {
            eval = minimax(child, depth - 1, true);
            minEval = Math.min(minEval, eval);
            return minEval;
        }
    }
}
let rowsAI = [0, 0, 0];
let colsAI = [0, 0, 0];
let diagAI = 0;
let oppDiagAI = 0;
const evaluateMoveAI = (selection) => {
    let x = Number(selection[0]);
    let y = Number(selection[1]);
    rowsAI[y] +=1;
    if (rowsAI[y] == 3) {
        console.log('Computer has won via rows!');
    }
    colsAI[x] +=1;
    if (colsAI[x] == 3) {
        console.log('Computer has won via cols!');
    }
    if (x == y) {
        diagAI += 1;
        if (diagAI == 3) {
            console.log('Computer has won via diags!')
        }
    }
    if ((x + y + 1) == 3) {
        oppDiagAI += 1;
        if (oppDiagAI == 3) {
            console.log('Computer has won via opp diags!');
        }
    }
}
const makeMoveAI = () => {
    let selection = [generateNumber(), generateNumber()];
    for (i=0; i<cellArray.length; i++) {
        let data = Array.from(cellArray[i].getAttribute('data-value'));
        if (selection[0] == Number(data[0]) && selection[1] == Number(data[1])) {
            cellArray[i].textContent = 'O';
            evaluateMoveAI(selection);
            break;
        }
    }
}
const generateNumber = () => {
    const number = Math.floor((Math.random()*30) / 10);
    if (isNaN(number)) {
        generateNumber();
        } else {
        return number;
        }
    }
const score = (x, y, game) => {
    if (game(x)) {
        return 1;
    } else if (game(y)) {
        return -1;
    } else {
        return 0;
    }
}
const game = (player) => {
    //make a move
    //check for win
    //check for draw
    //

}