// script.js (v7 - Organizanomeo e Comentado)

// =============================================================================
// === CLASSE Manutencao =======================================================
// =============================================================================


/**
 * Representa um registro de manutenção (passado ou agendado) para um veículo.
 */


// =============================================================================
// === CLASSE BASE Veiculo =====================================================
// =============================================================================

/**
 * Classe base para todos os veículos da garagem.
 */



// =============================================================================
// === CLASSE Carro (Herda de Veiculo) =========================================
// =============================================================================





// =============================================================================
// === CLASSE CarroEsportivo (Herda de Carro) ==================================
// =============================================================================




// =============================================================================
// === CLASSE Caminhao (Herda de Carro) ========================================
// =============================================================================





// =============================================================================
// === CLASSE Moto (Herda de Carro) ============================================
// =============================================================================



// =============================================================================
// === CLASSE Garagem (Gerenciador Principal) ==================================
// =============================================================================

/**
 * Gerencia a coleção de veículos, a persistência e a interação com a UI.
 */




// =============================================================================
// === INICIALIZAÇÃO ===========================================================
// =============================================================================

// Cria a instância da Garagem (o construtor já chama carregarGaragem)


// Executa quando o HTML da página estiver completamente carregado
const garagem = new Garagem();
console.log('[script.js] Instância da Garagem criada:', typeof garagem);

window.onload = () => {
    console.log('[script.js] window.onload iniciado. Verificando garagem:', typeof garagem);
    if (!garagem) {
        console.error("[script.js] ERRO FATAL DENTRO DE window.onload: 'garagem' ainda é undefined!");
        alert("Erro crítico ao inicializar a aplicação. Verifique o console.");
        return;
    }

    // --- INÍCIO: Lógica para o seletor de cidade do clima ---
    const cityInput = document.getElementById('cityInput');
    const searchWeatherBtn = document.getElementById('searchWeatherBtn');
    const weatherInfoDiv = document.getElementById('weather-info'); // Para exibir "carregando"

    if (searchWeatherBtn && cityInput && weatherInfoDiv) {
        searchWeatherBtn.addEventListener('click', () => {
            const cidade = cityInput.value.trim();
            if (cidade) {
                weatherInfoDiv.innerHTML = `⏳ Carregando clima para ${cidade}...`; // Feedback visual
                garagem.carregarEExibirClima(cidade);
                // cityInput.value = ''; // Opcional: limpar o input após a busca
            } else {
                alert("Por favor, digite o nome de uma cidade.");
            }
        });

        // Opcional: permitir busca ao pressionar Enter no input
        cityInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                searchWeatherBtn.click(); // Simula o clique no botão
            }
        });

    } else {
        console.warn("Elementos para busca de clima (cityInput ou searchWeatherBtn) não encontrados.");
    }
    // --- FIM: Lógica para o seletor de cidade do clima ---


    // Verifica se a garagem foi carregada vazia (nenhum dado no localStorage)
    if (Object.keys(garagem.veiculos).length === 0) {
        console.log("Garagem vazia. Criando veículos padrão...");
        garagem.criarCarro();
        garagem.criarMoto();
        garagem.criarCarroEsportivo();
        garagem.criarCaminhao();
        garagem.atualizarListaAgendamentos();
        garagem.exibirInformacoes('meuCarro');
    } else {
        console.log("Veículos carregados do localStorage. Atualizando UI completa.");
        garagem.atualizarUICompleta();
    }
    garagem.verificarAgendamentosProximos();
};