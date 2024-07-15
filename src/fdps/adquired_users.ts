import { isSummerVacation, isWinterVacation, isWeekend, randomNormal } from "./utils";

const MEAN_AU = 200;
const STD_AU = 40;
const SUMMER_VACATION_INCREMENT = 0.50;
const WINTER_VACATION_INCREMENT = 0.30;
const WEEKEND_INCREMENT = 0.20;

// Función para obtener la cantidad de usuarios adquiridos en un día específico del año
const getAdquiredUsers = (dayOfYear: number): number => {
    let increment = 1.0;
    if (isSummerVacation(dayOfYear)) {  // Vacaciones de verano
        increment += SUMMER_VACATION_INCREMENT;
    } else if (isWinterVacation(dayOfYear)) {  // Vacaciones de invierno
        increment += WINTER_VACATION_INCREMENT;
    }
    if (isWeekend(dayOfYear)) {  // Fin de semana
        increment += WEEKEND_INCREMENT;
    }
    const adquiredUsers = randomNormal(MEAN_AU, STD_AU) * increment;
    return Math.round(adquiredUsers);
};

export default getAdquiredUsers;
