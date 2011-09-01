var repl = require("repl");
var net = require("net");

var session = repl.start("> ");
session.rli.on('close', function() {
  console.log('Quitting REPL');
  process.exit(0);
});

session.context.help = function() {
  console.log('I am nacho!');
};

net.createServer(function (socket) {
  socket.on('data', function(data) {
    session.rli._normalWrite(data);
    console.log(data.toString('utf8'));
    socket.end();
  });
}).listen(5001);

