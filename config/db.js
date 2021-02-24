const mongoose = require('mongoose');



const connectDB = async () => {

    let connectionUri = process.env.MONGO_URI;
    
    if(process.env.NODE_ENV === 'testing'){
        connectionUri = process.env.MONGO_URI_TEST;
    } 

    const conn = await mongoose.connect(connectionUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    if(process.env.NODE_ENV != 'testing'){
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
    } 
    
    
};

module.exports = connectDB;