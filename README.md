# primary-player:
"scripts": {
    "test": "jest",
    "serve": "nodemon --inspect server/index.js",
    "build-sass": "node-sass -w client/src/css -o client/dist",
    "build-react": "webpack --watch",
    "seed": "node ./database/seed.js"

# Important -- This app uses environment variables, which are defined in a .env file. The .env files are not saved to the repo for security reasons. Anytime this app is deployed to a new environment, the environment variables have to be accounted for, in this case, as connection uri to connect to the database, also which port the server is running on is defined in the .env file.

# Seed the database:
npm run seed

# Start the server:
npm run serve

# Run tests:
npm run test

# If the front end gets adjusted, we'll need to rebuild with webpack:
npm run build-react

# If css somehow gets tweaked, may need to rebuild sass:
npm run build-sass

# CRUD API endpoints:
Create: app.post('/songs', songController.addSong);
Read: one song data - app.get('/songs/:id', songController.getSong);
      all song data - app.get('/songs', songController.getSongs);
Update: app.put('/songs/:id', songController.updateSong);
Delete: app.delete('/songs/:id', songController.deleteSong);

