var express = require('express');
// var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var url = require('url');
var path = require('path');
var request = require('request');
// var rp = require('request-promise');

var Puppy = require('./db/Puppy.model');
// var db = 'mongodb://localhost/puppy';
// var cheerio = require('cheerio');
var calculateTotalWeight = require('./config/helpers.js').calculateTotalWeight;
var addWeight = require('./config/helpers').addWeight;
var sortArray = require('./config/helpers').sortArray;
var initDB = require('./config/init');

// drop collection and add insert new puppy documents into local DB
initDB();

var app = express();
app.set('port', process.env.PORT || 8888);

// Middleware loads
app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/admin'));
app.use(express.static(__dirname + '/db/images'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Set up routes

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

app.get('/remove', function(req, res) {
    res.sendFile(__dirname + '/admin/remove.html');
});

app.get('/stat', function(req, res) {
    res.sendFile(__dirname + '/admin/stat.html');
});

app.get('/puppies', function(req, res) {
  console.log('getting all puppies');

  Puppy.find().sort({ total_weight: -1 })
  .exec(function(err, puppy) {
    if (err) res.send('cannot retrieve data from DB');
    else {

      //console.log(puppy);
      res.send(puppy);
      //console.log(puppy.breed, puppy.total_weight);
    }
  });
});

app.get('/puppies/:breed', function(req, res) {
  console.log('getting ' + breed);
  var breed = req.params.breed;

  Puppy.findOne({breed: breed})
  .exec(function(err, puppy) {
    if (err) res.send("can't retreive " + breed);
    else {
      console.log(puppy);
      res.send(puppy);
    }
  });
});


app.delete('/puppies/:breed', function(req, res) {
  var breed = req.params.breed;

  console.log('in delete, value of breed is', breed);

  Puppy.remove({breed: breed}, function(err) {
    if (err) {
      console.log('fail to remove' + breed);
    } else {
      Puppy.find().sort({ total_weight: -1 })
      .exec(function(err, puppy) {
        if (err) res.send("can't retrieve data from DB");
        else {
          res.send(puppy);
        }
      });
    }
  });
});


app.put('/puppies/:id', function(req, res) {

  console.log('in put', req.params.id);

  //var puppy = new Puppy();

  console.log('---- id is ----- ', req.params.id);
  //console.log('request body >>>>', req.body);

  Puppy.findById(req.params.id, function(err, puppy) {
    if (err) {
      console.log("Can't update", id);
      return;
    }
    console.log('request body >>>>', req.body);
    var total_weight = 0;
    console.log('results of findById -----', puppy);

    puppy.total_weight = total_weight;
    //console.log('updated puppy >>>>>>>>>', puppy);
    /*
    puppy.save(function(err) {
      if (err) {
        console.log("Can't save", id);
      } else {
        console.log('updated puppy >>>>>>>>>', puppy);
        res.send(puppy);
      }
    })
    */
  });
});

app.get('/search', function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

    console.log("/search >>>>>>>>>>>>>>>>>>>>>>>>> Receieved req: ", query);
    var total_weight = calculateTotalWeight(query);

    // console.log("user data's total weight", total_weight);

    var array;

    Puppy.find()
    // .sort({ total_weight: -1 })
    .exec(function(err, puppies) {
        if (err) res.send('cannot retrieve data from DB');
        else {
          array = puppies;
          sortArray(total_weight, array);
          res.send(array.slice(0, 3));
        }
    });
});

app.post('/result', function(req, res) {
    var puppy = new Puppy();

    // create a new db document
    puppy.breed = req.body.breed;
    puppy.description = req.body.description;
    puppy.image = req.body.image;
    puppy.isUserAllergic.allergic = req.body.allergic;
    puppy.isUserAbsent.absent = req.body.absent;
    puppy.isUserActive.active = req.body.active;
    puppy.isUserSingle.single = req.body.single;
    puppy.isPuppyFriendly.friendly = req.body.friendly;
    puppy.isPuppyInside.inside = req.body.inside;
    puppy.initialCost.cost = req.body.initialCost;
    puppy.maintenance.cost = req.body.maintenance;
    puppy.total_weight = addWeight(puppy);

    console.log("created puppy: ", puppy);

    puppy.save(function(err, puppy) {
      if (err)  res.send("error saving new puppy");
      else {
        console.log(puppy);
        res.send(puppy);
      }
    });
});

app.get('/daum', function(req, res){
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  console.log(query);
  request({
    method: 'GET',
    url: encodeURI('https://apis.daum.net/search/image?apikey=0a82237676f6eb236ee760a0912ec05f&q='+query.q+'&result=20&output=json')
    // url: encodeURI('https://www.googleapis.com/customsearch/v1?q='+query.q +'&cx=007711437540587242288%3A1tx-m0h4ejq&imgType=photo&searchType=image&key=AIzaSyAIrtttKYKEIsLA1sdftk50R3xj3a5krvM')
  }, function(error, response, body){
    if(error){
      console.log(error);
      res.send(404);
    } else {
    console.log('BODY', body);
    res.send(body);
  }
  });
});

app.listen(app.get('port'), function() {
    console.log("Express started on http://localhost:" +
        app.get('port') + '; press Ctrl-C to terminate.');
});
