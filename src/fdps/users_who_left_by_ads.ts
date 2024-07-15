import { randomNormal } from "./utils";

// Definición de constantes para abandono por anuncios
const BASE_PROBABILITY = 0.01; // 1% de abandono con 1 anuncio
const MAX_PROBABILITY = 0.90; // 90% de abandono con 5 anuncios
const NOISE_STD = 0.0005; // Desviación estándar del ruido

// Función para calcular la probabilidad de abandono basado en el número de anuncios
function abandonmentProbability(numAds: number) {
    const rate = Math.log(MAX_PROBABILITY / BASE_PROBABILITY) / 4; // Tasa de crecimiento exponencial
    return Math.min(BASE_PROBABILITY * Math.exp(rate * (numAds - 1)), MAX_PROBABILITY);
}

// Función para calcular el número de usuarios que abandonan debido a los anuncios
const usersWhoLeftByAds = (usersWhoPlayed: number, adsBetweenRounds: number): number => {
    const abandonProbability = Math.min(Math.max(0, randomNormal(abandonmentProbability(adsBetweenRounds), NOISE_STD)), 1);
    const usersWhoLeft = Math.round(usersWhoPlayed * abandonProbability);
    return usersWhoLeft;
};

export default usersWhoLeftByAds;
