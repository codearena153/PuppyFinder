var express = require('express');
// var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var url = require('url');
var path = require('path');
var request = require('request');
var Puppy = require('./db/Puppy.model');
// var db = 'mongodb://localhost/puppy';
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

    console.log("/search - Receieved req: ", req);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", req.body);
    var total_weight = calculateTotalWeight(req.body);

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

app.get('/tweets', function(req, res){
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  console.log(query);

  var oauthToken;

  request.post({
    url: "https://api.twitter.com/oauth2/token",
    headers: {
      'Authorization': 'Basic ' + query.token,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: 'grant_type=client_credentials'
    }, function(err, res, body){
      console.log('BODY', body);
      console.log('RES', res);
    });
  // $http.post({
  //   method: 'POST',
  //   url:'https://api.twitter.com/oauth2/token',
  //   headers: {
      // 'Authorization': 'Basic ' + encodedToken,
      // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  //   },
  //   data: {
  //     'grant_type': 'client_credentials'
  //   },
  // }).then(function(resp){
  //     console.log(resp);
  //     aouthToken= resp;
  //   }, function(err){
  //     if(err) return err;
  // });
  //
  // var url = 'https://api.twitter.com/1.1/search/tweets.json?'+
  // 'q='+ hashtag +
  // '%20filter%3Aimages' +
  // '&result_type=' + 'recent';
  //
  // return $http({
  //   method: 'GET',
  //   url: url,
  //   headers: {
  //     'Authorization': 'Bearer '+ aouthToken,
  //
  //   },
  //   data: {count: 12}
  // })
  // .then(function(resp){
  //     console.log(resp);
  //     return resp;
  //   }, function(err){
  //     if(err) return err;
  //   });
  res.send(query);
});

app.listen(app.get('port'), function() {
    console.log("Express started on http://localhost:" +
        app.get('port') + '; press Ctrl-C to terminate.');
});
