const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Link = require('./models/Link');


// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });


// Delete data
const deleteData = async () => {
    try {
      await Link.deleteMany();
      console.log('Data Destroyed...'.red.inverse);
      process.exit();
    } catch (err) {
      console.error(err);
    }
  };
  
  if (process.argv[2] === '-d') {
    deleteData();
  } else {
      console.log('Use argument -d to clean the db'.cyan.inverse);
      process.exit();
  }