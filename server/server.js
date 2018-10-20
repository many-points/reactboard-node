const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

const db = require('./db');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

router.get('/posts', (req, res) => {
  db.Post.find((err, data) => {
    return err
      ? res.json({ success: false, error: err })
      : res.json({ success: true, data: data });
  });
});

router.post('/posts', (req, res) => {
  if(_.isEmpty(req.body)) {
    return res.json({ success: false, error: 'Your request is empty.'});
  }
  const post = new db.Post();
  const { text } = req.body;
  post.text = text;
  post.save(err => {
    return err
      ? res.json({ success: false, error: err })
      : res.json({ success: true });
  });
});

app.use('/api', router);

app.listen(3001, (err) => {
  err ? console.log('error:', err)
      : console.log('listening...');
});