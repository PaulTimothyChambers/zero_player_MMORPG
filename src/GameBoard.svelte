<script>
  import Cell from './Cell.svelte';
  import { savedConfigs } from '/store/savedConfigs.js';

  export let gameBoard;
  export let changeCellValue;
  export let isPaused;
  export let getQuerySelectors;

  let latestConfig;
  let savedConfig = {};

  savedConfigs.subscribe(configs => {
    savedConfig = configs;
  });

  const toggleActive = (id) => {
    let cell = gameBoard[id];
    getQuerySelectors();
    cell.position.firstChild.classList.toggle('hidden');
    changeCellValue(cell.id);
    if (!isPaused) {
      latestConfig = gameBoard.filter(cell => gameBoard[cell.id].value);
    }
  };

  const saveLatestConfig = () => {
    savedConfig = {
      id: Date.now(),
      title: 'title',
      config: latestConfig
    };
    // alertConfigSaved()
    savedConfigs.update(configs => [...configs, savedConfig]);
    // setTimeout(alertConfigSaved, 2000)
  };

  // const alertConfigSaved = () => {
  //   document.toggle('popIn') ... (then 'fadeOut')
  // }
</script>

<button on:click={saveLatestConfig}>SAVE STARTING CONFIGURATION (CONFIGURATION MOST RECENTLY USED)</button>
<div class="game-board">
  {#each gameBoard as cell, i}
    <Cell {toggleActive} id={i} />
  {/each}
</div>

<style media="screen">
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
