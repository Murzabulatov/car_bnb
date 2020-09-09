const mongoose = require('mongoose');

const {
  DB_PATH,
  DB_NAME,
} = process.env;

const dbConnect = () => {
  mongoose.connect(`${DB_PATH}${DB_NAME}`, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if (err) throw err;
    console.log('Db connection success');
  });
};

module.exports = dbConnect;
