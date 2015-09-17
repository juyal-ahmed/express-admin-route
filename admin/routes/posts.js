var express = require('express');
var posts = express.Router();

// accept GET request on the admin post index via posts/
posts.get('/', function(req, res, next) {
  res.send('Got a GET request at admin/posts/');
});

// accept POST request on the admin posts index via posts/
posts.post('/', function (req, res) {
  res.send('Got a POST request at admin/posts/');
});

// accept GET request on the admin posts add via posts/add
posts.get('/add', function(req, res, next) {
  res.send('Got a GET request at admin/posts/add');
});

// accept PUT request at the admin posts add via posts/add
posts.put('/add', function (req, res) {
  res.send('Got a PUT request at admin/posts/add');
});

// accept DELETE request at the admin posts delete via posts/delete
posts.delete('/delete', function (req, res) {
  res.send('Got a DELETE request at admin/posts/delete');
});

module.exports = posts;
