#!/usr/bin/env node
var args = process.argv;
var eol = require('os').EOL;
var http = require('@thecoder08/http');
var fs = require('fs');
var prompt = require('@thecoder08/prompt');
if (args[2] == 'server') {
  http.server(args[3], function(req, res, redirect) {
    fs.readFile(req.pathname, function(err, data) {
      if (err) {
        res(404, 'text/plain', '404 not found');
      }
      else {
        res(200, 'application/octet-stream', data);
      }
    });
  });
}
else if (args[2] == 'client') {
  prompt.interface('Enter a file to request: ', function(data) {
    var filename = data.toString();
    http.request({
      hostname: args[3],
      port: args[4],
      path: data.toString().split(eol)[0]
    }, function(data) {
      fs.writeFile(filename.split(eol)[0].split('/')[filename.split('/').length - 1], data, function(err) {
        if (err) {
          console.log('Error writing file!');
        }
      });
    });
  });
}
