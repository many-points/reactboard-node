const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const { Post, Thread } = require('./db');
const hash = require('./utils/hash');

const ENTRIES_PER_PAGE = 20;

/**
 * @name
 * @route   GET /api/
 * @desc
 */
router.get(`/`, (req, res) => {
  res.redirect('threads/0');
});

/**
 * @name    Get threads
 * @route   GET /api/threads/:offset/:amount
 * @desc    Get `amount` threads, sorted by last updated, beginning from `amount*offset`
 */
router.get(`/threads/:offset?/:amount?`, (req, res) => {
  const offset = Number(req.params.offset) || 0;
  const amount = Number(req.params.amount) || ENTRIES_PER_PAGE;
  
  Thread.find(
    {}, {},
    { sort: { updatedAt: -1 }, skip: amount*offset, limit: amount }
  )
  .populate(['op', 'posts']).lean()
  .then(data => {
    if (!data) throw Error('No data received');
    data = data.map(obj => {
      obj.postCount = obj.posts.length;
      obj.posts = obj.posts.slice(-3);
      return obj;
    });
    res.json({ success: true, data });
  })
  .catch(err => res.json({ success: false, error: err }));
});

/**
 * @name    Get posts
 * @route   GET /api/posts/:threadId
 * @desc    Get all posts from a thread
 */
router.get(`/posts/:threadId`, (req, res) => {
  Thread.findById(req.params.threadId)
  .populate('posts')
  .then(data => {
    if (!data) throw Error('No data received');
    res.json({ success: true, data });
  })
  .catch(err => res.json({ success: false, error: err }));
});

/**
 * @name    Create thread
 * @route   POST /api/threads
 * @desc    Create new thread
 */
router.post(`/threads`, (req, res) => {
  const keys = ['text'];
  if(!keys.every(key => key in req.body))
    return res.json({ success: false, error: 'Bad request.' });
  
  const thread = new Thread({
    _id: new mongoose.Types.ObjectId(),
    count
  });
  
  const postId = new mongoose.Types.ObjectId();
  const opPost = new Post({
    _id: postId,
    humanId: hash(postId.toString()),
    text: req.body.text
  });
  thread.posts.push(opPost);
  thread.op = opPost;
  
  opPost.save()
  .then(() => thread.save())
  .then(() => res.json({ success: true, thread }))
  .catch(err => res.json({ success: false, error: err }));
});

/**
 * @name    Create post
 * @route   POST /api/posts/:threadId
 * @desc    Create new post in a thread with `threadId`
 */
router.post(`/posts/:threadId`, (req, res) => {
  const keys = ['text'];
  if(!keys.every(key => key in req.body))
    return res.json({ success: false, error: 'Bad request.' });
  
  const postId = new mongoose.Types.ObjectId();
  const post = new Post({
    _id: postId,
    humanId: hash(postId.toString()),
    text: req.body.text
  });

  Thread.findByIdAndUpdate(req.params.threadId, {$push: {posts: post}})
  .then(() => post.save())
  .then(() => res.json({ success: true, post }))
  .catch(err => res.json({ success: false, error: err }));
});

module.exports = router;