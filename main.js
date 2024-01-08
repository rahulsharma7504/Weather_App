const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');

var token = '';

app.get('/', (req, res) => {
  const data = randomstring.generate();
  token = jwt.sign({ data }, 'djla', { expiresIn: '12h' });
  res.status(200).send({ data, token });
});

app.get('/var', (req, res) => {
  try {
    const decoded = jwt.verify(token, 'djla');
    console.log('Data is verified:', decoded);
    res.status(200).send('Data is verified');
  } catch (error) {
    console.log('Not verified:', error.message);
    res.status(401).send('Not verified');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
