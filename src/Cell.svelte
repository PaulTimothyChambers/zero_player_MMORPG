<script>
  export let id;
  export let toggleActive;
</script>

<div
  type="button"
  class="square"
  id={id}
  on:click={() => toggleActive(id)}
  ><p
    type="button"
    class="square-active hidden"
    id={id}
    >
  </p>
</div>

<style>
  .square {
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
    margin: 0rem 0rem 0rem 0rem;
    background-color: #F0FFFE;
    height: 0.52rem;
    width: 0.52rem;
  }

  .hidden {
    background-color: #26335E;
  }
</style>
