<script>
  import Cell from './Cell.svelte';

  export let gameBoard

  let isPreview = true
</script>

<div class="preview-board">
  {#each gameBoard as cell}
    {cell}
  {/each}
</div>

<style>
  .preview-board {
    width: 62.5rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border-style: solid;
    border-width: .625rem;
    position: absolute;
    margin-top: -17rem;
    margin-left: -11.5rem;
  }
</style>
