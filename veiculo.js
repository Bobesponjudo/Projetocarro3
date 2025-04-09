// Classe Veiculo (base)
class Veiculo {
  constructor(tipo, modelo, status) {
    this.tipo = tipo;
    this.modelo = modelo;
    this.status = status; // Exemplo: 'em manutenção', 'disponível'
    this.historicoManutencao = [];
  }
  
  // Adicionar uma nova manutenção
  adicionarManutencao(manutencao) {
    const erro = manutencao.validar();
    if (erro) {
      alert(erro);
      return;
    }
    this.historicoManutencao.push(manutencao);
    this.salvarNoLocalStorage();
  }

  // Retornar histórico formatado
  getHistoricoFormatado() {
    return this.historicoManutencao.map(manutencao => manutencao.formatar()).join('<br>');
  }

  // Salvar os dados no LocalStorage
  salvarNoLocalStorage() {
    const dados = JSON.parse(localStorage.getItem('garagem')) || [];
    const veiculosIndexados = dados.filter(veiculo => veiculo.modelo !== this.modelo);
    veiculosIndexados.push(this);
    localStorage.setItem('garagem', JSON.stringify(veiculosIndexados));
  }

  // Carregar a garagem do LocalStorage
  static carregarGaragem() {
    const dados = JSON.parse(localStorage.getItem('garagem')) || [];
    return dados.map(dado => {
      const veiculo = new Veiculo(dado.tipo, dado.modelo, dado.status);
      veiculo.historicoManutencao = dado.historicoManutencao.map(manutencao => new Manutencao(manutencao.data, manutencao.tipo, manutencao.custo, manutencao.descricao));
      return veiculo;
    });
  }
}


class Veiculo1 {
  // Usar placa como ID único simplifica
  constructor(modelo, placa, status = 'Disponível') {
    if (!modelo || !placa) {
      throw new Error("Modelo e Placa são obrigatórios para criar um veículo.");
    }
    this.modelo = modelo;
    this.placa = placa; // Usaremos placa como ID
    this.status = status;
    this.historicoManutencao = []; // Array de objetos Manutencao
    this.tipoVeiculo = this.constructor.name; // Guarda o tipo para recriar do LocalStorage
  }

  adicionarManutencao(manutencao) {
    if (manutencao instanceof Manutencao && manutencao.validar()) {
      this.historicoManutencao.push(manutencao);
      // Ordena por data (mais recente primeiro ou último) - opcional
      this.historicoManutencao.sort((a, b) => (b.data || 0) - (a.data || 0)); // Mais recentes primeiro
      console.log(`Manutenção adicionada para ${this.modelo} (${this.placa})`);
    } else {
      alert("Erro: Tentativa de adicionar manutenção inválida.");
      console.error("Objeto Manutencao inválido:", manutencao);
    }
  }

  getHistoricoFormatado() {
    if (!this.historicoManutencao || this.historicoManutencao.length === 0) {
      return ["Nenhum histórico de manutenção registrado."];
    }
    return this.historicoManutencao.map(m => m.formatar());
  }

  // Método para facilitar a recriação a partir do JSON
  static fromJSON(json) {
    if (!json || !json.modelo || !json.placa || !json.tipoVeiculo) return null;

    let veiculo;
    // Determina qual classe instanciar
    switch (json.tipoVeiculo) {
      
      case 'CarroEsportivo':
        veiculo = new CarroEsportivo(json.modelo, json.placa, json.status);
        if (json.velocidadeMaxima) veiculo.velocidadeMaxima = json.velocidadeMaxima;
        if (json.numeroPortas) veiculo.numeroPortas = json.numeroPortas;
        break;
      case 'Caminhao':
        veiculo = new Caminhao(json.modelo, json.placa, json.status);
        if (json.capacidadeCarga) veiculo.capacidadeCarga = json.capacidadeCarga;
        break;
      default:
        console.warn(`Tipo de veículo desconhecido ao carregar: ${json.tipoVeiculo}`);
        // Pode instanciar Veiculo como fallback ou retornar null
        veiculo = new Veiculo(json.modelo, json.placa, json.status);
        break; // Ou return null;
    }

    // Recria os objetos Manutencao a partir dos dados JSON
    if (json.historicoManutencao && Array.isArray(json.historicoManutencao)) {
      veiculo.historicoManutencao = json.historicoManutencao
        .map(mJson => Manutencao.fromJSON(mJson))
        .filter(m => m !== null); // Filtra entradas inválidas
      // Reordena após carregar, se necessário
      veiculo.historicoManutencao.sort((a, b) => (b.data || 0) - (a.data || 0));
    } else {
      veiculo.historicoManutencao = [];
    }

    return veiculo;
  }
}
