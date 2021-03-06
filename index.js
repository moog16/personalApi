const express = require('express');
const app = express();
const getYoutubeVideos = require('./controllers/api').getYoutubeVideos;
const get52DinnerBlog = require('./controllers/api').get52DinnerBlog;

const appPath = `../reactPersonalPage/bin/static`;
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
app.get('/v1/youtube', getYoutubeVideos);
app.get('/v1/tumblr/52dinners', get52DinnerBlog);

// Get the port from environment variables
var port = process.env.PORT || 3001;

app.listen(port);
console.log('listening on port ', port);
