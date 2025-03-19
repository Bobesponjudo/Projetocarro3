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

// Exibe as informações iniciais do veículo selecionado
exibirInformacoesVeiculo();