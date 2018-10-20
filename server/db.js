const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const uri = require('./dbconfig');

mongoose.connect(uri, {useNewUrlParser: true});
const db = mongoose.connection;
autoIncrement.initialize(db);

db.once('open', () => console.log('connected to db'));
db.on('error', (err) => console.log('database error:', err));

const Post = new Schema({
  text: {type: String, default: ''},
  thread: {type: Schema.Types.ObjectId, ref: 'Thread'},
  isOp: {type: Boolean, default: false}
}, {
  timestamps: true
});

const Thread = new Schema({
  op: {type: Schema.Types.ObjectId, ref: 'Post'},
  posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
}, {
  timestamps: true
});

Post.plugin(autoIncrement.plugin, {model: 'Post', field: 'postId'});

module.exports = {
  Post: db.model('Post', Post),
  Thread: db.model('Thread', Thread)
};
