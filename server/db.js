const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const uri = require('./dbconfig');

mongoose.connect(uri, {useNewUrlParser: true});
const db = mongoose.connection;
autoIncrement.initialize(db);

db.once('open', () => console.log('connected to db'));
db.on('error', (err) => console.log('database error:', err));

const Post = new mongoose.Schema({
  text:       {type: String, default: ''},
  ip:         {type: String, default: '0.0.0.0'},
  imagePath:  {type: String, default: ''},
  token:      {type: String, default: ''}
}, {
  timestamps: true
});

Post.plugin(autoIncrement.plugin, {model: 'Post', field: 'postId'});

module.exports = {
  Post: db.model('Post', Post)
};
