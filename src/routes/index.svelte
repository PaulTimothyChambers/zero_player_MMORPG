<svelte:head>
  <title>Procedurally Generated, Open World</title>
</svelte:head>

<script>
  import GameBoard from '../GameBoard.svelte';
  import { savedConfigs } from '/store/savedConfigs.js';
  import { gameBoard } from '/store/gameBoard.js';
  import { beginGame, iterationCount, changeCellValue, isPaused, endGame } from '/store/gameCycle.js';

  let gameButton;
  let ranSelectors = false;
  let isViewingConfigs = false;

  const viewSavedConfigs = () => {
    isViewingConfigs = true;
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
    isViewingConfigs = false;
  };

  const returnToBoard = () => {
    isViewingConfigs = false;
  };
</script>

<main>
  {#if isViewingConfigs}
    <section class="overlay-two" id="overlayTwo">
      <div class="load-config-modal">
        {#each $savedConfigs as config}
          <div class="config-card">
            <p>{config.title}</p>
            <!-- <button on:click={() => previewConfig(config)}>Preview Configuration</button> -->
            <button on:click={() => loadConfigToGameBoard(config)}>Load {config.title}</button>
          </div>
        {/each}
        <button class="" on:click={returnToBoard}>Go Back</button>
      </div>
    </section>
  {/if}
  <div class="user-interaction-bar">
    <button id="gameButton" on:click={beginGame}>BEGIN GAME</button>
    <button on:click={endGame}>END GAME & CLEAR BOARD</button>
    <button on:click={viewSavedConfigs}>LOAD CONFIGURATION</button>
    <p class="count">Your Score = {iterationCount}</p>
    <GameBoard {gameBoard} {changeCellValue} {isPaused} {getQuerySelectors} />
  </div>
</main>

<style>
  .overlay,
  .overlay-two {
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

  .overlay__button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10rem;
    width: 15rem;
    z-index: 3;
    cursor: pointer;
  }

  .load-config-modal {
    height: 20rem;
    width: 20rem;
    background-color: white;
    color: black;
    font-size: 14px;
    position: absolute;
  }

  .count {
    font-size: 12px;
  }
</style>
