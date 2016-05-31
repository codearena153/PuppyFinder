/* Configures individual table field's weight */
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

  // Only accepts the maximum initial cost & maintenance
  INIT_COST: {
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

/* Return total weight based on user input data */
exports.calculateTotalWeight = function(data) {
  var total_weight = 0;

  switch (data.allergic) {
    case 'false':
      total_weight += weightTbl.ALLERGIC.nope;
      break;
    case 'true':
      total_weight += weightTbl.ALLERGIC.yeap;
      break;
  }

  switch (data.absent) {
    case 'false':
      total_weight += weightTbl.ABSENT.nope;
      break;
    case 'true':
      total_weight += weightTbl.ABSENT.yeap;
      break;
  }

  switch (data.active) {
    case 'false':
      total_weight += weightTbl.ACTIVE.nope;
      break;
    case 'true':
      total_weight += weightTbl.ACTIVE.yeap;
      break;
  }

  switch (data.single) {
    case 'false':
      total_weight += weightTbl.SINGLE.nope;
      break;
    case 'true':
      total_weight += weightTbl.SINGLE.yeap;
      break;
  }

  switch (data.friendly) {
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

  switch (data.inside) {
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

  switch (data.initialCost) {
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

  switch (data.maintenance) {
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
      total_weight += weightTbl.MAINTENANCE.MC_30;
      break;
  }

  return total_weight;
};

/* Set weight for individual fields and return total weight */
exports.setWeight = function(puppy) {
  switch(puppy.isUserAllergic.allergic) {
    case "false":
      puppy.isUserAllergic.weight = weightTbl.ALLERGIC.nope;
      break;
    case "true":
      puppy.isUserAllergic.weight = weightTbl.ALLERGIC.yeap;
      break;
  }

  switch(puppy.isUserAbsent.absent) {
    case "false":
      puppy.isUserAbsent.weight = weightTbl.ABSENT.nope;
      break;
    case "true":
      puppy.isUserAbsent.weight = weightTbl.ABSENT.yeap;
      break;
  }

  switch(puppy.isUserActive.active) {
    case "false":
      puppy.isUserActive.weight = weightTbl.ACTIVE.nope;
      break;
    case "true":
      puppy.isUserActive.weight = weightTbl.ACTIVE.yeap;
      break;
  }

  switch(puppy.isUserSingle.single) {
    case "false":
      puppy.isUserSingle.weight = weightTbl.SINGLE.nope;
      break;
    case "true":
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

    console.log("puppy.isUserAllergic.weight: ", puppy.isUserAllergic.weight);
    console.log("puppy.isUserAbsent.weight: ", puppy.isUserAbsent.weight);
    console.log("puppy.isUserActive.weight: ", puppy.isUserActive.weight);
    console.log("puppy.isUserSingle.weight: ", puppy.isUserSingle.weight);
    console.log("puppy.isPuppyFriendly.weight:  ", puppy.isPuppyFriendly.weight);
    console.log("puppy.isPuppyInside.weight: ", puppy.isPuppyInside.weight);
    console.log("puppy.initialCost.weight: ", puppy.initialCost.weight);
    console.log("puppy.initialCost.cost: ", puppy.initialCost.cost);
    console.log("puppy.maintenance.weight: ", puppy.maintenance.weight);

  // Return total sum
  return puppy.isUserAllergic.weight +
         puppy.isUserAbsent.weight +
         puppy.isUserActive.weight +
         puppy.isUserSingle.weight +
         puppy.isPuppyFriendly.weight +
         puppy.isPuppyInside.weight +
         puppy.initialCost.weight +
         puppy.maintenance.weight;
};

exports.sortArray = function(total_weight, array) {
  var arr = [];

  for (var i = 0; i < array.length; i++) {
    var tmp = [];
    tmp.push(array[i]);
    tmp.push(Math.abs(total_weight - array[i].total_weight));
    arr.push(tmp);
  }

  arr.sort(function(a, b) {
    if (a[1] > b[1]) {
      return 1;
    } else {
      return -1;
    }
  });

  var sorted = [];
  for (var i = 0; i < array.length; i++) {
    sorted[i] = arr[i][0];
  }

  return sorted;
};