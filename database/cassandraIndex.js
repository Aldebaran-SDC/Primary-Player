
const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  // contactPoints: ['localhost'],
  contactPoints: ['54.219.17.29', '52.53.109.21', '18.144.111.167'],
  localDataCenter: 'us-west',
  keyspace: 'player',
});
client.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log('Cassandra connected!');
});
const createSongs = 'CREATE TABLE songs (id int PRIMARY KEY, author text,title text, genre text, tags text, artwork_url text,audio_file_path text,like_count int, play_count int, repost_count int);';


const seedDbFromCsv = "COPY player.songs(id,author,title,genre,tags,artwork_url,audio_file_path,like_count,play_count,repost_count) FROM 'Users/svc/HRRPT18/SDC/primary-player/songs.csv' WITH DELIMITER=',' AND HEADER=TRUE;";

//  client.execute(seedDbFromCsv, (err, results) => {
//   if (err) {
//     console.log('This is the err from cassandra query: ', err);
//   } else {
//     console.log('This is the results from the cassandra query: ', results);
//   }
// });

module.exports = client;
