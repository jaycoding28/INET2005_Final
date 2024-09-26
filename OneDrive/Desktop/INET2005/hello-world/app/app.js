// importing modules
var http = require('http');
var myModule = require('./myfirstmodule');

// hello world

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html'});

  //res.write('hello world');

  // Write some text in the response
	res.write("<h1>" + myModule.sayHello() + "</h1>");
	res.write("<p>The date and time are currently: " + myModule.getDateTime() + "</p>");

  res.end();
}).listen(3000);