// --- START OF FILE weatherService.js ---

// ATENÇÃO: ARMAZENAR A API KEY DIRETAMENTE NO CÓDIGO FRONTEND É INSEGURO!
// Em uma aplicação real, a chave NUNCA deve ficar exposta aqui.
// A forma correta envolve um backend (Node.js, Serverless Functions, etc.)
// que atua como um proxy para a API externa, mantendo a chave segura no servidor.
// Para FINS DIDÁTICOS nesta atividade, vamos usá-la aqui temporariamente.
// --- START OF FILE weatherService.js ---

// ###################################################################################
// # ATENÇÃO: ARMAZENAR A API KEY DIRETAMENTE NO CÓDIGO FRONTEND É ALTAMENTE INSEGURO! #
// ###################################################################################
// # Em uma aplicação real e pública, a chave NUNCA deve ficar exposta aqui.         #
// # Qualquer pessoa inspecionando o código do seu site no navegador poderá vê-la.   #
// # Isso pode levar ao uso indevido da sua chave, excedendo limites de uso          #
// # ou até mesmo bloqueio da sua conta na OpenWeatherMap.                           #
// #                                                                                 #
// # A forma CORRETA e SEGURA envolve um backend (Node.js, Python/Flask, PHP, etc.)  #
// # atuando como um proxy, onde a chave fica protegida no servidor.                 #
// #                                                                                 #
// # Para FINS ESTRITAMENTE DIDÁTICOS E PROJETOS LOCAIS/PRIVADOS nesta atividade,    #
// # vamos usá-la aqui temporariamente, com pleno conhecimento dos riscos.           #
// #                                                                                 #
// # SE VOCÊ FOR COMPARTILHAR ESTE CÓDIGO PUBLICAMENTE (EX: GITHUB PÚBLICO),         #
// # CONSIDERE REMOVER A CHAVE OU USAR UM BACKEND PROXY.                             #
// ###################################################################################
const OPENWEATHER_API_KEY = "bdc014366d19ce5f5cae9ce84d251045"; // <-- SUBSTITUA PELA SUA CHAVE REAL

/**
 * Busca dados do clima para uma cidade específica usando a API OpenWeatherMap DIRETAMENTE DO FRONTEND.
 * @param {string} cidade - O nome da cidade (ex: "Campinas").
 * @returns {Promise<object|null>} Uma promessa que resolve com os dados do clima ou um objeto de erro.
 */
async function fetchWeatherData(cidade = "Campinas") {
    if (OPENWEATHER_API_KEY === "bdc0143hbvrgeklmeber" || !OPENWEATHER_API_KEY) {
        const errorMessage = "Chave da API OpenWeatherMap não configurada em weatherService.js. Por favor, adicione sua chave.";
        console.warn(errorMessage);
        // Atualiza a UI para informar o usuário sobre a chave ausente
        const weatherDiv = document.getElementById('weather-info');
        if (weatherDiv) {
            weatherDiv.innerHTML = `<span style="color: orange; font-weight: bold;">AVISO:</span> ${errorMessage}`;
        }
        return {
            cod: 401, // Simula um erro de autenticação
            message: errorMessage
        };
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=pt_br`;

    console.log(`[WeatherService] Chamando API OpenWeatherMap diretamente: ${url.replace(OPENWEATHER_API_KEY, "CHAVE_OCULTA_NO_LOG")}`); // Oculta a chave no log do console

    try {
        const response = await fetch(url);
        const data = await response.json(); // Tenta parsear o JSON mesmo se response.ok for false, para pegar a mensagem de erro da API

        if (!response.ok) {
            // A API OpenWeatherMap retorna um objeto JSON mesmo em caso de erro, com 'cod' e 'message'
            console.error(`[WeatherService] Erro da API OpenWeatherMap (${response.status} - ${data.cod || 'N/A'}):`, data.message || response.statusText);
            return { // Retorna um objeto de erro padronizado, incluindo a mensagem da API se disponível
                cod: parseInt(data.cod) || response.status, // Usa o 'cod' da API se existir, senão o status HTTP
                message: data.message || `Não foi possível obter o clima para ${cidade}. Código: ${response.status}`
            };
        }

        console.log(`[WeatherService] Dados do clima para ${cidade}:`, data);
        return data; // data já contém o 'cod: 200' em caso de sucesso

    } catch (error) {
        console.error("[WeatherService] Erro na requisição fetch para OpenWeatherMap:", error);
        return { // Retorna um objeto de erro padronizado para falha de rede/fetch
            cod: 0, // Um código para indicar erro de fetch/rede
            message: "Falha na comunicação com a API de clima. Verifique sua conexão ou a URL da API."
        };
    }
}
/**
 * Busca dados da previsão do tempo para vários dias.
 * @param {string} cidade - O nome da cidade.
 * @param {number} numDays - Número de dias para a previsão (1, 3 ou 5).
 * @returns {Promise<object|null>} Uma promessa que resolve com os dados da previsão processados ou um objeto de erro.
 */
async function fetchForecastData(cidade = "Campinas", numDays = 3) {
    if (OPENWEATHER_API_KEY === "bdc0143hbvrgeklmeber" || !OPENWEATHER_API_KEY) {
        const errorMessage = "Chave da API OpenWeatherMap não configurada ou inválida em weatherService.js. Por favor, adicione sua chave válida.";
        console.warn(errorMessage);
        // Não precisa atualizar a UI diretamente aqui, o chamador (Garagem) fará isso.
        return { cod: 401, message: errorMessage };
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cidade)}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=pt_br`;
    console.log(`[WeatherService] Chamando API OpenWeatherMap (forecast): ${url.replace(OPENWEATHER_API_KEY, "CHAVE_OCULTA_NO_LOG")}`);

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            console.error(`[WeatherService] Erro da API OpenWeatherMap Forecast (${response.status} - ${data.cod || 'N/A'}):`, data.message || response.statusText);
            return {
                cod: parseInt(data.cod) || response.status,
                message: data.message || `Não foi possível obter a previsão para ${cidade}. Código: ${response.status}`
            };
        }

        // Processar os dados para extrair uma previsão por dia, até numDays
        const dailyForecasts = [];
        const processedDates = new Set();

        for (const item of data.list) {
            const forecastDate = item.dt_txt.substring(0, 10); // Extrai YYYY-MM-DD
            // Pega o primeiro registro de cada dia novo, até o limite de numDays
            if (!processedDates.has(forecastDate) && dailyForecasts.length < numDays) {
                processedDates.add(forecastDate);
                dailyForecasts.push(item);
            }
            if (dailyForecasts.length >= numDays) {
                break; // Já temos dias suficientes
            }
        }
        
        console.log(`[WeatherService] Dados da previsão processados para ${cidade} (${numDays} dias):`, dailyForecasts);
        return {
            cod: 200, // Sucesso
            city: data.city, // Informações da cidade
            list: dailyForecasts // Lista de previsões diárias processadas
        };

    } catch (error) {
        console.error("[WeatherService] Erro na requisição fetch para OpenWeatherMap Forecast:", error);
        return {
            cod: 0,
            message: "Falha na comunicação com a API de previsão do clima."
        };
    }
}

// --- END OF FILE weatherService.js ---