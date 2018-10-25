const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

const { Post, Thread } = require('./db');
const hash = require('./utils/hash');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

router.get('/thread', (req, res) => {
  Thread.find()
  .populate('op')
  .then(data => res.json({ success: true, data }))
  .catch(err => res.json({ success: false, error: err }));
});

router.get('/thread/:id', (req, res) => {
  Thread.findById(req.params.id)
  .populate('posts')
  .then(data => res.json({ success: true, data }))
  .catch(err => res.json({ success: false, error: err }));
});

router.post('/thread', (req, res) => {
  if( _.isEmpty(req.body))
    return res.json({ success: false, error: 'Your request is empty.' });

  const thread = new Thread({
    _id: new mongoose.Types.ObjectId()
  });
  
  const postId = new mongoose.Types.ObjectId();
  const opPost = new Post({
    _id: postId,
    humanId: hash(postId.toString()),
    text: req.body.text,
  });

  thread.posts.push(opPost);
  thread.op = opPost;

  opPost.save()
  .then(() => thread.save())
  .then(() => res.json({ success: true, thread }))
  .catch(err => res.json({ success: false, error: err }));
});

router.get('/post', (req, res) => {
  Post.find()
  .exec()
  .then(data => res.json({ success: true, data }))
  .catch(err => res.json({ success: false, error: err }));
});

router.post('/post', (req, res) => {
  if(_.isEmpty(req.body))
    return res.json({ success: false, error: 'Your request is empty.'});

  if(!_.has(req.body, 'threadId') || req.body.threadId === '')
    return res.json({ success: false, error: 'Need thread ID for posting.'});
  
  const { text, threadId } = req.body;

  const postId = new mongoose.Types.ObjectId();
  const post = new Post({
    _id: postId,
    humanId: hash(postId.toString()),
    text
  });

  Thread.findOneAndUpdate({ _id: threadId }, { $push: { posts: post }})
  .then(() => post.save())
  .then(() => res.json({ success: true, post }))
  .catch(err => res.json({ success: false, error: err }));  
});

app.use('/api', router);

app.listen(3001, '0.0.0.0', (err) => {
  err ? console.log('error:', err)
      : console.log('listening...');
});