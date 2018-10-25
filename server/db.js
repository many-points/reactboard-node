const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uri = require('./dbconfig');

mongoose.connect(uri, {useNewUrlParser: true})
  .then(() => console.log('Connected to db'))
  .catch((err) => console.log('Database error:', err));

const postSchema = new Schema({
  text:   { type: String, default: '' },
  humanId: { type: String, default: ''}
}, {
  timestamps: true
});

const threadSchema = new Schema({
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  op: {type: Schema.Types.ObjectId, ref: 'Post'}
}, {
  timestamps: true
});

module.exports = {
  Post: mongoose.model('Post', postSchema),
  Thread: mongoose.model('Thread', threadSchema)
};
