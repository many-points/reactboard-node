const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

const db = require('./db');
const Post = db.Post;
const Thread = db.Thread;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

router.get('/threads', (req, res) => {
  Thread.find()
    .populate('op')
    .exec((err, data) => {
      if(err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
});

router.post('/threads', (req, res) => {
  if(_.isEmpty(req.body)) {
    return res.json({ success: false, error: 'Your request is empty'});
  }
  const op = new Post({
    _id: new mongoose.Types.ObjectId(),
    text: req.body.text,
    isOp: true
  });
  const thread = new Thread({
    _id: new mongoose.Types.ObjectId(),
    op: op._id
  });
  op.thread = thread._id;
  op.save(err => {
    if(err) return res.json({ success: false, error: err });
    thread.save(err => {
      if(err) return res.json({ success: false, error: err })
      return res.json({ success: true, thread: thread._id })
    });  
  });
});

router.get('/posts', (req, res) => {
  Post.find((err, data) => {
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