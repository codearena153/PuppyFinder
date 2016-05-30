var express = require('express');
var bodyParser = require('body-parser');
var url = require('url');
var path = require('path');
var request = require('request');
var Puppy = require('./db/Puppy.model');

var app = express();
app.set('port', process.env.PORT || 8888);

/* Initialize DB */
var initDB = require('./config/init');
initDB();

// helper functions
var calculateTotalWeight = require('./config/helpers.js').calculateTotalWeight;
var setWeight = require('./config/helpers').setWeight;
var sortArray = require('./config/helpers').sortArray;

// Static files load
app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/admin'));
app.use(express.static(__dirname + '/db/images'));

/* Handle request.body, request.params */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/*
 * Routing Setup
 * Serves static files
 */
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

/* Handles CRUD operations */
/* GET all puppies in DB */
app.get('/puppies', function(req, res) {
  Puppy.find().sort({ total_weight: -1 })
  .exec(function(err, puppy) {
    if (err) {
      res.send('cannot retrieve data from DB');
    } else {
      res.send(puppy);
    }
  });
});

/* GET specific puppy in DB, where breed is breed */
app.get('/puppies/:breed', function(req, res) {
  var breed = req.params.breed;

  Puppy.findOne({breed: breed})
  .exec(function(err, puppy) {
    if (err) {
      res.send("cannot retreive " + breed);
    } else {
      res.send(puppy);
    }
  });
});

/* DELETE a puppy whose breed is breed */
app.delete('/puppies/:breed', function(req, res) {
  var breed = req.params.breed;

  console.log('To be deleted: ', breed);

  Puppy.remove({breed: breed}, function(err) {
    if (err) {
      console.log('fail to delete' + breed);
    } else {
      Puppy.find().sort({ total_weight: -1 })
      .exec(function(err, puppy) {
        if (err) {
          res.send("cannot retrieve data from DB");
        } else {
          res.send(puppy);
        }
      });
    }
  });
});


/* UPDATE a new puppy into puppy DB */
app.put('/puppies/:id', function(req, res) {
  Puppy.findById(req.params.id, function(err, puppy) {
    if (err) {
      console.error("Cannot update ", req.params.id);
      return null;
    }

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
    puppy.total_weight = setWeight(puppy);

    puppy.save(function(err, puppy) {
      if (err) {
        console.log("Cannot save", puppy);
      } else {
        console.log('Updated puppy: ', puppy);
        Puppy.find().sort({ total_weight: -1 })
          .exec(function(err, ppy) {
            if (err) {
              res.send('Cannot retrieve data from DB');
            } else {
              res.send(ppy);
            }
          });
      }
    });
  });
});

/* SEARCH and RETURN three matching puppies */
app.get('/search', function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  var puppy = new Puppy();

  puppy.isUserAllergic.allergic = query.allergic;
  puppy.isUserAbsent.absent = query.absent;
  puppy.isUserActive.active = query.active;
  puppy.isUserSingle.single = query.single;
  puppy.isPuppyFriendly.friendly = query.friendly;
  puppy.isPuppyInside.inside = query.inside;
  puppy.initialCost.cost = "" + query.initialCost;
  puppy.maintenance.cost = "" + query.maintenance;
  puppy.total_weight = setWeight(puppy);

  console.log("/search >>>>>>>>>>>>>>>>>>>>>>>>> Receieved req: ", query);
  console.log("user data's total weight: ", puppy.total_weight);

  var array;

  Puppy.find()
  .exec(function(err, puppies) {
      if (err) res.send('cannot retrieve data from DB');
      else {
        array = puppies;
        var sorted = sortArray(puppy.total_weight, array);
        var matched = sorted.slice(0, 3);

        // Increase num_selected for each matching puppy
        for (var i = 0 ; i < 3; i++) {
          var matchedPuppy = matched[i];
          matchedPuppy.num_selected++;
          matchedPuppy.save();
        }

        res.send(matched);
      }
  });
});

/*
 * SHOWS the result after admin user INSERTS puppy data via admin page
 * The reason POST is used is that we want to hide parameters at the end of url
 */
app.post('/result', function(req, res) {
    var puppy = new Puppy();

    // Create a new db document
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
    puppy.total_weight = setWeight(puppy);

    puppy.save(function(err, puppy) {
      if (err)  res.send("error saving new puppy");
      else {
        res.send(puppy);
      }
    });
});

app.get('/daum', function(req, res){
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  // console.log(query);
  request({
    method: 'GET',
    url: encodeURI('https://apis.daum.net/search/image?apikey=0a82237676f6eb236ee760a0912ec05f&q='+query.q+'&result=20&output=json')
    // url: encodeURI('https://www.googleapis.com/customsearch/v1?q='+query.q +'&cx=007711437540587242288%3A1tx-m0h4ejq&imgType=photo&searchType=image&key=AIzaSyAIrtttKYKEIsLA1sdftk50R3xj3a5krvM')
  }, function(error, response, body){
    if(error){
      // console.log(error);
      res.send(404);
    } else {
    // console.log('BODY', body);
    res.send(body);
  }
  });
});

app.listen(app.get('port'), function() {
    console.log("Express started on http://localhost:" +
        app.get('port') + '; press Ctrl-C to terminate.');
});
