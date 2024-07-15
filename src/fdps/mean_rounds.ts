import { randomNormal } from "./utils";

const MEAN_ROUNDS = 22;
const STD_ROUNDS = 2;

const getMeanRounds = (): number => {
    return randomNormal(MEAN_ROUNDS, STD_ROUNDS);
};

export default getMeanRounds;