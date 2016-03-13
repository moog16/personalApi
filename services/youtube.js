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
              var id = videos[i].contentDetails.videoId;
              var url = `${process.env.YOUTUBE_BASE_URL}${id}`;
              var title = videos[i].snippet.title;
              var description = videos[i].snippet.description;
              youtubeVideos.push({
                url,
                id,
                title,
                description});
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
