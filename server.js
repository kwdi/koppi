const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


// Load env vars
dotenv.config({path: './config/config.env'});

// Connect to database
connectDB();

// Route files
const links = require('./routes/links');
const auth = require('./routes/auth');


const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cookie parser
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Dev logging middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

if(process.env.NODE_ENV != 'testing') {

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 500
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

};
// Enable CORS
app.use(cors({credentials: true, origin: true}));

// Set static folder
app.use(express.static('public'))


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Mount routers
app.use('/', links);
app.use('/auth', auth);


app.use(errorHandler);

const PORT = process.env.PORT || 5000;


const server = app.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    )
  );

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    server.close(() => process.exit(1));
  });  

module.exports = app; // for testing
