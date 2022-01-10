import { gameBoard } from './gameBoard.js';

let gameInPlay;
let updateBoard;
let checkingLoops;
let checkingInactivity;
let isPaused = false;
let allCellsInactive = false;
let iterationCount = 0;

const beginGame = () => {
  const activeCell = gameBoard.find(cell => cell.value);
  if (activeCell && gameButton.textContent === 'BEGIN GAME') {
    gameButton.textContent = 'PAUSE GAME';
    gameInPlay = setInterval(cycle, 80);
  }

  else { pauseGame(); }

  isPaused = true;
};

const cycle = () => {
  gameBoard.forEach(cell => {
    checkActiveCellFutureStatus(gameBoard[cell.id]);
  })

  checkingLoops = setTimeout(checkForLoopingCells, 25);
  checkingInactivity = setTimeout(checkCellsForInactivity, 30);
  updateBoard = setTimeout(changeStatus, 35);
};

const checkActiveCellFutureStatus = (cell) => {
  if (gameBoard[cell.id].value && getActiveSurroundingCellValues(gameBoard[cell.id]) < 2 || gameBoard[cell.id].value && getActiveSurroundingCellValues(gameBoard[cell.id]) > 3) {
    markCell(gameBoard[cell.id], 'marked-for-inactive');
  }

  else if (!gameBoard[cell.id].value && getActiveSurroundingCellValues(gameBoard[cell.id]) === 3) {
    markCell(gameBoard[cell.id], 'marked-for-active');
  }
};

const getActiveSurroundingCellValues = (cell) => {
  let value = 0;
  gameBoard[cell.id].surroundingCells.forEach(surrCell => {
    value += gameBoard[surrCell].value;
  })

  return value;
};

const markCell = (cell, mark) => {
  gameBoard[cell.id].position.firstChild.classList.add(mark);
  gameBoard[cell.id].gotMarked = true;
};

const checkForLoopingCells = (cell) => {
    gameBoard.forEach(cell => {
      if (
        gameBoard[cell.id].value &&
        gameBoard[cell.top].value &&
        gameBoard[cell.bottom].value &&
        gameBoard[cell.top].gotMarked &&
        gameBoard[cell.bottom].gotMarked
      ) { setDangerAndMarkedBools(cell.id, cell.top, cell.bottom, cell.left, cell.right); }

      else if (
        gameBoard[cell.id].value &&
        gameBoard[cell.left].value &&
        gameBoard[cell.right].value &&
        gameBoard[cell.left].gotMarked &&
        gameBoard[cell.right].gotMarked
      ) { setDangerAndMarkedBools(cell.id, cell.left, cell.right, cell.top, cell.bottom); }
    })
};

const setDangerAndMarkedBools = (id, idInDangerOne, idInDangerTwo, idMarkedOne, idMarkedTwo) => {
  gameBoard[id].inDanger = true;
  gameBoard[id].gotMarked = true;
  gameBoard[idInDangerOne].inDanger = true;
  gameBoard[idInDangerTwo].inDanger = true;
  gameBoard[idMarkedOne].gotMarked = false;
  gameBoard[idMarkedTwo].gotMarked = false;
};

const checkCellsForInactivity = () => {
  const unmarkedCells = gameBoard.filter(cell => !gameBoard[cell.id].gotMarked);
  const cellsNotInDanger = gameBoard.filter(cell => !gameBoard[cell.id].inDanger);
  if (cellsNotInDanger.length === unmarkedCells.length || unmarkedCells.length === gameBoard.length) {
    allCellsInactive = true;
  }
};

const changeStatus = () => {
  if (!allCellsInactive) {
    gameBoard.forEach(cell => {
      const cellClass = gameBoard[cell.id].position.firstChild.classList;
      if (cellClass.contains('marked-for-inactive')) {
        cellClass.add('hidden');
        cellClass.remove('marked-for-inactive');
        changeCellValue(gameBoard[cell.id].id);
        iterationCount++;
      }

      else if (cellClass.contains('marked-for-active')) {
        cellClass.remove('hidden');
        cellClass.remove('marked-for-active');
        changeCellValue(gameBoard[cell.id].id);
        iterationCount++;
      }

      gameBoard[cell.id].inDanger = false;
      gameBoard[cell.id].gotMarked = false;
    })

    iterationCount++; }

  else { endGame(); }
};

const pauseGame = () => {
  clearTimeout(checkingLoops);
  clearTimeout(checkingInactivity);
  clearTimeout(updateBoard);
  clearInterval(gameInPlay);
  gameButton.textContent = 'BEGIN GAME';
};

const endGame = () => {
  gameBoard.forEach(cell => {
    const cellClass = gameBoard[cell.id].position.firstChild.classList;

    cellClass.add('hidden');
    cellClass.remove('marked-for-inactive');
    cellClass.remove('marked-for-active');

    gameBoard[cell.id].value = 0;
    gameBoard[cell.id].inDanger = false;
    gameBoard[cell.id].gotMarked = false;
  })

  pauseGame()
  if (isPaused) { alert(`Game Over! Final Score: ${iterationCount}`); }
  clearVariables();
};

const clearVariables = () => {
  isPaused = false;
  allCellsInactive = false;
  iterationCount = 0;
}

const changeCellValue = (id) => {
  gameBoard[id].value === 0 ? gameBoard[id].value = 1 : gameBoard[id].value = 0;
};

export {
  beginGame,
  iterationCount,
  changeCellValue,
  isPaused,
  endGame
};
