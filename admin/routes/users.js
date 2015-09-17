var express = require('express');
var users = express.Router();

// accept GET request on the admin user index via users/
users.get('/', function(req, res, next) {
  res.send('Got a GET request at admin/users/');
});

// accept POST request on the admin users index via users/
users.post('/', function (req, res) {
  res.send('Got a POST request at admin/users/');
});

// accept GET request on the admin users add via users/add
users.get('/add', function(req, res, next) {
  res.send('Got a GET request at admin/users/add');
});

// accept PUT request at the admin users add via users/add
users.put('/add', function (req, res) {
  res.send('Got a PUT request at admin/users/add');
});

// accept DELETE request at the admin users delete via users/delete
users.delete('/delete', function (req, res) {
  res.send('Got a DELETE request at admin/users/delete');
});

module.exports = users;
