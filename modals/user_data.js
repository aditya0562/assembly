const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id_str: {
    type: Number
  },

  name: {
    type: String
  },

  location: {
    type: String
  },

  url: {
    type: String
  },

  status: Schema.Types.Mixed

});

module.exports = mongoose.model('User', UserSchema);
