<svelte:head>
  <title>A Procedurally-Generated Open World AAA Title Game</title>
</svelte:head>

<script>
  import GameBoard from '../GameBoard.svelte';
  import { savedConfigs } from '/store/savedConfigs.js';
  import { gameBoard } from '/store/gameBoard.js';
  import { highScores } from '/store/highScores.js';

  let savedConfig = {};
  let configToSave = [];
  let allHighScores = [];
  let iterationCount = 0;
  let gameButton;
  let gameInPlay;
  let updateBoard;
  let checkingLoops;
  let checkingInactivity;
  let isInPlay = false;
  let isTopScore = false;
  let ranSelectors = false;
  let isSavingConfig = false;
  let allCellsInactive = false;
  let isViewingConfigs = false;

  $: newConfigName = '';
  $: newTopTenPlayerName = '';

  highScores.subscribe(scores => {
    allHighScores = scores;
  });

  savedConfigs.subscribe(configs => {
    savedConfig = configs;
  });

  const beginGame = () => {
    const activeCell = gameBoard.find(cell => cell.value);
    if (activeCell && gameButton.textContent === 'BEGIN GAME') {
      gameButton.textContent = 'PAUSE GAME';
      gameInPlay = setInterval(cycle, 60);
    }

    else { pauseGame(); }
    isInPlay = true;
  };

  const cycle = () => {
    checkingLoops = setTimeout(checkForLoopingCells, 5);
    checkingInactivity = setTimeout(checkCellsForInactivity, 10);
    updateBoard = setTimeout(changeStatus, 15);
    gameBoard.forEach(cell => {
      checkActiveCellFutureStatus(gameBoard[cell.id]);
    })
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

      iterationCount++;
    }

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

    pauseGame();

    if (isInPlay && iterationCount && iterationCount >= allHighScores[9].score) {
      isTopScore = true;
    }

    else if (isInPlay) {
      alert(`Game Over! Final Score: ${iterationCount}`);
      clearVariables();
    }
  };

  const setNewHighScores = () => {
    if (!newTopTenPlayerName) {
      let randomInt = Math.random() * (10000 - 1) + 1
      newTopTenPlayerName = `ANONYMOUS USER ${randomInt.toFixed(0)}`;
    }

    allHighScores.splice(9, 1, {id: Date.now(), player: newTopTenPlayerName, score: iterationCount});
    allHighScores.sort((a, b) => b.score - a.score);
    highScores.update(scores => scores = allHighScores);
    isTopScore = false;
    clearVariables();
  };

  const getQuerySelectors = () => {
    if (!ranSelectors) {
      gameBoard.forEach(cell => {
        cell.position = document.getElementById(`${cell.id}`);
      })
      gameButton = document.getElementById('gameButton');
      ranSelectors = true;
    }
  };

  const saveLatestConfig = (latestConfig) => {
    if (!newConfigName) {
      newConfigName = 'Untitled';
    }

    savedConfig = {
      id: Date.now(),
      title: newConfigName,
      config: configToSave
    };

    savedConfigs.update(configs => [...configs, savedConfig]);
    configToSave = [];
    newConfigName = '';
    cancelSave();
  };

  const loadConfigToGameBoard = (config) => {
    getQuerySelectors();
    endGame();
    config.config.forEach(selectedCell => {
      gameBoard.forEach(cell => {
        if (cell.id === selectedCell.id) {
          gameBoard[cell.id].position.firstChild.classList.toggle('hidden');
          gameBoard[cell.id].value = 1;
          gameBoard[cell.id].gotMarked = true;
        }
      })
    })

    returnToBoard();
  };

  const clearVariables = () => {
    isInPlay = false;
    allCellsInactive = false;
    iterationCount = 0;
  };

  const changeCellValue = (id) => {
    gameBoard[id].value === 0 ? gameBoard[id].value = 1 : gameBoard[id].value = 0;
  };

  const removeSavedConfig = (id) => {
    savedConfigs.update(configs => configs.filter(config => config.id !== id));
  };

  const nameNewConfig = (latestConfig) => {
    if (latestConfig) {
      configToSave = latestConfig;
      isSavingConfig = true;
    }

    else {
      cancelSave();
      alert('No configuration found. Please select at least one cell from the board below:');
    }
  };

  const cancelSave = () => {
    isSavingConfig = false;
  };

  const viewSavedConfigs = () => {
    isViewingConfigs = true;
  };

  const returnToBoard = () => {
    isViewingConfigs = false;
  };
</script>

<main>
  {#if isViewingConfigs}
    <section class="overlay">
      <div class="modal">
        {#each $savedConfigs as config}
          <div class="config-card">
            <p>{config.title}</p>
            <button on:click={() => loadConfigToGameBoard(config)}>Load {config.title}</button>
            <button on:click={() => removeSavedConfig(config.id)}>Delete {config.title}</button>
          </div>
        {/each}
        <button class="" on:click={returnToBoard}>Go Back</button>
      </div>
    </section>
  {:else if isTopScore}
    <section class="overlay">
      <div class="modal">
        <form on:submit={setNewHighScores}>
          <input type="text" name="playerName" bind:value={newTopTenPlayerName}>
          <button class="" on:click={setNewHighScores}>Submit High Score</button>
        </form>
      </div>
    </section>
  {:else if isSavingConfig}
    <section class="overlay">
      <div class="modal">
        <form on:submit={saveLatestConfig}>
          <input type="text" name="playerName" bind:value={newConfigName}>
          <button class="" on:click={saveLatestConfig}>Save Configuration</button>
          <button class="" on:click={cancelSave}>Cancel</button>
        </form>
      </div>
    </section>
  {/if}
  <nav class="user-interaction-bar">
    <button class="begin-game-button" id="gameButton" on:click={beginGame}>BEGIN GAME</button>
    <button class="end-game-button" on:click={endGame}>END GAME & CLEAR BOARD</button>
    <button class="load-config-button" on:click={viewSavedConfigs}>LOAD SAVED CONFIGURATIONS</button>
  </nav>
  <GameBoard {gameBoard} {changeCellValue} {isInPlay} {getQuerySelectors} {nameNewConfig}/>
  <p class="count">Your Score = {iterationCount}</p>
  <section class="scoreboard">
    <div class="high-scores">
      <h3 class="high-scores-header">HIGH SCORES</h3>
      {#if !allHighScores}
        <p class="loading-scores">Loading high scores...</p>
      {:else}
        {#each allHighScores as highScore, i}
          <p class="high-scores__name">{`${i + 1}:`} {highScore.player}</p>
          <p class="high-scores__score">{highScore.score}</p>
        {/each}
      {/if}
    </div>
  </section>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
  }

  .begin-game-button,
  .end-game-button,
  .load-config-button {
    margin-bottom: 1rem;
  }

  .user-interaction-bar {
    width: 15vw;
  }

  .overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: black;
    opacity: 0.9;
    position: fixed;
    margin: -0.5rem 0rem 0rem -0.5rem;
    z-index: 2;
  }

  /* .overlay__button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10rem;
    width: 15rem;
    z-index: 3;
    cursor: pointer;
  } */

  .modal {
    height: 20rem;
    width: 20rem;
    background-color: white;
    color: black;
    font-size: 14px;
    position: absolute;
  }

  .count {
    font-size: 15px;
  }

  .high-scores {
    border-style: solid;
    border-width: 0.3rem;
    border-radius: 3px;
    width: 20rem;
    font-size: 11px;
  }

  .high-scores__name {
    margin-left: 0.3rem;
  }

  .high-scores__score {
    text-align: right;
    margin-top: -1.5rem;
    margin-right: 0.7rem;
  }
</style>
