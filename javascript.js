
  
  // Classe CarroEsportivo
  class CarroEsportivo extends Veiculo {
    constructor(modelo, cor) {
      super(modelo, cor);
      this.turboAtivado = false;
    }
  
    ativarTurbo() {
      this.turboAtivado = true;
      console.log("Turbo ativado!");
    }
  
    desativarTurbo() {
      this.turboAtivado = false;
      console.log("Turbo desativado.");
    }
  
    acelerar(incremento) {
      if (this.ligado) {
        const incrementoTurbo = this.turboAtivado ? incremento * 2 : incremento;
        this.velocidade += incrementoTurbo;
        console.log(`${this.modelo} acelerando com turbo para ${this.velocidade} km/h.`);
      } else {
        console.log(`${this.modelo} não pode acelerar. Ligue-o primeiro.`);
      }
    }
  
    exibirInformacoes() {
      return `${super.exibirInformacoes()}, Turbo: ${this.turboAtivado ? "Ativado" : "Desativado"}`;
    }
  }
  
  // Classe Caminhao
  class Caminhao extends Veiculo {
    constructor(modelo, cor, capacidadeCarga) {
      super(modelo, cor);
      this.capacidadeCarga = capacidadeCarga;
      this.cargaAtual = 0;
    }
  
    carregar(quantidade) {
      if (this.cargaAtual + quantidade <= this.capacidadeCarga) {
        this.cargaAtual += quantidade;
        console.log(`Caminhão carregado com ${quantidade} kg. Carga atual: ${this.cargaAtual} kg.`);
      } else {
        console.log("Carga excede a capacidade do caminhão.");
      }
    }
  
    descarregar(quantidade) {
      this.cargaAtual = Math.max(0, this.cargaAtual - quantidade);
      console.log(`Caminhão descarregado com ${quantidade} kg. Carga atual: ${this.cargaAtual} kg.`);
    }
  
    exibirInformacoes() {
      return `${super.exibirInformacoes()}, Capacidade de Carga: ${this.capacidadeCarga} kg, Carga Atual: ${this.cargaAtual} kg`;
    }
  }
  
  // Instâncias dos veículos
  const meuCarro = new Veiculo("Scania", "Branco");
  const meuCarroEsportivo = new CarroEsportivo("Dodge", "Preto");
  const meuCaminhao = new Caminhao("Caminhão de Carga", "Branco", 10000);
  
  let veiculoSelecionado = meuCarro; // Inicializa com um veículo padrão
  
  // Função para selecionar o veículo
  function selecionarVeiculo(nomeVeiculo) {
    switch (nomeVeiculo) {
      case "meuCarro":
        veiculoSelecionado = meuCarro;
        break;
      case "meuCarroEsportivo":
        veiculoSelecionado = meuCarroEsportivo;
        break;
      case "meuCaminhao":
        veiculoSelecionado = meuCaminhao;
        break;
      default:
        console.log("Veículo não encontrado.");
        return;
    }
    exibirInformacoesVeiculo(); // Chamada para exibir as informações
  }
  
  
  // Função para exibir informações do veículo no HTML
  function exibirInformacoesVeiculo() {
    const informacoesDiv = document.getElementById("informacoesVeiculo");
    informacoesDiv.textContent = veiculoSelecionado.exibirInformacoes();
  }
  
  // Função interagir (Garagem Inteligente)
  function interagir(veiculo, acao) {
    switch (acao) {
      case "ligar":
        veiculo.ligar();
        break;
      case "desligar":
        veiculo.desligar();
        break;
      case "acelerar":
        veiculo.acelerar(10);
        break;
      case "frear":
        veiculo.frear(5);
        break;
      case "buzinar":
        veiculo.buzinar();
        break;
      case "ativarTurbo":
        if (veiculo instanceof CarroEsportivo) {
          veiculo.ativarTurbo();
        } else {
          console.log("Ação não aplicável a este veículo.");
        }
        break;
      case "desativarTurbo":
        if (veiculo instanceof CarroEsportivo) {
          veiculo.desativarTurbo();
        } else {
          console.log("Ação não aplicável a este veículo.");
        }
        break;
      case "carregar":
        if (veiculo instanceof Caminhao) {
          veiculo.carregar(1000);
        } else {
          console.log("Ação não aplicável a este veículo.");
        }
        break;
      case "descarregar":
        if (veiculo instanceof Caminhao) {
          veiculo.descarregar(500);
        } else {
          console.log("Ação não aplicável a este veículo.");
        }
        break;
      default:
        console.log("Ação inválida.");
    }
    exibirInformacoesVeiculo(); // Chamada para atualizar a exibição
  }


  let ligado = false;
        let velocidade = 0;
        const velocidadeMaximaCarro = 100;
        const velocidadeMaximaEsportivo = 150; // Velocidade maior para o esportivo
        const velocidadeMaximaCaminhao = 80;
        let velocidadeMaxima = velocidadeMaximaCarro; // Inicializa com a velocidade do carro comum
        const aceleracaoBase = 10;
        const frenagemBase = 15;
        let tipoVeiculo = "carro"; // Inicializa com "carro"
        let cargaAtual = 0;
        const cargaMaxima = 100;

        // Elementos HTML
        const statusTexto = document.getElementById("status-texto");
        const ligarDesligarBotao = document.getElementById("ligar-desligar");
        const acelerarBotao = document.getElementById("acelerar");
        const frearBotao = document.getElementById("frear");
        const buzinarBotao = document.getElementById("buzinar");
        const turboBotao = document.getElementById("turbo");
        const carregarBotao = document.getElementById("carregar");
        const descarregarBotao = document.getElementById("descarregar");
        const velocidadeBarra = document.getElementById("velocidade-barra");
        const velocidadeAtualElement = document.getElementById("velocidade-atual");
        const tipoVeiculoSelect = document.getElementById("tipo-veiculo");
        const cargaContainer = document.getElementById("carga-container");
        const cargaBarra = document.getElementById("carga-barra");
        const cargaAtualTexto = document.getElementById("carga-atual-texto");
        const cargaMaximaTexto = document.getElementById("carga-maxima");


        // Áudios
        const somLigar = new Audio("som_ligar.mp3");
        const somDesligar = new Audio("som_desligar.mp3");
        const somAcelerar = new Audio("som_acelerar.mp3");
        const somFrear = new Audio("som_frear.mp3");
        const somBuzina = new Audio("som_buzina.mp3");
        const somTurbo = new Audio("som_turbo.mp3"); // Adicione o som do turbo
        const somCarregar = new Audio("som_carregar.mp3"); // Adicione o som de carregar
        const somDescarregar = new Audio("som_descarregar.mp3"); // Adicione o som de descarregar


        // Funções

        function atualizarStatus() {
            if (ligado) {
                statusTexto.textContent = "Ligado";
                statusTexto.classList.remove("desligado");
                statusTexto.classList.add("ligado");
                ligarDesligarBotao.textContent = "Desligar";
            } else {
                statusTexto.textContent = "Desligado";
                statusTexto.classList.remove("ligado");
                statusTexto.classList.add("desligado");
                ligarDesligarBotao.textContent = "Ligar";
            }
        }

        function atualizarVelocidade() {
            velocidadeBarra.style.width = `${(velocidade / velocidadeMaxima) * 100}%`;
            velocidadeAtualElement.textContent = velocidade;
        }

        function ligarDesligar() {
            if (ligado) {
                ligado = false;
                somDesligar.play();
            } else {
                ligado = true;
                somLigar.play();
            }
            atualizarStatus();
        }

        function acelerar() {
            if (!ligado) {
                alert("Não é possível acelerar um veículo desligado.");
                return;
            }

            if (velocidade >= velocidadeMaxima) {
                alert("O veículo já está na velocidade máxima.");
                return;
            }

            somAcelerar.play();
            velocidade = Math.min(velocidade + aceleracaoBase, velocidadeMaxima);
            atualizarVelocidade();
        }

        function frear() {
            if (!ligado && velocidade === 0) {
                alert("O veículo já está parado.");
                return;
            }

            somFrear.play();
            velocidade = Math.max(velocidade - frenagemBase, 0);
            atualizarVelocidade();
        }

        function buzinar() {
            somBuzina.play();
        }

        function ativarTurbo() {
            if (tipoVeiculo !== "esportivo") {
                alert("Não é possível ativar o turbo neste veículo.");
                return;
            }
            if (!ligado) {
                alert("Ligue o veículo primeiro!");
                return
            }

            if (velocidade + 30 > velocidadeMaxima) {
                 alert("A velocidade ultrapassaria o limite máximo!");
                 return
            }

            somTurbo.play();
            velocidade = Math.min(velocidade + 30, velocidadeMaxima); // Aumento maior para o turbo
            atualizarVelocidade();
        }

        function carregarCaminhao() {
            if (tipoVeiculo !== "caminhao") {
                alert("Não é possível carregar um veículo que não seja um caminhão.");
                return;
            }

            if (cargaAtual >= cargaMaxima) {
                alert("O caminhão já está com a carga máxima.");
                return;
            }

            somCarregar.play();
            cargaAtual = Math.min(cargaAtual + 20, cargaMaxima);
            atualizarCarga();
        }

        function descarregarCaminhao() {
            if (tipoVeiculo !== "caminhao") {
                alert("Não é possível descarregar um veículo que não seja um caminhão.");
                return;
            }

            if (cargaAtual <= 0) {
                alert("O caminhão já está sem carga.");
                return;
            }

            somDescarregar.play();
            cargaAtual = Math.max(cargaAtual - 20, 0);
            atualizarCarga();
        }



        function atualizarCarga() {
            cargaBarra.style.width = `${(cargaAtual / cargaMaxima) * 100}%`;
            document.getElementById("carga-atual").textContent = cargaAtual;
        }

        function atualizarInterface() {
            // Esconde os botões Turbo e Carregar por padrão
            turboBotao.style.display = "none";
            carregarBotao.style.display = "none";
            descarregarBotao.style.display = "none";
            cargaContainer.style.display = "none";
            cargaAtualTexto.style.display = "none";


            if (tipoVeiculo === "esportivo") {
                velocidadeMaxima = velocidadeMaximaEsportivo;
                turboBotao.style.display = "inline-block";
                cargaContainer.style.display = "none";
                cargaAtualTexto.style.display = "none";


            } else if (tipoVeiculo === "caminhao") {
                velocidadeMaxima = velocidadeMaximaCaminhao;
                carregarBotao.style.display = "inline-block";
                descarregarBotao.style.display = "inline-block";
                cargaContainer.style.display = "block";
                cargaAtualTexto.style.display = "block";
                cargaMaximaTexto.textContent = cargaMaxima;
                atualizarCarga();

            } else { // Carro comum
                velocidadeMaxima = velocidadeMaximaCarro;
                cargaContainer.style.display = "none";
                cargaAtualTexto.style.display = "none";
            }

            atualizarVelocidade(); // Garante que a barra de velocidade se ajuste à nova velocidade máxima.
        }


        // Event Listeners

        ligarDesligarBotao.addEventListener("click", ligarDesligar);
        acelerarBotao.addEventListener("click", acelerar);
        frearBotao.addEventListener("click", frear);
        buzinarBotao.addEventListener("click", buzinar);
        turboBotao.addEventListener("click", ativarTurbo);
        carregarBotao.addEventListener("click", carregarCaminhao);
        descarregarBotao.addEventListener("click", descarregarCaminhao);


        tipoVeiculoSelect.addEventListener("change", function() {
            tipoVeiculo = tipoVeiculoSelect.value;
            velocidade = 0; // Reseta a velocidade ao mudar o tipo
            atualizarInterface();
        });


        // Inicialização
        atualizarStatus();
        atualizarVelocidade();
        atualizarInterface();

        class Manutencao {
          constructor(data, tipo, custo, descricao = '') {
            this.data = new Date(data);
            this.tipo = tipo;
            this.custo = custo;
            this.descricao = descricao;
          }
        
          // Método para validar dados da manutenção
          validar() {
            if (isNaN(this.data.getTime())) {
              return "Data inválida.";
            }
            if (this.custo <= 0 || isNaN(this.custo)) {
              return "Custo inválido.";
            }
            return null;
          }
        
          // Método para retornar a representação formatada da manutenção
          formatar() {
            const dataFormatada = `${this.data.getDate()}/${this.data.getMonth() + 1}/${this.data.getFullYear()}`;
            return `${this.tipo} em ${dataFormatada} - R$${this.custo.toFixed(2)} ${this.descricao ? `- ${this.descricao}` : ''}`;
          }
        }
        
        
        
        
        function carregarGaragem() {
          const dados = Veiculo.carregarGaragem();
          const garagemDiv = document.getElementById('garagem');
          garagemDiv.innerHTML = ''; // Limpar conteúdo
        
          dados.forEach(veiculo => {
            const veiculoDiv = document.createElement('div');
            veiculoDiv.innerHTML = `
              <h3>${veiculo.tipo} ${veiculo.modelo}</h3>
              <p>Status: ${veiculo.status}</p>
              <h4>Histórico de Manutenções:</h4>
              <div>${veiculo.getHistoricoFormatado()}</div>
              <h4>Agendamentos Futuros:</h4>
              <div>${exibirAgendamentosFuturos(veiculo)}</div>
              <hr>
            `;
            garagemDiv.appendChild(veiculoDiv);
          });
        }
        
        // Função para exibir agendamentos futuros
        function exibirAgendamentosFuturos(veiculo) {
          const futuros = veiculo.historicoManutencao.filter(manutencao => manutencao.data > new Date());
          return futuros.length > 0 ? futuros.map(manutencao => manutencao.formatar()).join('<br>') : 'Nenhum agendamento futuro.';
        }
        
        // Chama a função para carregar a garagem ao carregar a página
        window.onload = carregarGaragem;
        document.getElementById('formManutencao').addEventListener('submit', function(event) {
          event.preventDefault();
          
          const data = document.getElementById('data').value;
          const tipo = document.getElementById('tipo').value;
          const custo = parseFloat(document.getElementById('custo').value);
          const descricao = document.getElementById('descricao').value;
        
          const manutencao = new Manutencao(data, tipo, custo, descricao);
          
          // Suponha que o veículo seja carregado da interface
          const veiculo = new Carro('Fusca', 'em manutenção'); // Exemplo: Pegue o veículo correto da interface
          
          veiculo.adicionarManutencao(manutencao);
          alert('Manutenção agendada com sucesso!');
          carregarGaragem(); // Recarrega a garagem após adicionar manutenção
        });
        function exibirAgendamentosFuturos(veiculo) {
          const futuros = veiculo.historicoManutencao.filter(manutencao => manutencao.data > new Date());
          return futuros.length > 0 ? futuros.map(manutencao => manutencao.formatar()).join('<br>') : 'Nenhum agendamento futuro.';
        }
        alert('Manutenção agendada com sucesso!');
        