var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PuppySchema = new Schema({

  // Default data
  breed: String,
  description: String,
  image: String,
  created_at: {
    type: Date,
    default: Date.now
  },

  // User info
  // Notice that user data only accepts boolean type
  isUserAllergic: {
    allergic: Boolean,
    weight: Number
  },
  isUserAbsent: {
    absent: Boolean,
    weight: Number
  },
  isUserActive : {
    active: Boolean,
    weight: Number
  },
  isUserSingle: {
    single: Boolean,
    weight: Number
  },

  // Puppy info
  isPuppyFriendly: {
    friendly: String,
    weight: Number
  },
  isPuppyInside: {
    inside: String,
    weight: Number
  },
  initialCost: {
    min: Number,
    max: Number,
    weight: Number
  },
  maintenance: {
    cost: Number,
    weight: Number
  },

  // For statistics
  total_weight: Number,
  num_selected: {
    type: Number,
    default: 0
  }

  // size: {
  //   size: String,
  //   weight: Number
  // },
  // taste: {
  //   taste: String,
  //   weight: Number
  // },
  // cost: {
  //   cost: String,
  //   weight: Number
  // },
  // residence: {
  //   residence: String,
  //   weight: Number
  // },
  // family_size: {
  //   family_size: String,
  //   weight: Number
  // },
  // affinity: {
  //   affinity: String,
  //   weight: Number
  // },
  // price: {
  //   price: String,
  //   weight: Number
  // },
  // color: {
  //   color: String,
  //   weight: Number
  // },
  // guard: {
  //   guard: Boolean,
  //   weight: Number
  // },
  // athletic: {
  //   athletic: String,
  //   weight: Number
  // },

}, {
  collection: 'puppies'
});

module.exports = mongoose.model('Puppy', PuppySchema);
