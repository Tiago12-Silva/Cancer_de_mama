// Importações principais
const express = require('express');
const path = require('path');
const sequelize = require('./config/database');
const metaController = require('./controller/metaController');

const app = express();

// Configurações básicas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (HTML, CSS, imagens, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal → abre seu site sobre o câncer
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'prefeitura2.html'));
});

// Exemplo de outras páginas (caso queira adicionar depois)
app.get('/inicio', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'prefeitura.html'));
});

app.get('/metas', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'informacoes.html'));
});

// Rotas da API (caso vá usar com banco)
app.get('/api/metas', metaController.listarMetas);
app.post('/api/metas', metaController.criarMeta);
app.put('/api/metas/:id', metaController.atualizarMeta);
app.delete('/api/metas/:id', metaController.deletarMeta);

// Inicia o servidor na porta 3000
sequelize
  .sync()
  .then(() => {
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar com o banco de dados:', err);
  });
