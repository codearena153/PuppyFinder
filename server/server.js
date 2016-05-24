var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var Puppy = require('./db/Puppy.model');
var db = 'mongodb://localhost/puppy';

var app = express();
app.set('port', process.env.PORT || 8888);

// Connects mongo DB
mongoose.connect(db);

// Middleware loads
app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/admin'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

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

app.post('/result', function(req, res) {
    var puppy = new Puppy();

    // create a new db document
    puppy.breed = req.body.breed;
    puppy.description = req.body.description;
    puppy.image = req.body.image;
    puppy.isUserAllergic.absent = req.body.allergic;
    puppy.isUserAbsent.absent = req.body.absent;
    puppy.isUserActive.active = req.body.active;
    puppy.isUserSingle.single = req.body.single;
    puppy.isPuppyFriendly.friendly = req.body.friendly;
    puppy.isPuppyInside.inside = req.body.inside;
    puppy.initialCost.min = req.body.initial_min;
    puppy.initialCost.max = req.body.initial_max;
    puppy.maintenance.cost = req.body.maintenance;

    puppy.save(function(err, puppy) {
      if (err)  res.send("error saving new puppy");
      else {
        console.log(puppy);
        res.send(puppy);
      }
    });
});

app.listen(app.get('port'), function() {
    console.log("Express started on http://localhost:" +
        app.get('port') + '; press Ctrl-C to terminate.');
});