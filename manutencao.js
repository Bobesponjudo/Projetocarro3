class Manutencao {
    constructor(data, tipo, custo, descricao = '') {
      // Tenta criar um objeto Date. Se falhar, armazena null ou a string original.
      this.data = data instanceof Date ? data : new Date(data);
      if (isNaN(this.data.getTime())) {
        console.error("Data inválida fornecida:", data);
        // Poderia lançar um erro ou definir como null
        this.data = null;
      }
      this.tipo = tipo;
      this.custo = parseFloat(custo); // Garante que custo seja número
      this.descricao = descricao;
  
      if (!this.validar()) {
        console.warn("Dados de manutenção inválidos na criação:", this);
        // Poderia lançar um erro para impedir a criação
      }
    }
  
    validar() {
      const isDataValida = this.data && !isNaN(this.data.getTime());
      const isTipoValido = typeof this.tipo === 'string' && this.tipo.trim() !== '';
      const isCustoValido = typeof this.custo === 'number' && this.custo >= 0;
      return isDataValida && isTipoValido && isCustoValido;
    }
  
    formatar() {
      if (!this.data || isNaN(this.data.getTime())) {
        return `${this.tipo} - Data inválida - R$ ${this.custo.toFixed(2)}`;
      }
      const dataFormatada = this.data.toLocaleDateString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric'
      });
      const horaFormatada = this.data.toLocaleTimeString('pt-BR', {
        hour: '2-digit', minute: '2-digit'
      });
      // Inclui hora se não for meia-noite (indicando que hora foi definida)
      const dataHoraCompleta = this.data.getHours() === 0 && this.data.getMinutes() === 0
        ? dataFormatada
        : `${dataFormatada} às ${horaFormatada}`;
  
      return `${this.tipo} em ${dataHoraCompleta} - R$ ${this.custo.toFixed(2)}${this.descricao ? ` (${this.descricao})` : ''}`;
    }
  
    // Método útil para serialização/deserialização
    toJSON() {
      return {
        data: this.data ? this.data.toISOString() : null, // Salva como ISO string
        tipo: this.tipo,
        custo: this.custo,
        descricao: this.descricao
      };
    }
  
    // Método estático para recriar a instância a partir de dados puros (JSON)
    static fromJSON(json) {
      if (!json || typeof json !== 'object') return null;
      // Recria o objeto Date a partir da string ISO
      const dataObj = json.data ? new Date(json.data) : null;
      return new Manutencao(dataObj, json.tipo, json.custo, json.descricao);
    }
  }