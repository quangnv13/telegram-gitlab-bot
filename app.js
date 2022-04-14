require('dotenv').config();
const express = require('express');
const telegrafService = require('./telegraf');
const db = require('./db');
const gitlabService = require('./gitlab.service');

const app = express();
const port = process.env.PORT || 3100;

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}]: ${req.method} - ${req.path}`);
  next();
});

// app.get('/', (req, res) => {
//   telegrafService.pipelineSuccess();
//   res.send('OK');
// });

app.post('/gitlab-hooks', gitlabService.handleMergeRequest);

app.listen(port, () => {
  console.log(`Qelegram bot is running on port ${port}`);
});
