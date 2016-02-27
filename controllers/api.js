const getVideos = require('../services/youtube').getAll;

module.exports.getYoutubeVideos = (req, res) => {
  getVideos()
    .then(videos => res.send(videos))
    .catch(error => res.send(error));
}
