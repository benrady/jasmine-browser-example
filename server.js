#!/usr/bin/env node
var express = require('express'),
    server = express.createServer();

process.on('uncaughtException', function (err) {
  logger.error('Uncaught exception: ' + err.stack);
});

server.configure(function() {
  server.set('view cache', false);
  server.use(express.static('public'));
});

server.listen(8080);
