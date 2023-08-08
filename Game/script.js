const numRows = 8;
const numCols = 6;
const candyColors = ['red', 'blue', 'green', 'yellow'];
const gameBoard = document.getElementById('gameBoard');
let selectedCandy = null;
let candies = [];

function createCandy(row, col) {
    if (candies[row][col] === null) {
        return { color: null };
    }

    let randomColor;
    do {
        randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
    } while ((row > 0 && candies[row - 1][col].color === randomColor));

    const candy = {
        color: randomColor
    };
    return candy;
}

function renderBoard() {
    gameBoard.innerHTML = '';
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const candy = candies[row][col];
            const cell = document.createElement('div');
            cell.className = 'cell';
            
            if (candy.color !== null) {
                const candyImage = getCandyImageURL(candy.color);
                cell.style.backgroundImage = `url('${candyImage}')`;
            }
            
            cell.onclick = () => onCandyClick(row, col);
            gameBoard.appendChild(cell);
        }
        gameBoard.appendChild(document.createElement('br'));
    }
}

function getCandyImageURL(color) {
    if (color === 'red') {
        return 'obj-1.png';
    } else if (color === 'blue') {
        return 'obj-2.png';
    } else if (color === 'yellow') {
        return 'obj-3.png';
    } else if (color === 'green') {
        return 'obj-4.png';
    }
}





function initializeBoard() {
    candies = []; // Reset the candies array before initializing
    for (let row = 0; row < numRows; row++) {
        candies[row] = [];
        for (let col = 0; col < numCols; col++) {
            const candy = createCandy(row, col);
            candies[row][col] = candy;
        }
    }
    
    // Set first and last cells of the first row to null
    candies[0][0] = { color: null };
    candies[3][2] = { color: null };
    candies[3][3] = { color: null };
    candies[4][2] = { color: null };
    candies[4][3] = { color: null };
    candies[0][numCols - 1] = { color: null };
    candies[7][0] = { color: null };
    candies[7][numCols - 1] = { color: null };
    
    renderBoard();
}

function onCandyClick(row, col) {
    console.log(candies[row][col], row, col);
    if (selectedCandy === null) {
        selectedCandy = { row, col };
    } else {
        const rowDiff = Math.abs(row - selectedCandy.row);
        const colDiff = Math.abs(col - selectedCandy.col);

        if (
            (rowDiff === 1 && colDiff === 0) ||
            (rowDiff === 0 && colDiff === 1)
        ) {
            const targetCandy = candies[row][col];
            const selectedCandyRow = selectedCandy.row;
            const selectedCandyCol = selectedCandy.col;

            switch (`${selectedCandyRow},${selectedCandyCol}`) {
                case '0,0':
                case '3,3':
                case '3,2':
                case '4,3':
                case '4,2':
                case `0,${numCols - 1}`:
                case '7,2':
                case `7,${numCols - 1}`:
                    allow = false;
                    break;
                default:
                    allow = true;
            }

            if (targetCandy.color !== null && allow === true) {
                // Swap candies
                const tempColor = targetCandy.color;
                targetCandy.color = candies[selectedCandyRow][selectedCandyCol].color;
                candies[selectedCandyRow][selectedCandyCol].color = tempColor;

                // Clear selection
                selectedCandy = null;

                // Update the game board
                renderBoard();
            }
        } else {
            // Reset the selection
            selectedCandy = null;
        }
    }
}

function checkAndDeleteMatches() {
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col <= numCols - 3; col++) {
            const candyColor = candies[row][col].color;

            // Check horizontal matches
            if (candyColor && candies[row][col + 1].color === candyColor && candies[row][col + 2].color === candyColor) {
                candies[row][col].color = null;
                candies[row][col + 1].color = null;
                candies[row][col + 2].color = null;
            }
        }
    }

    for (let col = 0; col < numCols; col++) {
        for (let row = 0; row <= numRows - 3; row++) {
            const candyColor = candies[row][col].color;

            // Check vertical matches
            if (candyColor && candies[row + 1][col].color === candyColor && candies[row + 2][col].color === candyColor) {
                candies[row][col].color = null;
                candies[row + 1][col].color = null;
                candies[row + 2][col].color = null;
            }
        }
    }
}

function resetGame() {
    initializeBoard();
}

function loop() {
    setTimeout(() => {
        requestAnimationFrame(loop);
        checkAndDeleteMatches();
        renderBoard();
    }, 800);
}

initializeBoard();
loop();


