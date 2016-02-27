const express = require('express');
const app = express();
const getYoutubeVideos = require('./controllers/api').getYoutubeVideos;

const appPath = `../react-matt/`;
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
}

// Serve static files
app.use(express.static(`${appPath}`));
//CORS middleware
app.use(allowCrossDomain);

// routes
app.get('/youtube', getYoutubeVideos);

// Get the port from environment variables
var port = process.env.PORT || 3001;

app.listen(port);
console.log('listening on port ', port);
