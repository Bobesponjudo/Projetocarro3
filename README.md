🚗 Garagem Inteligente Virtual ✨

Uma aplicação web para simular a gestão de veículos em uma garagem virtual. Crie, personalize, controle e agende manutenções para diferentes tipos de veículos, cada um com suas características únicas!

📝 Tabela de Conteúdos

*  Sobre o Projeto
*  Tipos de Veículos e Funcionalidades
*  Tecnologias Utilizadas
*  Autor

📖 Sobre o Projeto

A Garagem Inteligente Virtual é um projeto desenvolvido para simular a experiência de gerenciar uma frota de veículos diversificada. Através de uma interface web interativa, os usuários podem:

*   Adicionar novos veículos à garagem.
*   Visualizar os veículos existentes.
*   Controlar funções básicas como ligar/desligar o motor.
*   Abastecer o tanque de combustível.
*   Personalizar a cor do veículo.
*   Agendar e visualizar manutenções futuras.
*   Interagir com funcionalidades específicas de cada tipo de veículo.

*   A garagem suporta diferentes tipos de veículos, cada um com ações comuns e especiais:

**Ações Comuns (Todos os Veículos):**

*   ✅ **Criar:** Adicionar um novo veículo à garagem.
*   🔑 **Ligar/Desligar:** Simular a ignição do motor.
*   ⛽ **Abastecer:** Encher o tanque de combustível virtual.
*   🎨 **Pintar:** Mudar a cor do veículo.
*   🔧 **Agendar Manutenção:** Marcar uma data e descrição para a próxima manutenção. As informações da manutenção agendada são exibidas no painel do veículo.

**Tipos de Veículos e Ações Especiais:**

1.  **Carro Normal 🚙:**
    *   Possui todas as ações comuns.

2.  **Caminhão 🚚:**
    *   Possui todas as ações comuns.
    *   ➕ **Carregar/Descarregar Carga:** Permite adicionar ou remover um peso de carga virtual ao caminhão.

3.  **Carro Esportivo 🏎️:**
    *   Possui todas as ações comuns.
    *   ➕ **Ativar/Desativar Turbo:** Quando o turbo está ativo, a aceleração (ou velocidade simulada) é significativamente maior.

4.  **Motocicleta 🏍️:**
    *   Possui todas as ações comuns.

  ## Recurso: Detalhes Extras do Veículo (API Simulada)

Para enriquecer a experiência da Garagem Interativa e demonstrar como uma aplicação front-end pode interagir com fontes de dados externas, foi implementada uma **API simulada** para buscar detalhes adicionais sobre cada veículo.

### O que faz?

*   Quando o usuário clica no botão "Ver Detalhes (API Sim.)" em um veículo específico, a aplicação simula uma chamada a um serviço externo.
*   Essa "API" retorna informações extras sobre o veículo selecionado, como:
    *   Ano de fabricação
    *   Tipo do motor
    *   Tipo de transmissão
    *   País de origem
    *   Data da última revisão (simulada)
    *   Detalhes específicos (ex: número de eixos para caminhões, ABS para motos)

### Como Funciona (Simulação)

*   **Não há um servidor real:** A "API" é implementada diretamente no front-end (no arquivo `simulatedApi.js` ou similar) usando uma função JavaScript (`fetchExtraVehicleDetails`).
*   **Assincronia:** A função retorna uma `Promise`, simulando a natureza assíncrona de uma chamada de rede real.
*   **Latência:** Um `setTimeout` introduz um atraso aleatório (geralmente entre 0.8 e 1.8 segundos) para simular o tempo de resposta da rede.
*   **Erros Simulados:** Há uma chance (controlada por `Math.random()`) de a Promise ser rejeitada com um erro, simulando falhas de comunicação ou erros no servidor.
*   **Dados Fictícios:** Os detalhes retornados são dados fictícios e pré-definidos dentro da função `fetchExtraVehicleDetails`, geralmente baseados no identificador interno do veículo (`'meuCarro'`, `'moto'`, etc.).

### Como Usar na Interface

1.  Carregue a aplicação (`index.html`).
2.  Localize a seção do veículo desejado (Carro, Moto, etc.).
3.  Clique no botão **"Ver Detalhes (API Sim.)"**.
4.  Observe a mensagem "⏳ Carregando detalhes extras..." que aparece abaixo dos botões.
5.  Aguarde o tempo de simulação.
6.  Os detalhes adicionais (ou uma mensagem de erro simulada) serão exibidos na área de "Detalhes Extras". O botão será reabilitado.

### Implementação Técnica

*   **`index.html`**: Contém o botão (`id="detalhes-NOMEINTERNO-btn"`) e a `div` (`id="extra-details-NOMEINTERNO"`) para cada veículo, responsáveis por disparar a ação e exibir o resultado.
*   **`simulatedApi.js`**: Define a função `fetchExtraVehicleDetails(nomeVeiculo)` que retorna a `Promise` com os dados simulados ou um erro.
*   **`garagem.js`**:
    *   A classe `Garagem` possui o método `async buscarDetalhesExtras(nomeVeiculo)`.
    *   Este método é chamado pelo `onclick` do botão.
    *   Ele localiza os elementos HTML (botão e div).
    *   Atualiza a UI para indicar o carregamento.
    *   Chama `await fetchExtraVehicleDetails(nomeVeiculo)` para obter os dados.
    *   Usa um bloco `try...catch...finally` para processar a resposta (sucesso ou erro) e atualizar a `div` com os resultados formatados.
    *   Reabilita o botão no bloco `finally`.

Este recurso serve como um excelente exemplo de como preparar a aplicação para consumir APIs reais no futuro, tratando estados de carregamento, sucesso e erro de forma assíncrona.
## Últimas Atualizações (Feitas Hoje - DD/MM/AAAA)

*   **Integração com API de Clima (OpenWeatherMap):**
    *   Adicionado um novo arquivo `weatherService.js` para encapsular a lógica de chamada à API OpenWeatherMap.
    *   Implementada a funcionalidade para buscar dados do clima (temperatura, descrição, ícone, umidade, vento).
    *   **Permitido ao usuário escolher a cidade:**
        *   Adicionado um campo de input e um botão na interface (`index.html`) para que o usuário possa digitar o nome da cidade desejada.
        *   A lógica em `script.js` foi atualizada para capturar a cidade informada e solicitar os dados do clima correspondentes através do `weatherService.js` e da classe `Garagem`.
    *   Exibição dinâmica das informações do clima na interface.
    *   **Aviso de Segurança sobre a Chave API:** Incluído um aviso proeminente no `weatherService.js` sobre os riscos de expor a chave API diretamente no código frontend e a recomendação de usar um backend proxy para aplicações em produção.
*   **Refinamentos na UI de Clima:**
    *   Exibição de mensagem de "Carregando..." durante a busca do clima.
    *   Tratamento de erros na busca e exibição de mensagens apropriadas para o usuário (ex: chave não configurada, cidade não encontrada, falha de rede).
*   **Organização do Código:**
    *   Funções relacionadas à API de clima foram centralizadas em `weatherService.js`.
    *   A classe `Garagem` agora coordena a chamada para buscar e exibir o clima.
    *   O arquivo `script.js` lida com a interação do usuário para a seleção da cidade.

## Como Rodar o Projeto

1.  Clone este repositório: `git clone [URL_DO_SEU_REPOSITORIO]`
2.  Navegue até a pasta do projeto: `cd [NOME_DA_PASTA_DO_PROJETO]`
3.  **Obtenha uma chave da API OpenWeatherMap:**
    *   Visite [openweathermap.org/appid](https://openweathermap.org/appid) e crie uma conta/faça login para obter sua chave API gratuita.
4.  **Configure a Chave API (MUITO IMPORTANTE):**
    *   Abra o arquivo `weatherService.js`.
    *   Localize a linha: `const OPENWEATHER_API_KEY = "SUA_CHAVE_OPENWEATHERMAP_AQUI";`
    *   Substitua `"SUA_CHAVE_OPENWEATHERMAP_AQUI"` pela sua chave API real.
    *   **Leia atentamente o aviso de segurança sobre a chave API no topo do arquivo `weatherService.js`.**
5.  Abra o arquivo `index.html` em seu navegador de preferência.
    *   (Opcional) Se você tiver a extensão "Live Server" no VS Code, pode usá-la para servir o projeto.

*(Restante do seu README, como Tecnologias Usadas, Estrutura do Projeto, Próximos Passos, etc.)*

---

🚀 Tecnologias Utilizadas

*   HTML5
*   CSS3
*   JavaScript (ES6+)
    *   Programação Orientada a Objetos (Classes, Herança)
    *   Manipulação do DOM
    *   LocalStorage API
    *   Fetch API (para OpenWeatherMap e simulação de API interna)
    *   Funções Assíncronas (async/await)
*   OpenWeatherMap API (para dados do clima)
*   **Frontend:** HTML, CSS, JavaScript puro.
*   **Ajuda:** Google AI Studio.

  ✍️ Autor

Feito com ❤️ por Luana Sathler Melo.

GitHub:github.com/https://github.com/Bobesponjudo

E-mail: sathleeluana@gmail.com
