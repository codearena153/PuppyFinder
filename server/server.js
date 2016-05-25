var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var Puppy = require('./db/Puppy.model');
var db = 'mongodb://localhost/puppy';

var weightTbl = {
    ALLERGIC: {
        nope: 0,
        yeap: 1
    },
    ABSENT: {
        nope: 0,
        yeap: 1
    },
    ACTIVE: {
        nope: 0,
        yeap: 1

    },
    SINGLE: {
        nope: 0,
        yeap: 1
    },
    FRIENDLY: {
        nope: 0,
        yeap: 1,
        whatever: 2
    },
    INSIDE: {
        nope: 0,
        yeap: 1,
        whatever: 2
    },
    INIT_COST: { // weight는 최대값만 고려
        IC_10: 1,
        IC_20: 2,
        IC_30: 3,
        IC_40: 4,
        IC_50: 5,
        IC_100: 10,
        IC_150: 15
    },
    MAINTENANCE: {
        MC_5: 1,
        MC_10: 2,
        MC_15: 3,
        MC_20: 4,
        MC_25: 5,
        MC_30: 6
    }

};


var app = express();
app.set('port', process.env.PORT || 8888);

// Connects mongo DB
mongoose.connect(db);

// Middleware loads
app.use(express.static(__dirname + '/../client'));
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

app.post('/search', function(req, res) {
    // some  code

      console.log("in ask");
      console.log('request body >>', req.body);

      // first caluclate total weight
      var total_weight = 0;

      // calculating total_weight


      switch (req.body.allergic) {
        case 'false':
          total_weight += weightTbl.ALLERGIC.nope;
          break;
        case 'true':
          total_weight += weightTbl.ALLERGIC.yeap;
          break;
      }

      switch (req.body.absent) {
        case 'false':
            total_weight += weightTbl.ABSENT.nope;
            break;
        case 'true':
            total_weight += weightTbl.ABSENT.yeap;
            break;
      }

      switch (req.body.active) {
        case 'false':
            total_weight += weightTbl.ACTIVE.nope;
            break;
        case 'true':
            total_weight += weightTbl.ACTIVE.yeap;
            break;
      }

      switch (req.body.single) {
        case 'false':
            total_weight += weightTbl.SINGLE.nope;
            break;
        case 'true':
            total_weight += weightTbl.SINGLE.yeap;
            break;
      }

      switch (req.body.friendly) {
        case 'false':
            total_weight += weightTbl.FRIENDLY.nope;
            break;
        case 'true':
            total_weight += weightTbl.FRIENDLY.yeap;
            break;
        case 'default':
            total_weight += weightTbl.FRIENDLY.whatever;
            break;
      }

      switch (req.body.inside) {
        case 'false':
            total_weight += weightTbl.INSIDE.nope;
            break;
        case 'true':
            total_weight += weightTbl.INSIDE.yeap;
            break;
        case 'default':
            total_weight += weightTbl.INSIDE.whatever;
            break;
      }

      switch (req.body.initialCost) {
        case 10:
            total_weight += weightTbl.INIT_COST.IC_10;
            break;
        case 20:
            total_weight += weightTbl.INIT_COST.IC_20;
            break;
        case 30:
            total_weight += weightTbl.INIT_COST.IC_30;
            break;
        case 50:
            total_weight += weightTbl.INIT_COST.IC_50;
            break;
        case 100:
            total_weight += weightTbl.INIT_COST.IC_100;
            break;
        case 150:
            total_weight += weightTbl.INIT_COST.IC_150;
            break;
      }

      switch (req.body.maintenance) {
        case 5:
            total_weight += weightTbl.MAINTENANCE.MC_5;
            break;
        case 10:
            total_weight += weightTbl.MAINTENANCE.MC_10;
            break;
        case 15:
            total_weight += weightTbl.MAINTENANCE.MC_15;
            break;
        case 20:
            total_weight += weightTbl.MAINTENANCE.MC_20;
            break;
        case 25:
            total_weight += weightTbl.MAINTENANCE.MC_25;
            break;
        case 30:
            ptotal_weight += weightTbl.MAINTENANCE.MC_30;
            break;
      }



      console.log("user's total weight", total_weight);
      //res.send({ total_weight: total_weight });

      var array;

      Puppy.find().sort({ total_weight: -1 })
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

function sortArray(total_weight, array) {
  // total_weight와 가까운 처음 3개를 리턴
  var arr = [];
  console.log('total_weight', total_weight);
  //console.log('array', array);

  for (var i = 0; i < array.length; i++) {
    var tmp = [];
    tmp.push(array[i]);
    tmp.push(Math.abs(total_weight - array[i].total_weight));
    arr.push(tmp);
  }

  arr.sort(function(a, b) {
    if (a[1] > b[1])
      return 1;
    else
      return -1;
  })

  var sorted = [];
  for (var i = 0; i < array.length; i++)
    sorted[i] = arr[i][0];
  console.log(sorted);
  array = sorted;

}

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
    puppy.initialCost.min = req.body.initial_min;
    puppy.initialCost.max = req.body.initial_max;
    puppy.maintenance.cost = req.body.maintenance;

    puppy.total_weight = addWeight(puppy);

    // console.log('---->');
    // console.log(puppy);
    // console.log(puppy.isUserAllergic);

    puppy.save(function(err, puppy) {
      if (err)  res.send("error saving new puppy");
      else {
        console.log(puppy);
        res.send(puppy);
      }
    });
});

function addWeight(puppy) {

    switch(puppy.isUserAllergic.allergic) {
        case false:
            puppy.isUserAllergic.weight = weightTbl.ALLERGIC.nope;
            break;
        case true:
            puppy.isUserAllergic.weight = weightTbl.ALLERGIC.yeap;
            break;
    }

    switch(puppy.isUserAbsent.absent) {
        case false:
            puppy.isUserAbsent.weight = weightTbl.ABSENT.nope;
            break;
        case true:
            puppy.isUserAbsent.weight = weightTbl.ABSENT.yeap;
            break;
    }

    switch(puppy.isUserActive.active) {
        case false:
            puppy.isUserActive.weight = weightTbl.ACTIVE.nope;
            break;
        case true:
            puppy.isUserActive.weight = weightTbl.ACTIVE.yeap;
            break;
    }

    switch(puppy.isUserSingle.single) {
        case false:
            puppy.isUserSingle.weight = weightTbl.SINGLE.nope;
            break;
        case true:
            puppy.isUserSingle.weight = weightTbl.SINGLE.yeap;
            break;
    }

    switch(puppy.isPuppyFriendly.friendly) {
        case "false":
            puppy.isPuppyFriendly.weight = weightTbl.FRIENDLY.nope;
            break;
        case "true":
            puppy.isPuppyFriendly.weight = weightTbl.FRIENDLY.yeap;
            break;
        case "default":
            puppy.isPuppyFriendly.weight = weightTbl.FRIENDLY.whatever;
            break;
    }

    switch(puppy.isPuppyInside.inside) {
        case "false":
            puppy.isPuppyInside.weight = weightTbl.INSIDE.nope;
            break;
        case "true":
            puppy.isPuppyInside.weight = weightTbl.INSIDE.yeap;
            break;
        case "default":
            puppy.isPuppyInside.weight = weightTbl.INSIDE.whatever;
            break;
    }

    switch(puppy.initialCost.cost) {
        case 10:
            puppy.initialCost.weight = weightTbl.INIT_COST.IC_10;
            break;
        case 20:
            puppy.initialCost.weight = weightTbl.INIT_COST.IC_20;
            break;
        case 30:
            puppy.initialCost.weight = weightTbl.INIT_COST.IC_30;
            break;
        case 50:
            puppy.initialCost.weight = weightTbl.INIT_COST.IC_50;
            break;
        case 100:
            puppy.initialCost.weight = weightTbl.INIT_COST.IC_100;
            break;
        case 150:
            puppy.initialCost.weight = weightTbl.INIT_COST.IC_150;
            break;
    }


    switch(puppy.maintenance.cost) {
        case 5:
            puppy.maintenance.weight = weightTbl.MAINTENANCE.MC_5;
            break;
        case 10:
            puppy.maintenance.weight = weightTbl.MAINTENANCE.MC_10;
            break;
        case 15:
            puppy.maintenance.weight = weightTbl.MAINTENANCE.MC_15;
            break;
        case 20:
            puppy.maintenance.weight = weightTbl.MAINTENANCE.MC_20;
            break;
        case 25:
            puppy.maintenance.weight = weightTbl.MAINTENANCE.MC_25;
            break;
        case 30:
            puppy.maintenance.weight = weightTbl.MAINTENANCE.MC_30;
            break;
    }
    // return total sum
    return puppy.isUserAllergic.weight +
           puppy.isUserAbsent.weight +
           puppy.isUserActive.weight +
           puppy.isUserSingle.weight +
           puppy.isPuppyFriendly.weight +
           puppy.isPuppyInside.weight +
           puppy.initialCost.weight +
           puppy.maintenance.weight;

}

app.listen(app.get('port'), function() {
    console.log("Express started on http://localhost:" +
        app.get('port') + '; press Ctrl-C to terminate.');
});