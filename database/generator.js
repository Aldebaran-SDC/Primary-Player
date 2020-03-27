const fs = require('fs');
const faker = require('faker');
const argv = require('yargs').argv

const lines = argv.lines || 10000000;
const filename = argv.output || 'songs.csv';
const stream = fs.createWriteStream(filename);

let songUrls = [
  'http://d2kzfado6qqgq8.cloudfront.net/BunkerSIM.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/Chronicles+of+Fate.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/Dragomon+Hunters+Release+Trailer.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/Electro+City.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/Gem+Hunters+Boss.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/Gem+Hunters+Overworld.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/Heroes-+Assault.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/Heroes-+Base.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/Invasion.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/Nauticrawl+Theme.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/Revelations+Trailer+Full.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/SodaDunegeon4.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/SodaDungen.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/SodaDungeon2.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/SodaDungeon3.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/Warlords+Cinematic+Trailer.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/Wild+Battle.mp3'
];

function randomBetween(min, max) {
  return Math.floor(min + Math.random() * max);
}

var counter = 0;

const createPost = () => {
  counter++;
  const id = counter;
  const author = faker.name.findName();
  const title = faker.random.word().split(",")[0];
  const genre = faker.random.word().split(",")[0];
  const tags = faker.random.word().split(",")[0];
  const artwork_url = `http://d2tlnaqrf4t9d7.cloudfront.net/playerPhotos/primary${randomBetween(1, 1001)}.jpeg`;
  const audio_file_path = songUrls[randomBetween(0, 17)];
  const like_count = faker.random.number();
  const play_count = faker.random.number();
  const repost_count = faker.random.number();

  return `${id},${author},${title},${genre},${tags},${artwork_url},${audio_file_path},${like_count},${play_count},${repost_count}\n`
};

const startWriting = (writeStream, encoding, done) => {
  let i = lines;

  function writing() {
    let canWrite = true;
    do {
      i--
      let post = createPost();
      //check if i === 0 so we would write and call `done`
      if (i === 0) {
        // we are done so fire callback
        writeStream.write(post, encoding, done)
      } else {
        // we are not done, so don't fire callback
        writeStream.write(post, encoding)
      }
      //else call write and continue looping
    } while (i > 0 && canWrite)
    if (i > 0 && !canWrite) {
      //our buffer for stream filled and need to wait for drain
      // Write some more once it drains.
      writeStream.once('drain', writing);
    }
  }
  //initiate our writing function
  writing();
}

//write our 'header' line before we invoke the loop
stream.write(`author,title,genre,tags,artwork_url,audio_file_path,like_count,play_count,repost_count\n`, 'utf-8');
//invoke startwriting and pass callback
startWriting(stream, 'utf-8', () => {
  stream.end()
});

/*
 id SERIAL PRIMARY KEY,
  author VARCHAR(40),
  title VARCHAR(40),
  genre VARCHAR(40),
  tags VARCHAR(50),
  artwork_url VARCHAR(70),
  audio_file_path VARCHAR(80),
  like_count INTEGER,
  play_count INTEGER,
  repost_count INTEGER

   author: faker.name.findName(),
  title: faker.random.word(),
  genre: faker.random.word(),
  tags: faker.random.words(),
  artwork_url: 'https://d1vgv8e3fkby3.cloudfront.net/img/artwork' + randomBetween(1,22) + '.jpeg',
  audio_file_path: songUrls[j],
  like_count: faker.random.number(),
  play_count: faker.random.number(),
  repost_count: faker.random.number(),

  http://d2tlnaqrf4t9d7.cloudfront.net/playerPhotos/primary1.jpeg
*/