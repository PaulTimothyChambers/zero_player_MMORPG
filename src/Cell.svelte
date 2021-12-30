<script>
  export let id
  export let cell
  export let toggleActive
  // export let isPreview
</script>

<div
  type="button"
  class="square"
  id={id}
  value={cell}
  on:click={(e) => toggleActive(e.target.firstChild)}
  ><div
    class="square-active hidden"
    id={id}
    on:click={(e) => toggleActive(e.target)}
    >
  </div>
</div>

<style>
  .square,
  .square-active {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 0.625rem;
    width: 0.625rem;
    background-color: black;
    border-style: none;
    cursor: pointer;
  }

  .square-active,
  .hidden {
    background-color: #F0FFFE;
    height: 0.56rem;
    width: 0.56rem;
  }

  .hidden {
    background-color: #26335E;
  }
</style>
