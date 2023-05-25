// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// Route handler for the "/api/whoami" endpoint
app.get("/api/whoami", function (req, res) {
  // Retrieve the IP address from the request headers
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // Retrieve the preferred language from the request headers
  var lang = req.headers["accept-language"];

  // Retrieve the software information from the request headers
  var software = req.headers["user-agent"];

  // Construct a JSON object with the retrieved information
  // using the specified keys: ipaddress, language, and software
  res.json({
    ipaddress: ip,
    "language": lang,
    "software": software
  });
});



// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
