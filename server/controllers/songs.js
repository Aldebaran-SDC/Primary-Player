const Song = require('../../database/index');

module.exports.getSong = (req, res) => {
  console.log("cheese", req.params.id);
  Song.findById(req.params.id)
    .then((song) => {
      res.send(song);
    })
    .catch((error) => {
      res.status(404).send('song not found');
    });
};

module.exports.getSongs = (req, res) => {
  Song.find()
    .then((songs) => {
      res.send(songs);
    })
    .catch((error) => {
      res.status(404).send('songs not found');
    });
};

module.exports.addSong = (req, res) => {
  console.log('This is req.body inside addSong: ', req.body);
  var newSong = new Song(req.body)
  newSong.save()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log('something wrong with our insert: ', error);
      res.status(404).send('error - new song document not created');
    });
};

module.exports.updateSong = (req, res) => {

  console.log("This is req.params.id: ", req.params.id, 'and this is req.body: ', req.body);
  Song.replaceOne({ _id: req.params.id }, req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(404).send('error - song document not updated properly');
    });
};

module.exports.deleteSong = (req, res) => {
  console.log('this is req.params.id: ', req.params.id);
  Song.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(404).send('error - song document not deleted')
    })
}