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
    const squareListeners = () => {
        const gridArray = Array.from(gridContainer.getElementsByClassName('square'));
        gridArray.forEach(function(part, index) {
            gridArray[index].addEventListener('click', e => {
                selection = e.target.id;
                console.log(selection);
                game.crossCheck(selection);
                game.turn(pablo, pancho, selection);
            })
        })
    }
    return { grid, render, board, gridContainer, squareListeners };
})();
const playerFactory = (name, icon) => {
    const declareIcon = () => console.log(`you've chosen ${icon}`);
    const welcome = () => console.log(`welcome ${name}`);
    const pickSquare = (selection) => {
        let playerChoice = document.getElementById(`${selection}`);
        console.log(playerChoice);
        console.log(icon);
        playerChoice.textContent = `${icon}`;
    }
    return { name, icon, declareIcon, welcome, pickSquare };
}
const game = (() => {
    let counter = 1;
    const turn = (x, y, selection) => {
        if (counter % 2 === 0) {
            x.pickSquare(selection);
            gameBoard.board[selection] = 1;
        } else if (counter % 2 === 1) {
            y.pickSquare(selection);
            gameBoard.board[selection] = 2;
        } else {
            console.log('houston, we have a problem');
        }
        counter++;
    }
// // take argument, run check if play is valid, mark selection on page
//     }
    const crossCheck = (selection) => {
        if (!(gameBoard.board[selection] === 0)) {
            alert('that square is taken, choose another!')
            return false;
        } else {
            return true;
        }
    }
// // take argument and see if square is already taken or not
// // if unavailable, deny + start turn again
// // if available, mark selection
//     }
//     const winCheck = () => {
// // evaluate board, checking for 3 in a row
// // what's best way to check??
//     }
//     const declaration = () => {
// // either declare winner or announce tie
//     }
//     const restart = () => {
// // clear grid, clear board array 
// //does this go here or under gameBoard?       
//     }
//     // const turn = () => {
// // run all the functions..?        
//     }
    return { turn, crossCheck };
})();
let pablo = playerFactory('pablo', 'X');
let pancho = playerFactory('pancho', 'O');
console.log(gameBoard.board);
gameBoard.grid();
gameBoard.render(gameBoard.board);
gameBoard.squareListeners();