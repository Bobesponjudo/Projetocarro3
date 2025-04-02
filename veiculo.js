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
  