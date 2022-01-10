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
};

const boardInitializer = Array(6500).fill(null);
const gameBoard = boardInitializer.map((cell, i) => new SingleCell(i));

const beginSelectingCells = () => {
  gameBoard.forEach((cell, i) => {
    determineSurrCells(cell, i);
    setCellLoopWatch(cell);
  })
};

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
  ];

  let cellsy = allSurroundingCells.filter(cell => cell !== undefined);
  cellsy.forEach(cellssy => {
    cell.surroundingCells = [...cell.surroundingCells, cellssy.id];
  })
};

const setCellLoopWatch = (cell) => {
  let id = cell.id;

  if (id === 0 || id === 6499) {
    setWatchedCells(cell, 5, 2, 7, 0);
  }

  else if (id === 99 || id === 6400) {
    setWatchedCells(cell, 4, 7, 0, 1);
  }

  else if (id > 0 && id < 99 || id > 6400 && id < 6499) {
    setWatchedCells(cell, 6, 3, 0, 1);
  }

  else {
    setWatchedCells(cell, 4, 5, 0, 1);
  }
};

const setWatchedCells = (cell, t, b, l, r) => {
  cell.top = cell.surroundingCells[t];
  cell.bottom = cell.surroundingCells[b];
  cell.left = cell.surroundingCells[l];
  cell.right = cell.surroundingCells[r];
};

beginSelectingCells();

export {
  gameBoard
};
