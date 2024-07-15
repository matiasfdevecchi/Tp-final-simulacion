import { isSummerVacation, isWeekend, isWinterVacation, randomNormal } from "./utils";

const BASE_PLAY_PROB = 0.10;
const SUMMER_VACATION_INCREMENT = 3.0; // Incremento para vacaciones de verano (base * 3)
const WINTER_VACATION_INCREMENT = 2.5; // Incremento para vacaciones de invierno (base * 1.5)
const WEEKEND_INCREMENT = 1.5; // Incremento para fines de semana (base * 1.5)
const PROB_STD_DEV = 0.01; // Desviación estándar para el ruido

const getUsersWhoPlayed = (dayOfYear: number, users: number): number => {
    let increment = 1.0;
    if (isSummerVacation(dayOfYear)) {  // Vacaciones de verano
        increment *= SUMMER_VACATION_INCREMENT;
    } else if (isWinterVacation(dayOfYear)) {  // Vacaciones de invierno
        increment *= WINTER_VACATION_INCREMENT;
    }
    if (isWeekend(dayOfYear)) {  // Fin de semana
        increment *= WEEKEND_INCREMENT;
    }
    const playProbability = randomNormal(BASE_PLAY_PROB, PROB_STD_DEV) * increment;
    const usersWhoPlayed = Math.round(users * Math.max(0, playProbability)); // Añadir ruido y evitar negativos
    return usersWhoPlayed;
};

export default getUsersWhoPlayed;
