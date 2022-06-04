const gameBoard = (() => {
    const gridContainer = document.querySelector('div.container');
    const grid = () => {
        for (i=0; i<9; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.setAttribute('id', `${i}`);
            gridContainer.appendChild(square);
        }
    }
    let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let selection = '';
    const render = (array) => {
// take array and display value in each div of grid 
    const gridArray = Array.from(gridContainer.getElementsByClassName('square'));
        for (i=0; i<board.length; i++) {
            if (board[i] === 1) {
                gridArray[i].textContent = 'X';
            } else if (board[i] === 2) {
                gridArray[i].textContent = 'O';
            }
        }
    }
    // const squareListeners = () => {
    //     const gridArray = Array.from(gridContainer.getElementsByClassName('square'));
    //     gridArray.forEach(function(part, index) {
    //         gridArray[index].addEventListener('click', e => {
    //             selection = e.target.id;
    //             console.log(selection);
    //             game.crossCheck(selection);
    //             game.turn(pablo, pancho, selection);
    //         })
    //     })
    // }
    const clickFunction = (e) => {
        selection = e.target.id;
        game.turn(pablo, pancho, selection);
    }
    const addListeners = () => {
        const gridArray = Array.from(gridContainer.getElementsByClassName('square'));
        gridArray.forEach(cell => {
            cell.addEventListener('click', clickFunction, { once : true })
        })
    }
    return { grid, render, board, gridContainer, addListeners };
})();
const playerFactory = (name, icon) => {
    const declareIcon = () => console.log(`you've chosen ${icon}`);
    const welcome = () => console.log(`welcome ${name}`);
    const pickSquare = (selection) => {
        let playerChoice = document.getElementById(`${selection}`);
        playerChoice.classList.add(name);
        playerChoice.textContent = `${icon}`;
    }
    return { name, icon, declareIcon, welcome, pickSquare };
}
const game = (() => {
    const squareContainer = document.querySelector('div.container');
    let counter = 1;
    const turn = (x, y, selection) => {
        if (counter % 2 === 0) {
            x.pickSquare(selection);
            gameBoard.board[selection] = 1;
            round(x);
        } else if (counter % 2 === 1) {
            y.pickSquare(selection);
            gameBoard.board[selection] = 2;
            round(y);
        } else {
            console.log('houston, we have a problem');
        }
        counter++;
    }
// // take argument, run check if play is valid, mark selection on page
//     }
    // const crossCheck = (selection) => {
    //     if (!(gameBoard.board[selection] === 0)) {
    //         alert('that square is taken, choose another!')
    //         return false;
    //     } else {
    //         return true;
    //     }
    // }
// // take argument and see if square is already taken or not
// // if unavailable, deny + start turn again
// // if available, mark selection
//     }
    const winCheck = (name) => {
        const squareArray = Array.from(squareContainer.getElementsByClassName('square'));
        console.log(squareArray);
// // evaluate board, checking for 3 in a row
// // what's best way to check??
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
                return squareArray[index].classList.contains(name);
            })
        })
    }
    const round = (z) => {
        if (winCheck(z)) {
            endGame(z);
        }
    }
    const endGame = (player) => {
        if (!(squareArray.every(square => squareArray[square].textContent == ''))) {
            console.log('draw');
        } else {
            console.log(`${player} wins!`)
        }
    }
    // const declaration = () => {
// // either declare winner or announce tie
//     }
//     const restart = () => {
// // clear grid, clear board array 
// //does this go here or under gameBoard?       
//     }
//     // const turn = () => {
// // run all the functions..?        
//     }
    return { turn, winCheck };
})();
let pablo = playerFactory('pablo', 'X');
let pancho = playerFactory('pancho', 'O');
gameBoard.grid();
gameBoard.addListeners();