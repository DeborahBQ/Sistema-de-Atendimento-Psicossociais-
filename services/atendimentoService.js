const pool = require('../db'); // Importa a conexão com o banco de dados.

class AtendimentoService {
  // Função pura: Retorna todos os atendimentos.
  static async getAllAtendimentos() {
    try {
      const result = await pool.query('SELECT * FROM atendimentos ORDER BY data DESC, id DESC');
      return result.rows;
    } catch (error) {
      console.error('Erro no service ao buscar todos os atendimentos:', error);
      throw new Error('Erro ao buscar atendimentos.');
    }
  }

  // Função pura: Retorna um atendimento por ID.
  static async getAtendimentoById(id) {
    try {
      const result = await pool.query({
        text: 'SELECT * FROM atendimentos WHERE id = $1',
        values: [id],
      });
      return result.rows[0]; 
    } catch (error) {
      console.error(`Erro no service ao buscar atendimento com ID ${id}:`, error);
      throw new Error('Erro ao buscar atendimento por ID.');
    }
  }

  // Função pura: Cria um novo atendimento.
  static async createAtendimento(nome, profissional, data, tipo, observacoes) {
    try {
      const result = await pool.query({
        text: 'INSERT INTO atendimentos (nome, profissional, data, tipo, observacoes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        values: [nome, profissional, data, tipo, observacoes],
      });
      return result.rows[0];
    } catch (error) {
      console.error('Erro no service ao criar atendimento:', error);
      throw new Error('Erro ao cadastrar atendimento.');
    }
  }

  // Função pura: Atualiza um atendimento existente.
  static async updateAtendimento(id, nome, profissional, data, tipo, observacoes) {
    try {
      const result = await pool.query({
        text: 'UPDATE atendimentos SET nome = $1, profissional = $2, data = $3, tipo = $4, observacoes = $5 WHERE id = $6 RETURNING *',
        values: [nome, profissional, data, tipo, observacoes, id],
      });
      return result.rows[0]; 
    } catch (error) {
      console.error(`Erro no service ao atualizar atendimento com ID ${id}:`, error);
      throw new Error('Erro ao atualizar atendimento.');
    }
  }

  // Função pura: Exclui um atendimento.
  static async deleteAtendimento(id) {
    try {
      await pool.query({
        text: 'DELETE FROM atendimentos WHERE id = $1',
        values: [id],
      });
    } catch (error) {
      console.error(`Erro no service ao excluir atendimento com ID ${id}:`, error);
      throw new Error('Erro ao excluir atendimento.');
    }
  }
}

module.exports = AtendimentoService;