const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const path = require('path');
const dotenv = require('dotenv').config({
  path: './.env' //path.join(__dirname, '../.env')
});

const connection = mongoose.connect(process.env.CONNSTRING, {
  useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false,
});


const songSchema = mongoose.Schema({
  _id: Number,
  author: {
    type: String,
  },
  title: {
    type: String,
  },
  genre: {
    type: String,
  },
  tags: {
    type: String,
  },
  artwork_url: {
    type: String,
  },
  audio_file_path: {
    type: String,
  },
  like_count: {
    type: Number,
  },
  play_count: {
    type: Number,
  },
  repost_count: {
    type: Number,
  },
}, { timestamps: true });
songSchema.plugin(AutoIncrement);
const song = mongoose.model('Song', songSchema);


module.exports = song;
