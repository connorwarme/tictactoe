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
            cell.addEventListener('click', clickFunction, { once : true })
        })
    }
    // create click functionality
    // click inputs id of cell into turn function
    const clickFunction = (e) => {
        let id = e.target.getAttribute('id');
        game.turn(id);
    }
    // display board array on browser
    const displayBoard = (input) => {
        cellArray = Array.from(document.querySelectorAll('div.cell'));
        for (i=0; i<cellArray.length; i++) {
            cellArray[i].textContent = `${input[i]}`;
        }
    }
    // remove listeners, deployed after a win to stop subsequent clicks
    const removeListeners = () => {
        cellArray = Array.from(gridContainer.querySelectorAll('div.cell'));
        cellArray.forEach(cell => {
            cell.removeEventListener('click', clickFunction, { once: true })
        })
    }
    // reset by removing listeners, removing win message, deleting the board
    const reset = () => {
        removeListeners();
        let message = "";
        game.winDisplay(message);
        while (gridContainer.firstChild) {
            gridContainer.removeChild(gridContainer.firstChild);
        }
    }
    create();
    return { clickFunction, displayBoard, removeListeners, reset, create };
})();
// the game logic
const game = (() => {
    let p1;
    let p2;
    // main gameboard
    let board = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    let circleTurn = false;
    // easy AI simply selects a random move from open squares
    const basicMoveAI = () => {
        if (!circleTurn) {
            turn(randomMoveAI());
        }
    }
    // expert AI runs the minimax function
    const advancedMoveAI = () => {
        if (!circleTurn) {
            // for the first move, it randomly selects one of the corners
            // because it would take the minimax an excessive amount of time
            if (checkPossibleMoves(game.board).length == 9) {
                let options = [0, 2, 6, 8];
                let choice = Math.floor(Math.random()*4);
                turn(options[choice]);
            } else {
                turn(minimax(game.board, game.p2).index);
            }
        }
    }
    // the player's turn, function recieves an argument "input" that's the index position in the board array
    // runs "check" to see if square is available
    // updates board array, displays marker, checks for terminal state
    // changes and displays next player's turn
    // checks if player 2 == AI; if yes, runs the AI's turn
    const turn = (input) => {
        const cellArray = Array.from(document.querySelectorAll('div.cell'));
        const currentPlayer = circleTurn ? game.p1 : game.p2;
        if (check(input) == -1) {
            alert('Please choose an empty square!')
        } else {
            game.board[input] = currentPlayer.icon;
            main.p1Input.markerDisplay(cellArray[input], currentPlayer.marker)
            if (terminalState(game.board, currentPlayer)) {
                grid.removeListeners();
            } else {
            alternateTurn();
            turnDisplay();
            if (checkAI(game.p2)) {
                console.log('working?');
            }
            }
        }
    }
    // checks if game is over
    // if win, displays win message and updates win tally on scoreboard
    // if tie, displays message
    const terminalState = (board, player) => {
        if (winCheck(board, player)) {
            let message = `${player.name} wins!`;
            winDisplay(message);
            winsTally(player);;
            return true;
        } else if (checkPossibleMoves(board).length == 0) {
            winDisplay("It's a draw!");
            return true;
        } else {
            return false;
        }
    }
    // updates wins property in player object, updates scoreboard wins display
    // adds a class to the "three (cells) in a row"
    const winsTally = (player) => {
        player.wins++;
        main.p1Card.children[3].children[0].textContent = `${game.p1.wins}`;
        main.p2Card.children[3].children[0].textContent = `${game.p2.wins}`;
        for (i=0; i<game.winningArray.length; i++) {
            let winningCell = document.getElementById(`${game.winningArray[i]}`);
            winningCell.classList.add('winningCell');
        }
    }
    // alternate player turns
    const alternateTurn = () => {
        circleTurn = !circleTurn;
    }
    // generate random move for AI:
    // -> checks for available moves
    // -> randomly generates index number to select move
    // -> returns index
    const randomMoveAI = () => {
        let moves = checkPossibleMoves(game.board);
        return moves[Math.floor(Math.random() * moves.length)];
    }
    // the minimax algorithm:
    // -> checks for a winner, and assigns a score (for win, loss, or tie)
    // -> catalogues potential moves
    // -> for each potential move, algorithm plays out the board (recursively calling minimax) and assigns a score
    // -> maximizing player selects move to maximize their score, minimizing player seeks to minimize opponent's score
    function minimax(gameBoard, player) {
        const possibleMoves = checkPossibleMoves(gameBoard);
        if (winning(gameBoard, game.p1)) {
            return {score: -1};
        } else if (winning(gameBoard, game.p2)) {
            return {score: 1};
        } else if (possibleMoves.length === 0) {
            return {score: 0};
        }
        const moves = [];
        for (let i=0; i<possibleMoves.length; i++) {
            const move = {};
            move.index = gameBoard[possibleMoves[i]];
            gameBoard[possibleMoves[i]] = player.icon;
            if (player === game.p2) {
                const result = minimax(gameBoard, game.p1);
                move.score = result.score;
            } else {
                const result = minimax(gameBoard, game.p2);
                move.score = result.score; 
            }
            gameBoard[possibleMoves[i]] = move.index;
            moves.push(move);
            console.log(move);
        }
        let bestMove = null;
        if (player === game.p2) {
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
    // ended up using this one to identify the winning array
    let winningArray;
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
            if (combination.every(index => {return gameBoard[index] === (name.icon)})) {
                game.winningArray = combination;
                return true;
            }
        })
    }
    // check if the selected square is available
    const check = (id) => {
        let moves = checkPossibleMoves(game.board);
        if (moves[0] == id) {
            return id
        } else if (moves.find(index => index == id)) {
            return id;
        } else {
            return -1;
        }
    }
    // resets the board array, sets it as X's turn
    const restart = () => {
        for (i=0; i<9; i++) {
            game.board[i] = i;
        }
        circleTurn = false;
    }
    // check if player2 == AI
    // -> runs easy or expert AI, after a one second delay
    const checkAI = (input) => {
        if (input.name === "Easy AI") {
            setTimeout(function() {
                basicMoveAI()}, 1000);
        } else if (input.name === "Expert AI") {
            setTimeout(function() {
                advancedMoveAI()}, 1000);
        } else {
            return false;
        }
    }
    // displays whose turn it is, with a message and arrow
    const turnDisplay = () => {
        main.scoreboard[1].children[1].style.display = "grid";
        let turn = main.scoreboard[1].children[1].children[1];
        let reverseArrow = main.scoreboard[1].children[1].children[0];
        let arrow = main.scoreboard[1].children[1].children[2];
        if (!circleTurn) {
            turn.textContent = `${game.p2.name}'s Turn`;
            reverseArrow.style.display = "none";
            arrow.style.display = "block";
        } else {
            turn.textContent = `${game.p1.name}'s Turn`;
            reverseArrow.style.display = "block";
            arrow.style.display = "none";
        }
    }
    // displays win message (instead of the turn display)
    const winDisplay = (input) => {
        const turnContainer = main.scoreboard[1].children[1];
        turnContainer.style.display = "none";
        const winningContainer = main.scoreboard[1].children[2];
        winningContainer.style.display = "flex";
        winningContainer.children[0].textContent = `${input}`;
        
    }
    return { board, turn, basicMoveAI, advancedMoveAI, restart, circleTurn, turnDisplay, p1, p2, winningArray, checkAI, winDisplay }
})();
// modal, scoreboard, players, button listeners
// **not sure if this is best practice but I went about the coding in several blocks
// **then I wrapped most of them within this main module
const main = (() => {
    // create players with factory function, return their name and marker
    const playerFactory = (name, icon, marker, wins) => {
        return {name, icon, marker, wins};
    }
    const scoreboardContainer = document.querySelector('div.scoreboardContainer');
    const scoreboard = Array.from(scoreboardContainer.children);
    const p1Card = scoreboard[0];
    const p2Card = scoreboard[2];
    // modal (on initialization)
    // -> add name, choose marker, select game mode
    // -> if PvP, open section of form for second player name and icon
    const modalContainer = document.querySelector('div.modalContainer');
    const modals = Array.from(modalContainer.children);
    const p1Modal = modals[0];
    const p2Modal = p1Modal.children[4];
    // display modal after page load and one second delay
    // -> game mode listeners (PvP, easy AI, expert AI)
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
            p1Modal.classList.add('extended');
            p2Modal.style.display = "grid";
        }
        pvpbtn.addEventListener('click', pvpFn);
        const easybtn = p1Modal.children[3].children[2];
        const easyFn = () => {
            p1Input.computer("Easy AI");
            game.turnDisplay();
            game.checkAI(game.p2);
        }
        easybtn.addEventListener('click', easyFn);
        const expertbtn = p1Modal.children[3].children[3];
        const expertFn = () => {
            p1Input.computer("Expert AI");
            game.turnDisplay();
            game.checkAI(game.p2);
        }
        expertbtn.addEventListener('click', expertFn);
    }
    modalListener();
    // player1 functions
    const p1Input = (() => {
        const marker = p1Modal.children[2];
        const radioBtns = Array.from(marker.querySelectorAll('input'));
        // find and return the "checked" radio button
        const radioSelection = (input) => {
            let radio;
            for (const radioBtn of input) {
                if (radioBtn.checked) {
                    radio = radioBtn.value;
                    break;
                }
            }
            return radio;
        }
        // display the player's marker on the scoreboard
        // if a marker is already present, remove it before adding the new one
        const markerDisplay = (location, marker) => {
            if (location.children.length > 0) {
                for (i=0; i<location.children.length; i++) {
                    location.removeChild(location.children[i]);
                }
            }
            let selection = document.createElement('img');
            selection.classList.add('marker');
            selection.src = marker.src;
            location.appendChild(selection);
        }
        // create player1 from info in the modal
        // --> display name, marker, wins on the scoreboard
        // --> create marker object: 
                // -> value property is index position in radioBtns array
                // -> src property is img location
        const uploadP1 = () => {
            let name = p1Modal.children[1].children[2].value;
            if (name == '') {
                name = "Player One";
            }
            p1Card.children[1].children[0].textContent = ` ${name}`;
            let labelLocation = p1Card.children[2];
            let marker = {};
            marker.value = radioSelection(radioBtns);
            marker.src = radioBtns[marker.value].nextSibling.firstChild.src;
            markerDisplay(labelLocation, marker);
            game.p1 = playerFactory(name, "O", marker, 0);
            p1Card.children[3].children[0].textContent = `${game.p1.wins}`;
            return game.p1;
        }
        // clear the modal inputs (name and marker)
        const clearInput = () => {
            p1Modal.children[1].children[2].value = "";
            radioBtns[0].checked = true;
        }
        // add computer player and update display accordingly
        const computer = (input) => {
            uploadP1();
            let name = input;
            let marker = {
                value: "0",
                src: "file:///home/peregrinning/Documents/Coding/TOP/tictactoe/img/alpha-x.png"
            }
            game.p2 = playerFactory(name, "X", marker, 0);
            p2Card.children[1].children[0].textContent = ` ${name}`;
            markerDisplay(p2Card.children[2], marker);
            p2Card.children[3].children[0].textContent = `${game.p2.wins}`;
            modalContainer.style.display = "none";
        }
    return { uploadP1, radioSelection, radioBtns, markerDisplay, clearInput, computer }
    })();
    // player2 functions
    const p2Input = (() => {
        const radioBtns = Array.from(p1Modal.children[4].children[1].querySelectorAll('input'));
        // create player2 with modal name input, marker selection
        // check to make sure player2 doesn't select same marker as player1
        const uploadP2 = () => {
            let name = p1Modal.children[4].children[0].children[2].value;
            if (name == '') {
                name = "Player Two";
            }
            p2Card.children[1].children[0].textContent = ` ${name}`;
            let marker = {};
            marker.value = p1Input.radioSelection(radioBtns);
            if (marker.value > 0 && marker.value === game.p1.marker.value) {
                alert('Cannot be the same as Player One!')
            } else {
                marker.src = radioBtns[marker.value].nextSibling.firstChild.src;
                let labelLocation = p2Card.children[2];
                p1Input.markerDisplay(labelLocation, marker);
                game.p2 = playerFactory(name, "X", marker, 0);
                p2Card.children[3].children[0].textContent = `${game.p2.wins}`;
                return game.p2;
            }   
        }
        // clear player2 inputs (name and marker) from modal
        const clearInput = () => {
            p1Modal.children[4].children[0].children[2].value = "";
            radioBtns[0].checked = true;
        }
    return { uploadP2, clearInput }
    })();
    // start button listener
    // -> create player1 and player2
    // -> clear modal input fields and set default radio buttons
    // -> display whose turn it is
    const startListener = () => {
        const startbtn = p1Modal.children[4].children[2].children[0];
        const startFn = () => {
            p1Input.uploadP1();
            if (p2Input.uploadP2()) {
                modalContainer.style.display = "none";
                p1Input.clearInput();
                p2Input.clearInput();
                game.turnDisplay();
            };
        }
        startbtn.addEventListener('click', startFn)
    }
    startListener();
    // rematch button listener
    // -> delete and create grid
    // -> reset board array
    // -> display whose turn it is, check if player2 is AI (if yes, have AI make play)
    const rematchListener = () => {
        const rematchbtn = document.querySelector('input#rematch');
        const rematchFn = () => {
            grid.reset();
            game.restart();
            grid.create();
            game.turnDisplay();
            game.checkAI(game.p2);
        }
        rematchbtn.addEventListener('click', rematchFn);
    }
    rematchListener();
    // restart button listener
    // -> delete and create grid
    // -> reset board array
    // -> display modal (with empty input fields and default radio button)
    const restartListener = () => {
        const restartbtn = document.querySelector('input#restart');
        const restartFn = () => {
            grid.reset();
            game.restart();
            grid.create();
            modalContainer.style.display = "block";
            p1Input.clearInput();
            p2Input.clearInput();
        }
        restartbtn.addEventListener('click', restartFn);
    }
    restartListener();
    return { p1Card, p2Card, scoreboard, p1Input }
})();