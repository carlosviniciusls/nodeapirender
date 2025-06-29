const express = require('express');
const router = express.Router();
const pool = require('./db');

// Listar livros
router.get('/listar_livros', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM livros');
    res.json(rows);
  } catch (error) {
    console.error('Erro no banco:', error);
    res.status(500).json({ erro: error.message });
  }
});

// Reservar livro
router.post('/reservar_livro', async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ erro: 'ID do livro é obrigatório' });

  try {
    const [result] = await pool.query(
      'UPDATE livros SET status = ? WHERE id = ? AND status = ?',
      ['reservado', id, 'disponivel']
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Livro não encontrado ou já reservado' });
    }

    res.json({ mensagem: 'Livro reservado com sucesso' });
  } catch (error) {
    console.error('Erro ao reservar livro:', error);
    res.status(500).json({ erro: 'Erro ao reservar livro' });
  }
});

module.exports = router;
