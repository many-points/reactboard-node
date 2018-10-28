const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = require('./routes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', router);

app.use((req, res) => {
  res.status(404);
  res.send({success: false, error: '404'})
});

app.listen(3001, '0.0.0.0', (err) => {
  err ? console.log('error:', err)
      : console.log('listening...');
});