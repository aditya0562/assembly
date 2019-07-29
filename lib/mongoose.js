const mongoose = require('mongoose');
const bluebird = require('bluebird');

function connect(cb) {
  mongoose.Promise = bluebird;
  const uri = "mongodb+srv://aditya:assembly@cluster0-ba0sp.mongodb.net/test?retryWrites=true&w=majority";
  const options = {
    server: {
      poolSize: 5
    }
  }
  const db = mongoose.connect(uri, (err) => {
    if (err) {
      console.log(err);
    } else {
      if (cb) cb(db);
    }
  });
}
module.exports = { connect };
