<svelte:head>
  <title>Massive Open World</title>
</svelte:head>

<script>
  import GameBoard from '../GameBoard.svelte';
  // import PreviewGameBoard from '../PreviewGameBoard.svelte';
  import { gameBoard, savedConfigs } from '/store/savedConfigs.js'
  import { get } from 'svelte/store';

  let gameButton
  let isFreshlyOpened = true
  let isViewingConfigs = false
  let updateBoard
  let iterationCount = 0
  let gameInPlay
  let isPaused = false
  // let previewBoard = []

  const beginSelectingCells = () => {
    gameButton = document.getElementById('gameButton')
    gameBoard.forEach(cell => {
      determineSurrCells(cell)
      cell.position = document.getElementById(`${cell.id}`)
    })
    isFreshlyOpened = false
  }

  const determineSurrCells = (cell) => {
    let surroundingCellsWithUndefined = [
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
    const surroundingCells = surroundingCellsWithUndefined.filter(cell => cell !== undefined)
    cell.surroundingCells = surroundingCells
  }

  const viewSavedConfigs = () => {
    isViewingConfigs = true
  }

  const beginGame = () => {
    const activeCell = gameBoard.find(cell => cell.value)
    if (activeCell && gameButton.textContent === 'BEGIN GAME') {
      gameButton.textContent = 'PAUSE GAME'
      gameInPlay = setInterval(cycle, 60)
    } else {
      pauseGame()
    }
    isPaused = true
  }

  const cycle = () => {
    updateBoard = setTimeout(changeStatus, 30)
    gameBoard.forEach(cell => {
      if (cell.value) {
        checkActiveCellFutureStatus(cell)
      } else {
        checkInactivCellFutureStatus(cell)
      }
    })
  }

  const checkActiveCellFutureStatus = (cell) => {
    if (getActiveSurroundingCellValues(cell) < 2 || getActiveSurroundingCellValues(cell) > 3) {
      markForInactive(cell.position.firstChild)
    }
  }

  const checkInactivCellFutureStatus = (cell) => {
    if (getActiveSurroundingCellValues(cell) === 3) {
      markForActive(cell.position.firstChild)
    }
  }

  const getActiveSurroundingCellValues = (cell) => {
    const cellsValue = cell.surroundingCells.reduce((acc, surroundingCell) => {
      return acc += gameBoard[surroundingCell.id].value
    }, 0)
    return cellsValue
  }

  const markForInactive = (cell) => {
    cell.classList.add('marked-for-inactive')
  }

  const markForActive = (cell) => {
    cell.classList.add('marked-for-active')
  }

  const changeStatus = () => {
    gameBoard.forEach(cell => {
      const cellClass = cell.position.firstChild.classList
      if (cellClass.contains('marked-for-inactive')) {
        cellClass.add('hidden')
        cellClass.remove('marked-for-inactive')
        changeCellValue(cell.id)

      } else if (cellClass.contains('marked-for-active')) {
        cellClass.remove('hidden')
        cellClass.remove('marked-for-active')
        changeCellValue(cell.id)
      }
    })
    iterationCount++
  }

  const pauseGame = () => {
    clearInterval(gameInPlay)
    clearTimeout(updateBoard)
    gameButton.textContent = 'BEGIN GAME'
  }

  const endGame = () => {
    gameBoard.forEach(cell => {
      const cellClass = cell.position.firstChild.classList
      if (cell.value) {
        cellClass.add('hidden')
        cellClass.remove('marked-for-inactive')
        changeCellValue(cell.id)
      } else {
        cellClass.remove('marked-for-active')
      }
    })
    pauseGame()
    console.log(iterationCount);
    isPaused = false
    iterationCount = 0
  }

  const changeCellValue = (id) => {
    !gameBoard[id].value ? gameBoard[id].value = 1 : gameBoard[id].value = 0
  }

  const loadConfigToGameBoard = (config) => {
    // if (!isPreview) {
    endGame()
    // } else {
    //   board = gameBoard
    //   previewBoard = board
    // }
    // console.log(board);
    config.config.forEach(selectedCell => {
      gameBoard.forEach(cell => {
        if (cell.id === selectedCell.id) {
          cell.position.firstChild.classList.toggle('hidden')
          cell.value = 1
        }
      })
    })
    isViewingConfigs = false
  }

  const returnToBoard = () => {
    isViewingConfigs = false
  }

  // const previewConfig = (config) => {
  //   const preview = document.getElementById('previewBoard')
  //   preview.classList.toggle('hidden')
  //   loadConfigToGameBoard(previewBoard, config, true)
  // }
</script>

<main>
  {#if isFreshlyOpened}
    <section class="overlay" id="overlay">
      <button
        class="overlay__button"
        id="overlayButton"
        on:click={beginSelectingCells}
        >Click here to begin your ZERO-PLAYER MMORPG EXPERIENCE
      </button>
    </section>
  {/if}
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
        <!-- <div class="config-preview hidden" id="previewBoard">
          <PreviewGameBoard {gameBoard} />
        </div> -->
        <button class="" on:click={returnToBoard}>Go Back</button>
      </div>
    </section>
  {/if}
  <div class="user-interaction-bar">
    <button id="gameButton" on:click={beginGame}>BEGIN GAME</button>
    <button on:click={endGame}>END GAME & CLEAR BOARD</button>
    <button on:click={viewSavedConfigs}>LOAD CONFIGURATION</button>
    <GameBoard {gameBoard} {changeCellValue} {isPaused}/>
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
</style>
