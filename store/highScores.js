import { writable } from 'svelte/store';

const highScores = writable([
  {id: 1, player: 'TIPPY-TOP BoT', score: 10},
  {id: 2, player: 'SILVER-MEDAL BoT', score: 9},
  {id: 3, player: 'TOP-THREE BoT', score: 8},
  {id: 4, player: 'HONORABLE-MENTION BoT', score: 7},
  {id: 5, player: 'WOEBEGONE BoT', score: 6},
  {id: 6, player: 'LIT BoT', score: 5},
  {id: 7, player: 'LUCKY-# BoT', score: 4},
  {id: 8, player: 'ENTIRELY-UNREMARKABLE BoT', score: 3},
  {id: 9, player: 'PENULTIMATE BoT', score: 2},
  {id: 10, player: 'JUST-HAPPY-TO-BE-HERE BoT', score: 1}
]);

export {
  highScores
};
