const express = require('express');
const app = express();
const cors = require('cors');
const getImages = require('./routes/express'); // Supondo que a função esteja em um arquivo separado

app.use(cors());
app.get('/api/images', getImages);

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});