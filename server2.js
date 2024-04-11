/**
 * Module dependencies.
 */

var app = require("./app");
var http = require("http");
require("dotenv").config();
require("./db");

var port = process.env.PORT || "3348";

var server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is listening at : http://localhost:${port}`);
});

// "start": "node ./bin/www"
