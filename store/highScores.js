import { writable } from 'svelte/store';

const highScores = writable([
  {id: 1, player: 'TIPPY-TOP BoT', score: 100},
  {id: 2, player: 'SILVER-MEDAL BoT', score: 99},
  {id: 3, player: 'TOP-THREE BoT', score: 98},
  {id: 4, player: 'HONORABLE-MENTION BoT', score: 97},
  {id: 5, player: 'WOEBEGONE BoT', score: 96},
  {id: 6, player: 'LIT BoT', score: 95},
  {id: 7, player: 'LUCKY-# BoT', score: 94},
  {id: 8, player: 'ENTIRELY-UNREMARKABLE BoT', score: 93},
  {id: 9, player: 'PENULTIMATE BoT', score: 92},
  {id: 10, player: 'JUST-HAPPY-TO-BE-HERE BoT', score: 91}
]);

export {
  highScores
};
