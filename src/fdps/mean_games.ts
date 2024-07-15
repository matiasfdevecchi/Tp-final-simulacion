import {randomNormal } from "./utils";

const BASE_PLAY_PROB = 10;
const PROB_STD_DEV = 4;

const getMeanGames = (usersWhoPlayed: number): number => {
    const playProbability = randomNormal(BASE_PLAY_PROB, PROB_STD_DEV);
    const meanGames = Math.round(usersWhoPlayed * Math.max(0, playProbability));
    return meanGames;
};

export default getMeanGames;