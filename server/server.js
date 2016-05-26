var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var Puppy = require('./db/Puppy.model');
var db = 'mongodb://localhost/puppy';
var calculateTotalWeight = require('./config/helpers.js').calculateTotalWeight;
var addWeight = require('./config/helpers.js').addWeight;

var app = express();
app.set('port', process.env.PORT || 8888);

// Connects mongo DB
mongoose.connect(db);

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
  })  
})

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

  })
})


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
      })
    }
  })
})


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
    //console.log('description: ', req.body.description)
    // puppy.breed = req.body.breed;
    // puppy.description = req.body.description;
    // puppy.isUserAllergic.allergice = req.body.
    // puppy.size.size = req.body.size.size;
    // puppy.taste.taste = req.body.taste.taste;
    // puppy.fur.fur = req.body.fur.fur;
    // puppy.color.color = req.body.color.color;
    // puppy.guard.guard = req.body.guard.guard;
    // puppy.athletic.athletic = req.body.athletic.athletic;
    // puppy.affinity.affinity = req.body.affinity.affinity;
    // puppy.price.price = req.body.price.price;
    // puppy.cost.cost = req.body.cost.cost;
    // puppy.residence.residence = req.body.residence.residence;
    // puppy.family_size.family_size = req.body.family_size.family_size;
    // puppy.description.description = req.body.description;


    // switch (req.body.size.size) {
    //   case 'big':
    //     puppy.size.weight = 0;
    //     total_weight += 0;
    //     break;
    //   case 'medium':
    //     puppy.size.weight = 1;      
    //     total_weight += 1;
    //     break;
    //   case 'small':
    //     puppy.size.weight = 2;
    //     total_weight += 2;
    //     break;
    // }

    // switch (req.body.taste.taste) {
    //   case 'picky':
    //     puppy.taste.weight = 0;
    //     total_weight += 0;
    //     break;
    //   case 'gluttonous':
    //     puppy.taste.weight = 2;
    //     total_weight += 2;
    //     break;
    //   case 'frugal':
    //     puppy.taste.weight = 4
    //     total_weight += 4;
    //     break;
    // }

    // switch (req.body.fur.fur) {
    //   case 'much':
    //     puppy.fur.weight = 0;
    //     total_weight += 0;
    //     break;
    //   case 'medium':
    //     puppy.fur.weight = 2;
    //     total_weight += 2;
    //     break;
    //   case 'little':
    //     puppy.fur.weight = 4;
    //     total_weight += 4;
    //     break;
    // }

    // switch (req.body.color.color) {
    //   case 'white':
    //     puppy.color.weight = 0;
    //     total_weight += 0;
    //     break;
    //   case 'gray':
    //     puppy.color.weight = 1;
    //     total_weight += 1;
    //     break;
    //   case 'gold':
    //     puppy.color.weight = 2;
    //     total_weight += 2;
    //     break;
    //   case 'black':
    //     puppy.color.weight = 3;
    //     total_weight += 3;
    //     break;
    // }

    // switch (req.body.guard.guard) {
    //   case true:
    //     puppy.guard.weight = 0;
    //     total_weight += 0;
    //     break;
    //   case false:
    //     puppy.guard.weight = 1;
    //     total_weight += 1;
    //     break;    
    // }

    // switch (req.body.athletic.athletic) {
    //   case 'high':
    //     puppy.athletic.weight = 0;
    //     total_weight += 0;
    //     break;
    //   case 'medium':
    //     puppy.athletic.weight = 2;
    //     total_weight += 2;
    //     break;
    //   case 'low':
    //     puppy.athletic.weight = 4;
    //     total_weight += 4;
    //     break;
    // }

    // switch (req.body.affinity.affinity) {
    //   case 'high':
    //     puppy.affinity.weight = 0;
    //     total_weight += 0;
    //     break;
    //   case 'medium':
    //     puppy.affinity.weight = 2;
    //     total_weight += 2;
    //     break;
    //   case 'low':
    //     puppy.affinity.weight = 4;
    //     total_weight += 4;
    //     break;    
    // }

    // switch(req.body.price.price) {
    //   case 'p0-10':
    //     puppy.price.weight = 0;
    //     total_weight += 0;
    //     break;
    //   case 'p10-20':
    //     puppy.price.weight = 10;
    //     total_weight += 10;
    //     break;
    //   case 'p20-50':
    //     puppy.price.weight = 20;
    //     total_weight += 20;
    //     break;
    //   case 'p50-100':
    //     puppy.price.weight = 30;
    //     total_weight += 30;
    //     break;
    //   case 'p100-500':
    //     puppy.price.weight = 40;
    //     total_weight += 40;
    //     break;
    //   case 'p500-1000':
    //     puppy.price.weight = 50;
    //     total_weight += 50;
    //     break;
    //   case 'p1000':
    //     puppy.price.weight = 60;
    //     total_weight += 60;
    //     break;
    // } 

    // switch(req.body.cost.cost) {
    //   case 'c0-10':
    //     puppy.cost.weight = 0;
    //     total_weight += 0;
    //     break;
    //   case 'c10-20':
    //     puppy.cost.weight = 10;
    //     total_weight += 10;
    //     break;
    //   case 'c20-30':
    //     puppy.cost.weight = 20;
    //     total_weight += 20;
    //     break;
    //   case 'c30-50':
    //     puppy.cost.weight = 30;
    //     total_weight += 30;
    //     break;
    //   case 'c50-100':
    //     puppy.cost.weight = 40;
    //     total_weight += 40;
    //     break;
    //   case 'c100':
    //     puppy.cost.weight = 50;
    //     total_weight += 50;
    //     break;
    // }


    // switch(req.body.residence.residence) {
    //   case 'inside':
    //     puppy.residence.weight = 0;
    //     total_weight += 0;
    //     break;
    //   case 'outside':
    //     puppy.residence.weight = 1;
    //     total_weight += 1;
    //     break;
    // }

    // switch(req.body.family_size.family_size) {
    //   case 'f1':
    //     puppy.family_size.weight = 1;
    //     total_weight += 1;
    //     break;
    //   case 'f2':
    //     puppy.family_size.weight = 2;
    //     total_weight += 2;
    //     break;
    //   case 'f3':
    //     puppy.family_size.weight = 3;
    //     total_weight += 3;
    //     break;
    //   case 'f4':
    //     puppy.family_size.weight = 4;
    //     total_weight += 4;
    //     break;
    //   case 'f5':
    //     puppy.family_size.weight = 5;
    //     total_weight += 5;
    //     break;
    // }    
    //console.log("total_weight is", total_weight);
    puppy.total_weight = total_weight;
    //console.log('updated puppy >>>>>>>>>', puppy);
    res.send(puppy);
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

  //console.log('in put, value of breed is', req.body.breed);

})




app.post('/search', function(req, res) {

    var total_weight = calculateTotalWeight(req.body);

    console.log("user data's total weight", total_weight);

    var array;

    Puppy.find()
    // .sort({ total_weight: -1 })
    .exec(function(err, puppies) {
        if (err) res.send('cannot retrieve data from DB');
        else {
          array = puppies;
          sortArray(total_weight, array);
          //console.log(puppy);
          res.send(array.slice(0, 3));
          //console.log(puppy.breed, puppy.total_weight);
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