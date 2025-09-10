// postee-backend/models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title:   { type: String, required: true, trim: true, maxlength: 200 },
  content: { type: String, required: true, trim: true },
  author:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  media: [{
    url: String,
    mediaType: { type: String, enum: ['image','video','text'] },
    duration: Number,
    thumbnail: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
