function randomNormal(mean: number, std: number): number {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); // Evitar 0
    while (v === 0) v = Math.random(); // Evitar 0
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) * std + mean;
}

// Función para determinar si un día es fin de semana
function isWeekend(day: number): boolean {
    return day % 7 === 5 || day % 7 === 6; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
}

// Función para determinar si es verano (15 de diciembre a 28 de febrero)
function isSummerVacation(day: number): boolean {
    return (348 <= day && day <= 364) || (0 <= day && day <= 58);
}

// Función para determinar si es invierno (1 de julio a 31 de julio)
function isWinterVacation(day: number): boolean {
    return 181 <= day && day <= 211;
}

export { randomNormal, isWeekend, isSummerVacation, isWinterVacation };