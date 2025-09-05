const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());

app.get('/api/posicao', async (req, res) => {
  try {
    const apiUrl = 'https://api.appselsyn.com.br/keek/rest/v1/integracao/posicao?apikey=eyJucyI6InRlc3RlIiwic2MiOjE1MjY2Njk2NTJ9';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      const text = await response.text();
      console.error('Erro da API externa:', text);
      return res.status(response.status).send(text);
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Erro ao buscar dados da API:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy rodando em http://localhost:${PORT}`);
});