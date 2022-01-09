import { c as create_ssr_component, a as add_attribute, n as noop, s as safe_not_equal, b as each, v as validate_component, d as subscribe } from "./app-06f35934.js";
import "@sveltejs/kit/ssr";
var Cell_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".square.svelte-mx6dsy,.square-active.svelte-mx6dsy{display:flex;justify-content:center;align-items:center;height:0.625rem;width:0.625rem;background-color:black;border-style:none;cursor:pointer}.square-active.svelte-mx6dsy,.hidden.svelte-mx6dsy{background-color:#F0FFFE;height:0.56rem;width:0.56rem}.hidden.svelte-mx6dsy{background-color:#26335E}",
  map: null
};
const Cell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id } = $$props;
  let { cell } = $$props;
  let { toggleActive } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.cell === void 0 && $$bindings.cell && cell !== void 0)
    $$bindings.cell(cell);
  if ($$props.toggleActive === void 0 && $$bindings.toggleActive && toggleActive !== void 0)
    $$bindings.toggleActive(toggleActive);
  $$result.css.add(css$2);
  return `<div type="${"button"}" class="${"square svelte-mx6dsy"}"${add_attribute("id", id, 0)}${add_attribute("value", cell, 0)}><div class="${"square-active hidden svelte-mx6dsy"}"${add_attribute("id", id, 0)}></div>
</div>`;
});
const subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
class SingleCell {
  constructor(id) {
    this.id = id;
    this.position = "";
    this.value = 0;
    this.surroundingCells = [];
    this.surroundingCellsValue = 0;
  }
}
let boardInitializer = Array(6500).fill(null);
const gameBoard = boardInitializer.map((cell, i) => {
  return new SingleCell(i);
});
const savedConfigs = writable([
  { id: 1, title: "Preset One", config: [gameBoard[2758], gameBoard[2857], gameBoard[2859], gameBoard[2940], gameBoard[2941], gameBoard[2957], gameBoard[2958], gameBoard[2960], gameBoard[3040], gameBoard[3042], gameBoard[3057], gameBoard[3058], gameBoard[3060], gameBoard[3061], gameBoard[3065], gameBoard[3066], gameBoard[3135], gameBoard[3136], gameBoard[3143], gameBoard[3157], gameBoard[3158], gameBoard[3160], gameBoard[3165], gameBoard[3166], gameBoard[3231], gameBoard[3232], gameBoard[3234], gameBoard[3237], gameBoard[3240], gameBoard[3243], gameBoard[3257], gameBoard[3259], gameBoard[3331], gameBoard[3332], gameBoard[3335], gameBoard[3336], gameBoard[3343], gameBoard[3358], gameBoard[3440], gameBoard[3442], gameBoard[3540], gameBoard[3541]] }
]);
var GameBoard_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".game-board.svelte-1esuf9n{width:62.5rem;margin-top:0.5rem;display:flex;flex-direction:row;margin-left:23rem;flex-wrap:wrap;border-style:solid;border-width:.625rem;position:absolute}",
  map: null
};
const GameBoard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { gameBoard: gameBoard2 } = $$props;
  let { changeCellValue } = $$props;
  let { isPaused } = $$props;
  savedConfigs.subscribe((configs) => {
  });
  const toggleActive = (e) => {
    e.classList.toggle("hidden");
    let cell = gameBoard2[e.id];
    changeCellValue(cell.id);
    if (!isPaused) {
      gameBoard2.filter((cell2) => cell2.value);
    }
  };
  if ($$props.gameBoard === void 0 && $$bindings.gameBoard && gameBoard2 !== void 0)
    $$bindings.gameBoard(gameBoard2);
  if ($$props.changeCellValue === void 0 && $$bindings.changeCellValue && changeCellValue !== void 0)
    $$bindings.changeCellValue(changeCellValue);
  if ($$props.isPaused === void 0 && $$bindings.isPaused && isPaused !== void 0)
    $$bindings.isPaused(isPaused);
  $$result.css.add(css$1);
  return `<button>SAVE STARTING CONFIGURATION (CONFIGURATION MOST RECENTLY USED)</button>
<div class="${"game-board svelte-1esuf9n"}">${each(gameBoard2, (cell, i) => `${validate_component(Cell, "Cell").$$render($$result, { toggleActive, id: i, cell }, {}, {})}`)}
</div>`;
});
var index_svelte_svelte_type_style_lang = "";
const css = {
  code: ".overlay.svelte-yr9r7o,.overlay-two.svelte-yr9r7o{display:flex;justify-content:center;align-items:center;height:100vh;width:100vw;background-color:black;opacity:0.9;position:fixed;margin:-0.5rem 0rem 0rem -0.5rem;z-index:2}.overlay__button.svelte-yr9r7o{display:flex;justify-content:center;align-items:center;height:10rem;width:15rem;z-index:3;cursor:pointer}.load-config-modal.svelte-yr9r7o{height:20rem;width:20rem;background-color:white;color:black;font-size:14px;position:absolute}",
  map: null
};
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_savedConfigs;
  $$unsubscribe_savedConfigs = subscribe(savedConfigs, (value) => value);
  let isPaused = false;
  const changeCellValue = (id) => {
    !gameBoard[id].value ? gameBoard[id].value = 1 : gameBoard[id].value = 0;
  };
  $$result.css.add(css);
  $$unsubscribe_savedConfigs();
  return `${$$result.head += `${$$result.title = `<title>Massive Open World</title>`, ""}`, ""}



<main>${`<section class="${"overlay svelte-yr9r7o"}" id="${"overlay"}"><button class="${"overlay__button svelte-yr9r7o"}" id="${"overlayButton"}">Click here to begin your ZERO-PLAYER MMORPG EXPERIENCE
      </button></section>`}
  ${``}
  <div class="${"user-interaction-bar"}"><button id="${"gameButton"}">BEGIN GAME</button>
    <button>END GAME &amp; CLEAR BOARD</button>
    <button>LOAD CONFIGURATION</button>
    ${validate_component(GameBoard, "GameBoard").$$render($$result, { gameBoard, changeCellValue, isPaused }, {}, {})}</div>
</main>`;
});
export { Routes as default };
