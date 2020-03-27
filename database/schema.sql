DROP DATABASE IF EXISTS player;
CREATE DATABASE player;

\c player;

CREATE TABLE song (
  id SERIAL PRIMARY KEY,
  author VARCHAR(250),
  title VARCHAR(250),
  genre VARCHAR(250),
  tags VARCHAR(250),
  artwork_url VARCHAR(250),
  audio_file_path VARCHAR(250),
  like_count INTEGER,
  play_count INTEGER,
  repost_count INTEGER
);

/* Execute this file from the command line by typing:
   psql -U student postgres < database/schema.sql
   */