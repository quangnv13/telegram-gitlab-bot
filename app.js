require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { json } = require('express');
const { handleRequest } = require('./routes');

const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3010;

app.use(cors());
app.use(json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}]: ${req.method} - ${req.path} - Kind: ${req.body.object_kind}`);
  next();
});

app.post('/', handleRequest);

app.listen(port, () => {
  console.log(`Qelegram bot is running on port ${port}`);
});
