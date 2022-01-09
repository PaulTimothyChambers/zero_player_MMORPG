import { writable } from 'svelte/store';

class SingleCell {
  constructor(id) {
    this.id = id;
    this.position = '';
    this.value = 0;
    this.surroundingCells = [];
    this.surroundingCellsValue = 0;
    this.top = 0;
    this.bottom = 0;
    this.left = 0;
    this.right = 0;
    this.inDanger = false;
    this.gotMarked = false;
  }
}

// let gameBoard;

const boardInitializer = Array(6500).fill(null)
const gameBoard = boardInitializer.map((cell, i) => {
  return new SingleCell(i)
  // gameBoard.push(celly[i])
})
// console.log(gameBoard);

const beginSelectingCells = () => {
  gameBoard.forEach((cell, i) => {
    determineSurrCells(cell, i)
    setCellLoopWatch(cell)
  })
}

// let celly = gameBoard
// console.log(celly);

const determineSurrCells = (cell, i) => {
  let allSurroundingCells = [
    gameBoard[cell.id-1],
    gameBoard[cell.id+1],
    gameBoard[cell.id-99],
    gameBoard[cell.id+99],
    gameBoard[cell.id-100],
    gameBoard[cell.id+100],
    gameBoard[cell.id-101],
    gameBoard[cell.id+101],
    gameBoard[cell.id-6399],
    gameBoard[cell.id+6399],
    gameBoard[cell.id-6400],
    gameBoard[cell.id+6400],
    gameBoard[cell.id-6401],
    gameBoard[cell.id+6401],
    gameBoard[cell.id-6499],
    gameBoard[cell.id+6499],
  ]
  let cellsy = allSurroundingCells.filter(cell => cell !== undefined)
  cellsy.forEach(cellssy => {
    cell.surroundingCells = [...cell.surroundingCells, cellssy.id]
  })
  // cell.surroundingCells = cellsy.value
  // console.log(cell.id, cell.surroundingCells);
  // cell.surroundingCells = surroundingCells
}

const setCellLoopWatch = (cell) => {
  let id = cell.id

  if (id === 0 || id === 6499) {
    setWatchedCells(cell, 5, 2, 7, 0)
  }

  else if (id === 99 || id === 6400) {
    setWatchedCells(cell, 4, 7, 0, 1)
  }

  else if (id > 0 && id < 99 || id > 6400 && id < 6499) {
    setWatchedCells(cell, 6, 3, 0, 1)
  }

  else {
    setWatchedCells(cell, 4, 5, 0, 1)
  }
}

const setWatchedCells = (cell, t, b, l, r) => {
  cell.top = cell.surroundingCells[t]
  cell.bottom = cell.surroundingCells[b]
  cell.left = cell.surroundingCells[l]
  cell.right = cell.surroundingCells[r]
}

beginSelectingCells()

// console.log(gameBoard);

const savedConfigs = writable([
  {id: 1, title: 'Preset One', config: [gameBoard[2758], gameBoard[2857], gameBoard[2859], gameBoard[2940], gameBoard[2941], gameBoard[2957], gameBoard[2958], gameBoard[2960], gameBoard[3040], gameBoard[3042], gameBoard[3057], gameBoard[3058], gameBoard[3060], gameBoard[3061], gameBoard[3065], gameBoard[3066], gameBoard[3135], gameBoard[3136], gameBoard[3143], gameBoard[3157], gameBoard[3158], gameBoard[3160], gameBoard[3165], gameBoard[3166], gameBoard[3231], gameBoard[3232], gameBoard[3234], gameBoard[3237], gameBoard[3240], gameBoard[3243], gameBoard[3257], gameBoard[3259], gameBoard[3331], gameBoard[3332], gameBoard[3335], gameBoard[3336], gameBoard[3343], gameBoard[3358], gameBoard[3440], gameBoard[3442], gameBoard[3540], gameBoard[3541]]}
]);

export {
  savedConfigs,
  gameBoard,
  beginSelectingCells,
  setCellLoopWatch,
  setWatchedCells,
  // cells
}

// class SingleCell {
  //   constructor(id) {
    //     this.id = id;
    //     this.position = '';
    //     this.value = 0;
    //     this.surroundingCells = [];
    //     this.surroundingCellsValue = 0;
    //     this.top = {};
    //     this.bottom = {};
    //     this.left = {};
    //     this.right = {};
    //     this.inDanger = false;
    //     this.gotMarked = false;
    //   }
    // }
    //
    // let cells = []
    //
    // const boardInitializer = Array(6500).fill(null)
    // const gameBoard = boardInitializer.map((cell, i) => {
      //   return new SingleCell(i)
      // })
      //
      // const beginSelectingCells = () => {
        //   gameBoard.forEach((cell, i) => {
          //     cells = [...cells, cell]
          //   })
          //   cells.forEach(cell => {
            //     determineSurrCells(cell)
            //     setCellLoopWatch(cell)
            //   })
            // }
            //
            // const determineSurrCells = (cell) => {
              //   let surroundingCellsWithUndefined = [
                //     gameBoard[cell.id-1],
                //     gameBoard[cell.id+1],
                //     gameBoard[cell.id-99],
                //     gameBoard[cell.id+99],
                //     gameBoard[cell.id-100],
                //     gameBoard[cell.id+100],
                //     gameBoard[cell.id-101],
                //     gameBoard[cell.id+101],
                //     gameBoard[cell.id-6399],
                //     gameBoard[cell.id+6399],
                //     gameBoard[cell.id-6400],
                //     gameBoard[cell.id+6400],
                //     gameBoard[cell.id-6401],
                //     gameBoard[cell.id+6401],
                //     gameBoard[cell.id-6499],
                //     gameBoard[cell.id+6499],
                //   ]
                //
                //   const surroundingCells = surroundingCellsWithUndefined.filter(cell => cell !== undefined)
                //   cell.surroundingCells = surroundingCells
                // }
                //
                // const setCellLoopWatch = (cell) => {
                  //   let id = cell.id
                  //
                  //   if (id === 0 || id === 6499) {
                    //     setWatchedCells(cell, 5, 2, 7, 0)
                    //   }
                    //
                    //   else if (id === 99 || id === 6400) {
                      //     setWatchedCells(cell, 4, 7, 0, 1)
                      //   }
                      //
                      //   else if (id > 0 && id < 99 || id > 6400 && id < 6499) {
                        //     setWatchedCells(cell, 6, 3, 0, 1)
                        //   }
                        //
                        //   else {
                          //     setWatchedCells(cell, 4, 5, 0, 1)
                          //   }
                          // }
                          //
                          // const setWatchedCells = (cell, t, b, l, r) => {
                            //   cell.top = cell.surroundingCells[t]
                            //   cell.bottom = cell.surroundingCells[b]
                            //   cell.left = cell.surroundingCells[l]
                            //   cell.right = cell.surroundingCells[r]
                            // }
