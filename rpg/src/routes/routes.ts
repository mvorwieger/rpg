var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// parse application/json
app.use(bodyParser.json())

// Get Player Information info
app.get('/me',function (req, res) {
    res.send("get me")
})
// Create Player Route
app.post('/me', function (req, res) {
});

app.get('/me/items', function (req, res) {
});

