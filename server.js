var express = require('express');

var app = express();
app.set('port', process.env.PORT || 8888);

// so that broswer can locate index.html inside client folder
app.use(express.static(__dirname + '/client'));

app.get('/', function(req, res) {
    res.type('text/plain');
    res.send("intro loaded!");
});

app.get('/intro', function(req, res) {
    res.type('text/plain');
    res.send("intro loaded!");
});

app.get('/survey', function(req, res) {
    res.type('text/plain');
    res.send('questions loaded!');
});

app.get('/result', function(req, res) {
    res.type('text/plain');
    res.send('result loaded!');
});

// app.use(function(req, res) {
//     res.type('text/plain');
//     res.status(404);
//     res.send('404 - Not Found');
// });

app.listen(app.get('port'), function() {
    console.log("Express started on http://localhost:" +
        app.get('port') + '; press Ctrl-C to terminate.');
});