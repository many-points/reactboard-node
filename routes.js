const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const { Post, Thread } = require('./models');
const hash = require('./utils/hash');
const generateToken = require('./utils/token');

const config = './config';

function returnError(res, error) {
  return res.json({ success: false, error: err });
}

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
  const amount = Number(req.params.amount) || config.ENTRIES_PER_PAGE;
  
  Thread.find({}, {}, { sort: { updatedAt: -1 }, skip: amount*offset, limit: amount })
  .populate([{path: 'op', select: '-token'}, {path: 'posts', select: '-token'}])
  .lean()
  .then(data => {
    if (!data) throw Error('No data received');
    data = data.map(obj => {
      obj.postCount = obj.posts.length;
      obj.posts = obj.posts.slice(-3);
      return obj;
    });
    res.json({ success: true, data });
  })
  .catch(err => returnError(res, err));
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
  .catch(err => returnError(res, err));
});

/**
 * @name    Create thread
 * @route   POST /api/threads
 * @desc    Create new thread
 */
router.post(`/threads`, (req, res) => {
  const keys = ['text'];
  if(!keys.every(key => key in req.body))
    return returnError(res, 'Bad request.');
  
  const thread = new Thread({
    _id: new mongoose.Types.ObjectId(),
  });
  
  const postId = new mongoose.Types.ObjectId();
  const opPost = new Post({
    _id: postId,
    humanId: hash(postId.toString()),
    text: req.body.text,
    token: generateToken()
  });
  thread.posts.push(opPost);
  thread.op = opPost;
  
  opPost.save()
  .then(() => thread.save())
  .then(() => {
    thread.postCount = 1;
    res.json({ success: true, thread });
  })
  .catch(err => returnError(res, err));
});

/**
 * @name    Create post
 * @route   POST /api/posts/:threadId
 * @desc    Create new post in a thread with `threadId`
 */
router.post(`/posts/:threadId`, (req, res) => {
  const keys = ['text'];
  if(!keys.every(key => key in req.body))
    return returnError(res, 'Bad request');
  
  const postId = new mongoose.Types.ObjectId();
  const post = new Post({
    _id: postId,
    humanId: hash(postId.toString()),
    text: req.body.text,
    token: generateToken()
  });

  Thread.findByIdAndUpdate(req.params.threadId, {$push: {posts: post}})
  .then(() => post.save())
  .then(() => res.json({ success: true, post }))
  .catch(err => returnError(res, err));
});

/**
 * @name    Upload image
 * @route   POST /api/images/:postId/:token
 * @desc    Attach an image to post
 */
router.post(`/images/:postId`, (req, res) => {
  const token = req.header('Authentication');
  Post.findById(req.params.postId)
  .then(data => {
    if(data.token === token) {
      Post.findByIdAndUpdate(req.params.postId, {$push: {images: req.file.path}})
      .then(() => res.json({ success: true, path: req.file.path }))
      .catch(err => returnError(res, err));
    } else {
      throw Error('Incorrect token');
    }
  })
  .catch(err => returnError(res, err));
});

module.exports = router;