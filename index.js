const express = require('express');
const { puppieLogic } = require('./puppieLogic');

const app = express();

app.get('/', (req, res) => {
  res.send('Example Docker Render');
});

app.get('/puppie', async (req, res) => {
  await puppieLogic(res);
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('server is running on port ' + PORT);
});
