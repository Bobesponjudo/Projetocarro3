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
console.log('[script.js] Instância da Garagem criada:', typeof garagem); // Log para ver se funcionou

// Executa quando o HTML da página estiver completamente carregado
window.onload = () => {
    console.log('[script.js] window.onload iniciado. Verificando garagem:', typeof garagem); // Verifica de novo
    // SEU CÓDIGO ANTERIOR QUE USA 'garagem' (linha 73 e seguintes)
    if (!garagem) { // Adiciona uma verificação extra
        console.error("[script.js] ERRO FATAL DENTRO DE window.onload: 'garagem' ainda é undefined!");
        alert("Erro crítico ao inicializar a aplicação. Verifique o console.");
        return;
    }

    // Verifica se a garagem foi carregada vazia (nenhum dado no localStorage)
    if (Object.keys(garagem.veiculos).length === 0) { // A linha 73 original estava aqui
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
    garagem.verificarAgendamentosProximos();};
