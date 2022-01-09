<svelte:head>
  <title>Massive Open World</title>
</svelte:head>

<script>
  import GameBoard from '../GameBoard.svelte';
  import { gameBoard, savedConfigs } from '/store/savedConfigs.js'
  let gameButton
  let gameInPlay
  let updateBoard
  let checkingLoops
  let checkingInactivity
  let ranSelectors = false
  let ignoredCount = 0
  let iterationCount = 0
  let isPaused = false
  let loopingWarning = false
  let allCellsInactive = false
  let isViewingConfigs = false

  const viewSavedConfigs = () => {
    isViewingConfigs = true
  }

  const getQuerySelectors = () => {
    if (!ranSelectors) {
      gameBoard.forEach(cell => {
        cell.position = document.getElementById(`${cell.id}`)
      })

      gameButton = document.getElementById('gameButton')
      ranSelectors = true
    }
  }

  const beginGame = () => {
    const activeCell = gameBoard.find(cell => cell.value)

    if (activeCell && gameButton.textContent === 'BEGIN GAME') {
      gameButton.textContent = 'PAUSE GAME'
      gameInPlay = setInterval(cycle, 80)

    } else {
      pauseGame()
    }

    isPaused = true
  }

  const cycle = () => {
    gameBoard.forEach(cell => {
      checkActiveCellFutureStatus(gameBoard[cell.id])
    })

    checkingLoops = setTimeout(checkForLoopingCells, 25)
    checkingInactivity = setTimeout(checkCellsForInactivity, 30)
    updateBoard = setTimeout(changeStatus, 35)
  }

  const checkActiveCellFutureStatus = (cell) => {
    if (gameBoard[cell.id].value && getActiveSurroundingCellValues(gameBoard[cell.id]) < 2 || gameBoard[cell.id].value && getActiveSurroundingCellValues(gameBoard[cell.id]) > 3) {
      markForInactive(gameBoard[cell.id])
    } else if (!gameBoard[cell.id].value && getActiveSurroundingCellValues(gameBoard[cell.id]) === 3) {
      markForActive(gameBoard[cell.id])
    }
  }

  const getActiveSurroundingCellValues = (cell) => {
    let value = 0

    gameBoard[cell.id].surroundingCells.forEach(surrCell => {
      value += gameBoard[surrCell].value
    })

    return value
  }

  const markForInactive = (cell) => {
    gameBoard[cell.id].position.firstChild.classList.add('marked-for-inactive')
    gameBoard[cell.id].gotMarked = true
  }

  const markForActive = (cell) => {
    gameBoard[cell.id].position.firstChild.classList.add('marked-for-active')
    gameBoard[cell.id].gotMarked = true
  }

  const checkForLoopingCells = (cell) => {
      gameBoard.forEach(cell => {
        if (
          gameBoard[cell.id].value === 1 &&
          gameBoard[cell.top].value === 1 &&
          gameBoard[cell.bottom].value === 1 &&
          gameBoard[cell.top].gotMarked === true &&
          gameBoard[cell.bottom].gotMarked === true
        ) {
            gameBoard[cell.id].inDanger = true
            gameBoard[cell.top].inDanger = true
            gameBoard[cell.bottom].inDanger = true
            gameBoard[cell.id].gotMarked = false
            gameBoard[cell.left].gotMarked = false
            gameBoard[cell.right].gotMarked = false

        } else if (
          gameBoard[cell.id].value === 1 &&
          gameBoard[cell.left].value === 1 &&
          gameBoard[cell.right].value === 1 &&
          gameBoard[cell.left].gotMarked === true &&
          gameBoard[cell.right].gotMarked === true
        ) {
            gameBoard[cell.id].inDanger = true
            gameBoard[cell.left].inDanger = true
            gameBoard[cell.right].inDanger = true
            gameBoard[cell.id].gotMarked = false
            gameBoard[cell.top].gotMarked = false
            gameBoard[cell.bottom].gotMarked = false
        }
      })
  }

  const markCellInDanger = (cell, bool) => {
    gameBoard[cell.id].inDanger = bool
  }

  const unmarkCells = () => {
    gameBoard.forEach(cell => {
      gameBoard[cell.id].gotMarked = false
    })
  }

  const checkCellsForInactivity = () => {
    const cellsNotInDanger = gameBoard.filter(cell => !gameBoard[cell.id].inDanger)
    const unmarkedCells = gameBoard.filter(cell => {
        return !gameBoard[cell.id].gotMarked
    })

    let mathed = gameBoard.filter(cell => gameBoard[cell.id].inDanger).length / 3
    let sub = gameBoard.filter(cell => gameBoard[cell.id].gotMarked).length - mathed
    let unm = unmarkedCells.length - sub

    if (cellsNotInDanger.length === unm || unmarkedCells.length === gameBoard.length) {
      allCellsInactive = true
    }
  }

  const changeStatus = () => {
    if (!allCellsInactive) {
      gameBoard.forEach(cell => {
        const cellClass = gameBoard[cell.id].position.firstChild.classList

        if (cellClass.contains('marked-for-inactive')) {
          cellClass.add('hidden')
          cellClass.remove('marked-for-inactive')
          changeCellValue(gameBoard[cell.id].id)
          iterationCount++

        } else if (cellClass.contains('marked-for-active')) {
          cellClass.remove('hidden')
          cellClass.remove('marked-for-active')
          changeCellValue(gameBoard[cell.id].id)
          iterationCount++
        }

        gameBoard[cell.id].inDanger = false
        gameBoard[cell.id].gotMarked = false
      })

      iterationCount++
      allCellsInactive = false

    } else {
      endGame()
    }
  }

  const pauseGame = () => {
    clearTimeout(checkingLoops)
    clearTimeout(checkingInactivity)
    clearTimeout(updateBoard)
    clearInterval(gameInPlay)
    gameButton.textContent = 'BEGIN GAME'
  }

  const endGame = () => {
    gameBoard.forEach(cell => {
      const cellClass = gameBoard[cell.id].position.firstChild.classList

      cellClass.add('hidden')
      cellClass.remove('marked-for-inactive')
      cellClass.remove('marked-for-active')

      gameBoard[cell.id].value = 0
      gameBoard[cell.id].inDanger = false
      gameBoard[cell.id].gotMarked = false
    })

    pauseGame()

    if (isPaused) {
      alert(`Game Over! Final Score: ${iterationCount}`)
    }

    isPaused = false
    loopingWarning = false
    allCellsInactive = false
    iterationCount = 0
  }

  const changeCellValue = (id) => {
    gameBoard[id].value === 0 ? gameBoard[id].value = 1 : gameBoard[id].value = 0
  }

  const loadConfigToGameBoard = (config) => {
    getQuerySelectors()
    endGame()

    config.config.forEach(selectedCell => {
      gameBoard.forEach(cell => {
        if (cell.id === selectedCell.id) {
          gameBoard[cell.id].position.firstChild.classList.toggle('hidden')
          gameBoard[cell.id].value = 1
          gameBoard[cell.id].gotMarked = true
        }
      })
    })

    isViewingConfigs = false
  }

  const returnToBoard = () => {
    isViewingConfigs = false
  }
</script>

<!-- {#if isFreshlyOpened}
  <section class="overlay" id="overlay">
    <button
    class="overlay__button"
    id="overlayButton"
    on:click={beginSelectingCells}
    >Click here to begin your ZERO-PLAYER MMORPG EXPERIENCE
  </button>
</section>
{/if} -->
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
