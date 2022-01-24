import { writable } from 'svelte/store';
import { gameBoard } from './gameBoard.js';

const savedConfigs = writable([
  {
    id: 0,
    title: 'Preset One',
    isBeingRenamed: false,
    config: [gameBoard[2758], gameBoard[2857], gameBoard[2859], gameBoard[2940], gameBoard[2941], gameBoard[2957], gameBoard[2958], gameBoard[2960], gameBoard[3040], gameBoard[3042], gameBoard[3057], gameBoard[3058], gameBoard[3060], gameBoard[3061], gameBoard[3065], gameBoard[3066], gameBoard[3135], gameBoard[3136], gameBoard[3143], gameBoard[3157], gameBoard[3158], gameBoard[3160], gameBoard[3165], gameBoard[3166], gameBoard[3231], gameBoard[3232], gameBoard[3234], gameBoard[3237], gameBoard[3240], gameBoard[3243], gameBoard[3257], gameBoard[3259], gameBoard[3331], gameBoard[3332], gameBoard[3335], gameBoard[3336], gameBoard[3343], gameBoard[3358], gameBoard[3440], gameBoard[3442], gameBoard[3540], gameBoard[3541]]
  },
  {
    id: 1,
    title: 'Preset Two',
    isBeingRenamed: false,
    config: [gameBoard[2244], gameBoard[2343], gameBoard[2345], gameBoard[2443], gameBoard[2444], gameBoard[2445], gameBoard[2544], gameBoard[2459], gameBoard[2558], gameBoard[2560], gameBoard[2658], gameBoard[2659], gameBoard[2660], gameBoard[2759]]
  }
]);

export {
  savedConfigs
};
