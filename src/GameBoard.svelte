<script>
  import Cell from './Cell.svelte';
  import { savedConfigs } from '/store/savedConfigs.js'

  export let gameBoard
  // export let gameButton
  export let changeCellValue
  export let isPaused

  // let isPreview = false
  let latestConfig;
  let savedConfig = {}

  savedConfigs.subscribe(configs => {
    savedConfig = configs
  })

  const toggleActive = (e) => {
    e.classList.toggle('hidden')
    let cell = gameBoard[e.id]
    changeCellValue(cell.id)
    if (!isPaused) {
      latestConfig = gameBoard.filter(cell => cell.value)
    }
  }

  const saveLatestConfig = () => {
    savedConfig = {
      id: Date.now(),
      title: 'title',
      config: latestConfig
    }
    // alertConfigSaved()
    savedConfigs.update(configs => [...configs, savedConfig])
    // setTimeout(alertConfigSaved, 2000)
  }

  // const alertConfigSaved = () => {
  //   document.toggle('popIn') ... (then 'fadeOut')
  // }
</script>

<button on:click={saveLatestConfig}>SAVE STARTING CONFIGURATION (CONFIGURATION MOST RECENTLY USED)</button>
<div class="game-board">
  {#each gameBoard as cell, i}
    <Cell {toggleActive} id={i} cell={cell} />
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
