const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const crypto = require('crypto');

const app = express();

const config = require('./config');

mongoose.connect(config.DB_URI, {useNewUrlParser: true})
  .then(() => console.log('Connected to db'))
  .catch((err) => console.log('Database error:', err));

const router = require('./routes');

app.use(multer({
  fileFilter: (req, file, cb) => {
    const types = ['image/jpeg', 'image/gif', 'image/png'];
    if(!types.some(type => file.mimetype === type)) {
      cb(null, false);
      console.log('Error: Mimetype not allowed')
      req.res.json({success: false, error: 'Mimetype not allowed'});
    }
    cb(null, true)
  },
  storage: multer.diskStorage({
    destination: './img',
    filename: (req, file, cb) => {
      const ext = {
        'image/jpeg': '.jpg',
        'image/gif':  '.gif',
        'image/png':  '.png'
      };
      console.log(file);
      cb(null, crypto.randomBytes(16).toString('hex') + ext[file.mimetype]);
    }
  })
}).single('file'));
app.use(bodyParser.json());
app.use('/api', router);
app.use('/img', express.static('img'));
app.use('/', express.static('client/build'))

app.use((req, res) => {
  res.status(404);
  res.send({success: false, error: '404'})
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, (err) => {
  err ? console.log('error:', err)
      : console.log(`listening on ${PORT}`);
});