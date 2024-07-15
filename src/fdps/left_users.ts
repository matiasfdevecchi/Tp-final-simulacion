import { randomNormal } from "./utils";

const MEAN_ABANDON = 0.001; // 0.1% de abandono por día
const STD_ABANDON = 0.0002; // 0.02% de desviación estándar

const getLeftUsers = (currentUsers: number): number => {
    const abandonRate = Math.max(0, randomNormal(MEAN_ABANDON, STD_ABANDON)); // Evitar valores negativos
    const leftUsers = Math.round(currentUsers * abandonRate);
    return leftUsers;
};

export default getLeftUsers;
