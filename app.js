const express = require('express');
const app = express();
const routes = require('./routes'); // o arquivo que contém seu código acima

app.use(express.json()); // middleware global para JSON
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
