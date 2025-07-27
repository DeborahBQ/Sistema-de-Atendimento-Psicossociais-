const express = require('express');
const router = express.Router(); // Cria uma instância do Express Router
const AtendimentoService = require('../services/atendimentoService'); 

router.get('/', async (req, res) => {
  try {
    const atendimentos = await AtendimentoService.getAllAtendimentos();
    res.json(atendimentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const atendimento = await AtendimentoService.getAtendimentoById(req.params.id);
    if (!atendimento) {
      return res.status(404).json({ erro: 'Atendimento não encontrado' });
    }
    res.json(atendimento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { nome, profissional, data, tipo, observacoes } = req.body;
  if (!nome || !profissional || !data || !tipo) {
    return res.status(400).json({ erro: 'Dados obrigatórios ausentes: nome, profissional, data, tipo' });
  }
  try {
    const novoAtendimento = await AtendimentoService.createAtendimento(nome, profissional, data, tipo, observacoes);
    res.status(201).json(novoAtendimento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { nome, profissional, data, tipo, observacoes } = req.body;
  if (!nome || !profissional || !data || !tipo) {
    return res.status(400).json({ erro: 'Dados obrigatórios ausentes: nome, profissional, data, tipo' });
  }
  try {
    const atendimentoAtualizado = await AtendimentoService.updateAtendimento(
      req.params.id,
      nome,
      profissional,
      data,
      tipo,
      observacoes
    );
    if (!atendimentoAtualizado) {
      return res.status(404).json({ erro: 'Atendimento não encontrado para atualizar' });
    }
    res.json(atendimentoAtualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const atendimentoExistente = await AtendimentoService.getAtendimentoById(req.params.id);
    if (!atendimentoExistente) {
      return res.status(404).json({ erro: 'Atendimento não encontrado para exclusão' });
    }
    await AtendimentoService.deleteAtendimento(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; // Exportar o router para ser usado no server.js