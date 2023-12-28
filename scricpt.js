const box = document.getElementById('box');

const ROW = 50;
const COL = 50;

let grid = new Array(ROW).fill(null)
    .map(_ => new Array(COL).fill(null)
        .map(_ => Math.floor(Math.random() * 2))
    );

// console.table(grid);

function nextGen(grid) {
    let nextGenGrid = grid.map(e => [...e]);
    // console.log(nextGenGrid);
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let num = calculateNeighbours(grid, i, j);
            if (num < 2 || num > 3) {
                nextGenGrid[i][j] = 0;
            }else if (num === 3) {
                nextGenGrid[i][j] = 1;
            }
        } 
    }
    setTimeout(() => {
       draw(nextGenGrid);
    //    console.log(nextGenGrid);
    //    debugger;
       nextGen(nextGenGrid); 
    }, 100);
}

function calculateNeighbours(grid, i, j){
    let num = 0;
    for (let k = -1; k < 2; k++) {
        for (let l = -1; l < 2; l++) {
            const r = k + i;
            const c = l + j;
            if (k === 0 && l === 0) {
                continue;
            }
            if (r >= 0 && r < grid.length && c >= 0 && c < grid[i].length ) {
                num += grid[r][c];
            }
        }
    }
    return num;
}

function draw(grid) {
    box.innerHTML = '';
    grid.forEach(row => {
        let rowString = '<tr>';
        row.forEach(col => {
            rowString += col ? `<td class="cell alive"></td>` : `<td class="cell"></td>`;
        })
        box.innerHTML += rowString;
    }); 
}

nextGen(grid);
