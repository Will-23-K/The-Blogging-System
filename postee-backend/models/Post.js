const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    trim: true
  },
  media: [{
    url: String,
    mediaType: {
      type: String,
      enum: ['image', 'video', 'text'],
      required: true
    },
    duration: Number, // for videos
    thumbnail: String // for videos
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  postType: {
    type: String,
    enum: ['video', 'peep', 'post', 'repost'],
    required: true
  },
  pinned: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  repostedFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', postSchema);