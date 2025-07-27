const { Pool } = require('pg'); // Usamos Pool para melhor gerenciamento de conexões.

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'atendimentos',
  password: 'abc123',
  port: 5432,
});

pool.on('connect', () => {
  console.log('Cliente PostgreSQL conectado.');
});

pool.on('error', (err, client) => {
  console.error('Erro inesperado no cliente PostgreSQL', err);
  process.exit(-1); 
});

module.exports = pool; // Exportar o pool para ser usado em outros módulos.