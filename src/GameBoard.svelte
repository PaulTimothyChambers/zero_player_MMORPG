<script>
  import Cell from './Cell.svelte';
  import { savedConfigs } from '/store/savedConfigs.js';

  export let isInPlay;
  export let gameBoard;
  export let nameNewConfig;
  export let changeCellValue;
  export let getQuerySelectors;

  let latestConfig;

  const toggleActive = (id) => {
    let cell = gameBoard[id];
    getQuerySelectors();
    cell.position.firstChild.classList.toggle('hidden');
    changeCellValue(cell.id);
    if (!isInPlay) {
      latestConfig = gameBoard.filter(cell => gameBoard[cell.id].value);
    }
  };
</script>

<button
  class="save-config-button"
  on:click={() => nameNewConfig(latestConfig)}
  >SAVE MOST RECENT STARTING CONFIGURATION
</button>
<div class="game-board">
  {#each gameBoard as cell, id}
    <Cell {toggleActive} {id}/>
  {/each}
</div>

<style media="screen">
  .save-config-button {
    position: absolute;
    height: 3rem;
    width: 11rem;
    margin: 3.3rem 0rem 0rem 11.4rem;
    cursor: pointer;
  }

  .game-board {
    width: 62.5rem;
    margin-top: 0.5rem;
    display: flex;
    flex-direction: row;
    margin-left: 23rem;
    flex-wrap: wrap;
    border-style: solid;
    border-width: .625rem;
    position: absolute;
  }
</style>
