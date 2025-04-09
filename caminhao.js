// class Caminhao extends Veiculo {
//   constructor(modelo, placa, status, capacidadeCarga = 10000) { // Em kg
//     super(modelo, placa, status);
//     this.capacidadeCarga = capacidadeCarga;
//   }
//   toJSON() {
//     return {
//       ...super.toJSON(),
//       capacidadeCarga: this.capacidadeCarga,
//       historicoManutencao: this.historicoManutencao.map(m => m.toJSON())
//     };
//   }
// }


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
