const fs = require('fs');

const DAYS_IN_YEAR = 365;
const PROB_NORMAL_DAY = 0.10;
const PROB_WEEKEND = 0.15;
const PROB_SUMMER_VACATION = 0.30;
const PROB_WINTER_VACATION = 0.25;
const PROB_STD_DEV = 0.02; // Desviación estándar para el ruido

// Función para generar un número aleatorio con distribución normal
function randomNormal(mean, std) {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); // Evitar 0
    while (v === 0) v = Math.random(); // Evitar 0
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) * std + mean;
}

// Función para determinar si un día es fin de semana
function isWeekend(day) {
    return day % 7 === 5 || day % 7 === 6; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
}

// Función para determinar si es verano (15 de diciembre a 28 de febrero)
function isSummerVacation(day) {
    return (348 <= day && day <= 364) || (0 <= day && day <= 58);
}

// Función para determinar si es invierno (1 de julio a 31 de julio)
function isWinterVacation(day) {
    return 181 <= day && day <= 211;
}

// Función para calcular la probabilidad de jugar
function getPlayProbability(dayOfYear) {
    let baseProbability = PROB_NORMAL_DAY;
    if (isSummerVacation(dayOfYear)) {
        baseProbability = PROB_SUMMER_VACATION;
    } else if (isWinterVacation(dayOfYear)) {
        baseProbability = PROB_WINTER_VACATION;
    } else if (isWeekend(dayOfYear)) {
        baseProbability = PROB_WEEKEND;
    }
    return Math.max(0, randomNormal(baseProbability, PROB_STD_DEV)); // Añadir ruido y evitar negativos
}

// Función para calcular la cantidad de partidas jugadas en un día específico
function getRoundsPlayed(usersWhoPlayed) {
    const MEAN_ROUNDS = 10;
    const STD_ROUNDS = 4;
    return Math.max(0, Math.round(randomNormal(MEAN_ROUNDS, STD_ROUNDS) * usersWhoPlayed));
}

const totalUsers = 25000; // Suponiendo una cantidad inicial de usuarios

let dates = [];
let startDate = new Date(2023, 0, 1);  // 1/1/2023
for (let i = 0; i < DAYS_IN_YEAR; i++) {
    let date = new Date(startDate);
    date.setDate(date.getDate() + i);
    dates.push(date.toLocaleDateString('es-AR'));
}

let playProbabilityData = [];
let roundsPlayedData = [];

for (let day = 0; day < DAYS_IN_YEAR; day++) {
    const playProbability = getPlayProbability(day);
    const usersWhoPlayed = Math.round(totalUsers * playProbability);
    const roundsPlayed = getRoundsPlayed(usersWhoPlayed);

    playProbabilityData.push({
        Fecha: dates[day],
        Porcentaje: (playProbability).toFixed(2).replace(".", ",")
    });

    roundsPlayedData.push({
        Fecha: dates[day],
        Cantidad: (roundsPlayed / usersWhoPlayed).toFixed(2).replace(".", ",") // Promedio de partidas por usuario
    });
}

function saveCSV(filename, data) {
    let csvContent = 'Fecha;Cantidad\n';
    data.forEach(row => {
        csvContent += `${row.Fecha};${row.Cantidad}\n`;
    });
    fs.writeFileSync(filename, csvContent);
    console.log(`Archivo ${filename} generado con éxito.`);
}

function saveProbabilityCSV(filename, data) {
    let csvContent = 'Fecha;Porcentaje\n';
    data.forEach(row => {
        csvContent += `${row.Fecha};${row.Porcentaje}\n`;
    });
    fs.writeFileSync(filename, csvContent);
    console.log(`Archivo ${filename} generado con éxito.`);
}

saveProbabilityCSV('probabilidad_jugar.csv', playProbabilityData);
saveCSV('partidas_promedio_por_dia_por_usuario.csv', roundsPlayedData);
