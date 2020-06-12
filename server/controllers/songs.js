const redis = require('redis');
const Song = require('../../database/index');
const client = require('../../database/cassandraIndex.js');

//const redisClient = redis.createClient(6379, '52.9.137.255');

module.exports.getSong = (req, res) => {
  // redisClient.get(req.params.id, (err, reply) => {
  //   if (err) {
  //     // console.log('Redis connection err: ', err);
  //     res.status(404).send('Redis trouble)');
  //     return;
  //   }
  //   if (reply != null) {
  //     // console.log('This is the JSON.parse(reply): ', JSON.parse(reply));
  //     res.send(JSON.parse(reply));
  //   } else {
  //     // console.log('Redis reply was null apparently, here is the reply: ', reply);
  //     //   //This is for Cassandra:
  //     const getSongById = 'SELECT * FROM songs WHERE id = ?';
  //     client.execute(getSongById, [req.params.id], { prepare: true }, (error, results) => {
  //       if (error) {
  //         //    console.log('Error from Cqlsh query getSongById: ', error);
  //         res.status(404).send('song not found');
  //       } else {
  //         //   console.log('Results from cqlsh query getSongByID: ', results.rows[0]);
  //         redisClient.set(req.params.id, JSON.stringify(results.rows[0]));
  //         res.send(results.rows[0]);
  //       }
  //     });
  //   }
  //   // }
  // });
  // };
  // //This is for Cassandra:
  const getSongById = 'SELECT * FROM songs WHERE id = ?';
  client.execute(getSongById, [req.params.id], { prepare: true }, (err, results) => {
    if (err) {
      console.log('Error from Cqlsh query getSongById: ', err);
      res.status(404).send('song not found');
    } else {
      // console.log('Results from cqlsh query getSongByID: ', results.rows[0]);
      res.send(results.rows[0]);
    }
  });
};
// This is for Mongo.db:
// console.log("cheese", req.params.id);
// Song.findById(req.params.id)
//   .then((song) => {
//     res.send(song);
//   })
//   .catch((error) => {
//     res.status(404).send('song not found');
//   });


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
  //   This is for Cassandra:
  // console.log('this is the req.body: ', req.body);
  // let filename = path.basename('/counter.js');
  // fs.readFile(filename, 'utf8', (err, data) => {
  //   if (err) {
  //     console.log('error while reading the counter from counter.js: ', err);
  //   }
  //   counter = parseInt(data);
  //   console.log('this is counter (from inside of readfile: ', counter);
  // let _id = counter;

  const insert = 'INSERT into player.songs(id,author,title,genre,tags,artwork_url,audio_file_path,like_count,play_count,repost_count) values (?,?,?,?,?,?,?,?,?,?)';

  const paramValues = [10000000, req.body.author, req.body.title, req.body.genre, req.body.tags, req.body.artwork_url, req.body.audio_file_path, req.body.like_count, req.body.play_count, req.body.repost_count];

  client.execute(insert, paramValues, { prepare: true }, (err, result) => {
    if (err) {
      console.log('song POST failed: ', err);
    } else {
      console.log('song POST sucessful!! Here is the result: ', result);
      res.status(200).send(result);
    }
  });
};

//   This is for Mongo.db:
//   console.log('This is req.body inside addSong: ', req.body);
//   var newSong = new Song(req.body)
//   newSong.save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((error) => {
//       console.log('something wrong with our insert: ', error);
//       res.status(404).send('error - new song document not created');
//     });
// };

module.exports.updateSong = (req, res) => {
  // console.log("This is req.params.id: ", req.params.id, 'and this is req.body: ', req.body);
  Song.replaceOne({ _id: req.params.id }, req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(404).send('error - song document not updated properly');
    });
};

module.exports.deleteSong = (req, res) => {
  // console.log('this is req.params.id: ', req.params.id);
  Song.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(404).send('error - song document not deleted');
    });
};