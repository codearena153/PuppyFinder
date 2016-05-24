var express = require('express');

var app = express();
app.set('port', process.env.PORT || 8888);

// so that broswer can locate index.html inside client folder
app.use(express.static(__dirname + '/client'));

app.get('/', function(req, res) {
    res.type('text/plain');
    res.send("intro loaded!");
});

app.get('/admin', function(req, res) {
    res.sendFile(__dirname + '/admin/admin.html');
});

app.get('/upload', function(req, res) {
    res.sendFile(__dirname + '/admin/upload.html');
});

app.get('/update', function(req, res) {
    res.sendFile(__dirname + '/admin/update.html');
});

app.get('/stat', function(req, res) {
    res.sendFile(__dirname + '/admin/stat.html');
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