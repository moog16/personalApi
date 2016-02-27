const express = require('express');
const app = express();
const dotenv = require('dotenv');
const request = require('request');

dotenv.load();
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

app.get('/youtube', (req, res) => {
  request.get(process.env.YOUTUBE_API_URL, (error, response, body) => {
    var apiResponse = [];
    if (!error && response.statusCode == 200) {
      const videos = JSON.parse(body).items;
      if(videos && videos.length) {
        for(var i=0; i<videos.length; i++) {
          var videoId = videos[i].contentDetails.videoId;
          var videoUrl = `${process.env.YOUTUBE_BASE_URL}${videoId}`;
          apiResponse.push({url: videoUrl, id: videoId});
        }
      }
    } else {
      console.log('error', body);
      apiResponse = body;
    }
    res.send(apiResponse);
  });
});

// Get the port from environment variables
var port = process.env.PORT || 3001;

app.listen(port);
console.log('listening on port ', port);
