const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const crypto = require('crypto');

const app = express();
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

app.use((req, res) => {
  res.status(404);
  res.send({success: false, error: '404'})
});

app.listen(3001, '0.0.0.0', (err) => {
  err ? console.log('error:', err)
      : console.log('listening...');
});