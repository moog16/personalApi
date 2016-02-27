const dotenv = require('dotenv');
const request = require('request');
const Promise = require('promise');

dotenv.load();

var cachedVideos = null;

module.exports.getAll = function() {

  return new Promise((resolve, reject) => {
    if(cachedVideos && cachedVideos.length > 0) {
      resolve(cachedVideos);
    } else {
      request.get(process.env.YOUTUBE_API_URL, (error, response, body) => {
        const youtubeVideos = [];
        if (!error && response.statusCode == 200) {
          const videos = JSON.parse(body).items;
          if(videos && videos.length) {
            for(var i=0; i<videos.length; i++) {
              var videoId = videos[i].contentDetails.videoId;
              var videoUrl = `${process.env.YOUTUBE_BASE_URL}${videoId}`;
              youtubeVideos.push({url: videoUrl, id: videoId});
            }
          }
          cachedVideos = youtubeVideos;
          resolve(youtubeVideos);
        } else {
          reject(body);
        }
      });
    }

  });
}
