const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = require('./routes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', router);

app.listen(3001, '0.0.0.0', (err) => {
  err ? console.log('error:', err)
      : console.log('listening...');
});