document.addEventListener('DOMContentLoaded', () => {
    generateGrid();
});

function generateGrid() {
    const table = document.getElementById('sudoku-grid');
    table.innerHTML = ''; // Clear the existing grid if any
    for (let row = 0; row < 9; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < 9; col++) {
            const td = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'number';
            input.min = '1';
            input.max = '9';
            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

function solveSudoku() {
    const grid = getGrid();
    if (solve(grid)) {
        setGrid(grid);
    } else {
        alert('No solution exists');
    }
}

function resetSudoku() {
    generateGrid();
}

function getGrid() {
    const grid = [];
    const rows = document.querySelectorAll('#sudoku-grid tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td input');
        const rowData = [];
        cells.forEach(cell => {
            rowData.push(cell.value ? parseInt(cell.value) : 0);
        });
        grid.push(rowData);
    });
    return grid;
}

function setGrid(grid) {
    const rows = document.querySelectorAll('#sudoku-grid tr');
    rows.forEach((row, rowIndex) => {
        const cells = row.querySelectorAll('td input');
        cells.forEach((cell, colIndex) => {
            cell.value = grid[rowIndex][colIndex] !== 0 ? grid[rowIndex][colIndex] : '';
        });
    });
}

function isSafe(grid, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num || grid[x][col] === num) {
            return false;
        }
    }

    const startRow = row - row % 3;
    const startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[i + startRow][j + startCol] === num) {
                return false;
            }
        }
    }

    return true;
}

function solve(grid) {
    let row = -1;
    let col = -1;
    let isEmpty = true;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] === 0) {
                row = i;
                col = j;
                isEmpty = false;
                break;
            }
        }
        if (!isEmpty) {
            break;
        }
    }

    if (isEmpty) {
        return true;
    }

    for (let num = 1; num <= 9; num++) {
        if (isSafe(grid, row, col, num)) {
            grid[row][col] = num;
            if (solve(grid)) {
                return true;
            }
            grid[row][col] = 0;
        }
    }

    return false;
}
