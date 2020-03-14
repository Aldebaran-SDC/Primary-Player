const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config({
  path: path.join(__dirname, '../.env')
});
const cors = require('cors');
const songController = require('./controllers/songs');

//allow * origin on all routes
app.use(cors());

//serve static requests from dist folder
app.use(express.static(path.join(__dirname, '../client/dist')));

//parse the request into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// retrieve all songs
app.get('/songs', songController.getSongs);

// retrieve one song
app.get('/songs/:id', songController.getSong);

//add a song document
app.post('/songs', songController.addSong);

//update a song document
app.put('/songs/:id', songController.updateSong);

//delete a song delete a song document
app.delete('/songs/:id', songController.deleteSong);


app.listen(process.env.PORT, () => console.log(`serving on port ${process.env.PORT}!`));
