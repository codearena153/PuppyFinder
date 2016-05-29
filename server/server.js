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
  console.log('getting ' + req.params.breed);
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

  console.log('in put, id is: ', req.params.id);

  //var puppy = new Puppy();

  Puppy.findById(req.params.id, function(err, puppy) {
    if (err) {
      console.log("Can't update", id);
      return;
    }

    var ppy = new Puppy();

    var total_weight = 0;

    console.log('2222222request body >>>>', req.body);
    console.log('2222222results of findById -----', puppy);

    puppy.breed = req.body.breed;
    puppy.description = req.body.description;
    puppy.image = req.body.image;
    puppy.isUserAllergic.allergic = req.body.isUserAllergic.allergic;
    puppy.isUserAbsent.absent = req.body.isUserAbsent.absent;
    puppy.isUserActive.active = req.body.isUserActive.active;
    puppy.isUserSingle.single = req.body.isUserSingle.single;
    puppy.isPuppyFriendly.friendly = req.body.isPuppyFriendly.friendly;
    puppy.isPuppyInside.inside = req.body.isPuppyInside.inside;
    puppy.initialCost.cost = req.body.initialCost.cost;
    puppy.maintenance.cost = req.body.maintenance.cost;

    // set weight based on changed value and calculate total weigh


    switch (puppy.isUserAllergic.allergic) {
      case 'false':
        puppy.isUserAllergic.weight = 0;
        total_weight += 0;
        break;
      case 'true':
        puppy.isUserAllergic.weight = 1;    
        total_weight += 1;
        break;
    }

    switch (puppy.isUserAbsent.absent) {
      case 'false':
        puppy.isUserAbsent.weight = 0;
        total_weight += 0;
        break;
      case 'true':
        puppy.isUserAbsent.weight = 1;
        total_weight += 1;
        break;
    }

    switch (puppy.isUserActive.active) {
      case 'false':
        puppy.isUserActive.weight = 0;
        total_weight += 0;
        break;
      case 'true':
        puppy.isUserActive.weight = 1;
        total_weight += 1;
        break;
    }

    switch (puppy.isUserSingle.single) {
      case 'false':
        puppy.isUserSingle.weight = 0;
        total_weight += 0;
        break;
      case 'true':
        puppy.isUserSingle.weight = 1;
        total_weight += 1;
        break;
    }

    switch (puppy.isPuppyFriendly.friendly) {
      case 'false':
        puppy.isPuppyFriendly.weight = 0;
        total_weight += 0;
        break;
      case 'true':
        puppy.isPuppyFriendly.weight = 1;
        total_weight += 1;
        break;
      case 'default':
        puppy.isPuppyFriendly.weight = 2;
        total_weight += 2;
    }

    switch (puppy.isPuppyFriendly.inside) {
      case 'false':
        puppy.isPuppyFriendly.weight = 0;
        total_weight += 0;
        break;
      case 'true':
        puppy.isPuppyFriendly.weight = 1;
        total_weight += 1;
        break;
      case 'default':
        puppy.isPuppyFriendly.weight = 2;
        total_weight += 2;
    }

    switch (puppy.initialCost.cost) {
      case 10:
        puppy.initialCost.weight = 1;
        total_weight += 1;
        break;
      case 20:
        puppy.initialCost.weight = 2;
        total_weight += 2;
        break;
      case 30:
        puppy.initialCost.weight = 3;
        total_weight += 3;
        break;
      case 50:
        puppy.initialCost.weight = 5;
        total_weight += 5;
        break;
      case 100:
        puppy.initialCost.weight = 10;
        total_weight += 10;
        break;
      case 150:
        puppy.initialCost.weight = 15;
        total_weight += 15;
        break;
    }

    switch (puppy.maintenance.cost) {
      case 5:
        puppy.maintenance.weight = 1;
        total_weight += 1;
        break;
      case 10:
        puppy.maintenance.weight = 2;
        total_weight += 2;
        break;
      case 15:
        puppy.maintenance.weight = 3;
        total_weight += 3;
        break;
      case 20:
        puppy.maintenance.weight = 4;
        total_weight += 4;
        break;
      case 25:
        puppy.initialCost.weight = 5;
        total_weight += 5;
        break;
      case 30:
        puppy.initialCost.weight = 6;
        total_weight += 6;
        break;
    }
 
    console.log("total_weight is", total_weight);
    puppy.total_weight = total_weight;

    puppy.save(function(err, puppy) {
      if (err) {
        console.log("Can't save", puppy);
      } else {
        console.log('updated puppy >>>>>>>>>', puppy);
        //res.send(puppy);
          Puppy.find().sort({ total_weight: -1 })
          .exec(function(err, ppy) {
            if (err) res.send('cannot retrieve data from DB');
            else {
              //console.log(ppy);
              res.send(ppy);
            }
          });
      }
    })


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

    console.log('>>>>>>>> in result >>>>>>', req.body);

    // create a new db document
    puppy.breed = req.body.breed;
    puppy.description = req.body.description;
    puppy.image = req.body.image;
    puppy.isUserAllergic.allergic = req.body.isUserAllergic.allergic;
    puppy.isUserAbsent.absent = req.body.isUserAbsent.absent;
    puppy.isUserActive.active = req.body.isUserActive.active;
    puppy.isUserSingle.single = req.body.isUserSingle.single;
    puppy.isPuppyFriendly.friendly = req.body.isPuppyFriendly.friendly;
    puppy.isPuppyInside.inside = req.body.isPuppyInside.inside;
    puppy.initialCost.cost = req.body.initialCost.cost;
    puppy.maintenance.cost = req.body.maintenance.cost;
    puppy.total_weight = addWeight(puppy);

    //console.log("created puppy: ", puppy);

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
