import { writable } from 'svelte/store';

const highScores = writable([
  {id: 1, player: 'TIPPY TOP BOT', score: 10},
  {id: 2, player: 'SILVER MEDAL BOT', score: 9},
  {id: 3, player: 'TOP THREE BOT', score: 8},
  {id: 4, player: 'HONORABLE MENTION BOT', score: 7},
  {id: 5, player: 'WOEBEGONE BOT', score: 6},
  {id: 6, player: 'LIT BOT', score: 5},
  {id: 7, player: 'LUCKY # BOT', score: 4},
  {id: 8, player: 'ENTIRELY UNREMARKABLE BOT', score: 3},
  {id: 9, player: 'JUST HAPPY NOT TO BE THE BOTTOM BOT', score: 2},
  {id: 10, player: 'JUST HAPPY TO BE HERE BOT', score: 1}
]);

export {
  highScores
};
