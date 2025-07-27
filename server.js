const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db'); // Importa a conexão com o banco de dados (o pool)
const atendimentoRoutes = require('./routes/atendimentoRoutes'); 

const app = express();

app.use(cors());
app.use(bodyParser.json()); 

app.use('/atendimentos', atendimentoRoutes);

app.use((req, res, next) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ erro: 'Algo deu errado no servidor!', details: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor web funcionando!");
});