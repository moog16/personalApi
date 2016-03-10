const dotenv = require('dotenv');
const request = require('request');
const Promise = require('promise');
const tumblr = require('tumblr.js');

var client;
var cachedDinnerBlog = null;

dotenv.load();


module.exports.authenticate = function() {
  // Authenticate via OAuth
  client = tumblr.createClient({
    consumer_key: process.env.TUMBLR_CONSUMER_KEY,
    consumer_secret: process.env.TUMBLR_CONSUMER_SECRET,
    token: process.env.TUMBLR_TOKEN,
    token_secret: process.env.TUMBLR_TOKEN_SECRET
  });
}

module.exports.get52DinnerBlog = function() {
  return new Promise((resolve, reject) => {
    if(cachedDinnerBlog && cachedDinnerBlog.length > 0) {
      resolve(cachedDinnerBlog);
    } else {
      client.posts('52dinners.tumblr.com', { type: 'text', limit: 3 }, function (err, blog) {
        cachedDinnerBlog = blog;
        resolve(blog);
      });
    }
  });
}

module.exports.isAuthenticated = function() {
  return !!client;
}
