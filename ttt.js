let selection = '';
const gameBoard = () => {
    const gridContainer = document.querySelector('div.container');
    const grid = () => {
        for (i=0; i<9; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.setAttribute('id', `${i}`);
            gridContainer.appendChild(square);
        }
    }
    let board = [1, 2, 2, 0, 1, 0, 1, 2, 0];
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
            })
        })
        return { selection };
    }
    return { grid, render, squareListeners, selection, board };
}

const playerFactory = (name, icon) => {
    const declareIcon = () => console.log(`you've chosen ${icon}`);
    const welcome = () => console.log(`welcome ${name}`);
    const pickSquare = (selection) => {
        board[selection] = count;
    }
    return { name, icon, declareIcon, welcome, pickSquare };
}
const game = (() => {
    const selection = () => {
// take argument, run check if play is valid, mark selection on page
    }
    const crossCheck = () => {
// take argument and see if square is already taken or not
// if unavailable, deny + start turn again
// if available, mark selection
    }
    const winCheck = () => {
// evaluate board, checking for 3 in a row
// what's best way to check??
    }
    const declaration = () => {
// either declare winner or announce tie
    }
    const restart = () => {
// clear grid, clear board array 
//does this go here or under gameBoard?       
    }
    const turn = () => {
// run all the functions..?        
    }
})();
let dude = gameBoard();
let pablo = playerFactory('pablo', 'X');
dude.grid();
dude.squareListeners();