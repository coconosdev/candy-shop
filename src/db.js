const mongoose = require('mongoose');

const URI = 'mongodb://todo:abraxas18@ds221258.mlab.com:21258/abraxas-test';

mongoose.connect(URI, { useNewUrlParser: true })
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err));

module.exports = mongoose;