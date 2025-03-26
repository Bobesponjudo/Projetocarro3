class Veiculo {
    constructor(modelo, cor) {
      this.modelo = modelo;
      this.cor = cor;
      this.ligado = false;
      this.velocidade = 0;
    }
  
    ligar() {
      this.ligado = true;
      console.log(`${this.modelo} ligado.`);
    }
  
    desligar() {
      this.ligado = false;
      this.velocidade = 0;
      console.log(`${this.modelo} desligado.`);
    }
  
    acelerar(incremento) {
      if (this.ligado) {
        this.velocidade += incremento;
        console.log(`${this.modelo} acelerando para ${this.velocidade} km/h.`);
      } else {
        console.log(`${this.modelo} não pode acelerar. Ligue-o primeiro.`);
      }
    }
  
    frear(decremento) {
      this.velocidade = Math.max(0, this.velocidade - decremento);
      console.log(`${this.modelo} freando para ${this.velocidade} km/h.`);
    }
  
    buzinar() {
      console.log("Beep beep!");
    }
  
    exibirInformacoes() {
      return `Modelo: ${this.modelo}, Cor: ${this.cor}, Ligado: ${this.ligado}, Velocidade: ${this.velocidade} km/h`;
    }
  }
  
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