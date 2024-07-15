const fs = require('fs');

// Definición de constantes
const DAYS_IN_YEAR = 365;
const BASE_PROBABILITY = 0.01; // 1% de abandono con 1 anuncio
const MAX_PROBABILITY = 0.90; // 90% de abandono con 5 anuncios
const NOISE_STD = 0.0005; // Desviación estándar del ruido

// Función para generar un número aleatorio con distribución normal
function randomNormal(mean, std) {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); // Evitar 0
    while (v === 0) v = Math.random(); // Evitar 0
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) * std + mean;
}

// Función para calcular la probabilidad de abandono basado en el número de anuncios
function abandonmentProbability(numAds) {
    const rate = Math.log(MAX_PROBABILITY / BASE_PROBABILITY) / 4; // Tasa de crecimiento exponencial
    return Math.min(BASE_PROBABILITY * Math.exp(rate * (numAds - 1)), MAX_PROBABILITY);
}

// Creación de un array con fechas correctas
let dates = [];
let startDate = new Date(2023, 0, 1);  // 1/1/2023
for (let i = 0; i < DAYS_IN_YEAR; i++) {
    let date = new Date(startDate);
    date.setDate(date.getDate() + i);
    dates.push(date.toLocaleDateString('es-AR'));
}

// Generación de probabilidades de abandono por anuncios para cada día
let probabilities = [];
for (let day = 0; day < DAYS_IN_YEAR; day++) {
    probabilities.push({
        Fecha: dates[day],
        '1 anuncio': Math.min(Math.max(0, randomNormal(abandonmentProbability(1), NOISE_STD)), 1).toFixed(4).replace(".", ","),
        '2 anuncios': Math.min(Math.max(0, randomNormal(abandonmentProbability(2), NOISE_STD)), 1).toFixed(4).replace(".", ","),
        '3 anuncios': Math.min(Math.max(0, randomNormal(abandonmentProbability(3), NOISE_STD)), 1).toFixed(4).replace(".", ","),
        '4 anuncios': Math.min(Math.max(0, randomNormal(abandonmentProbability(4), NOISE_STD)), 1).toFixed(4).replace(".", ","),
        '5 anuncios': Math.min(Math.max(0, randomNormal(abandonmentProbability(5), NOISE_STD)), 1).toFixed(4).replace(".", ","),
    });
}

// Guardar los resultados en un archivo CSV
let csvContent = 'Fecha;1 anuncio;2 anuncios;3 anuncios;4 anuncios;5 anuncios\n';
probabilities.forEach(row => {
    csvContent += `${row.Fecha};${row['1 anuncio']};${row['2 anuncios']};${row['3 anuncios']};${row['4 anuncios']};${row['5 anuncios']}\n`;
});

fs.writeFileSync('probabilidad_abandono_anuncios.csv', csvContent);
console.log('Archivo CSV generado con éxito.');
