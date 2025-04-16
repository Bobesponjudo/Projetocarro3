// script.js (v7 - Organizado e Comentado)

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
const garagem = new Garagem();

// Executa quando o HTML da página estiver completamente carregado
window.onload = () => {
    // Verifica se a garagem foi carregada vazia (nenhum dado no localStorage)
    if (Object.keys(garagem.veiculos).length === 0) {
        console.log("Garagem vazia. Criando veículos padrão...");
        // Cria os veículos padrão (os métodos _criarOuAtualizarVeiculo já salvam e atualizam UI parcial)
        garagem.criarCarro();
        garagem.criarMoto();
        garagem.criarCarroEsportivo();
        garagem.criarCaminhao();
        // Após criar, atualiza a lista de agendamentos (que estará vazia) e mostra infos do 1º carro
        garagem.atualizarListaAgendamentos();
        garagem.exibirInformacoes('meuCarro');
    } else {
        // Se a garagem foi carregada com dados, atualiza toda a UI para refletir o estado carregado
        console.log("Veículos carregados do localStorage. Atualizando UI completa.");
        garagem.atualizarUICompleta();
    }

    // Após carregar ou criar os veículos, verifica se há lembretes próximos
    garagem.verificarAgendamentosProximos();
};