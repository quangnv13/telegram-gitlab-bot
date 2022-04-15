require('dotenv').config();
const express = require('express');
const cors = require('cors');
const gitlabService = require('./gitlab.service');
const { json } = require('express');

const app = express();
const port = process.env.PORT || 3100;

app.use(cors());
app.use(json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}]: ${req.method} - ${req.path}`);
  next();
});

// app.get('/', (req, res) => {
//   res.send('OK');
// });

app.post('/', gitlabService.handleRequest);

app.listen(port, () => {
  console.log(`Qelegram bot is running on port ${port}`);
});
