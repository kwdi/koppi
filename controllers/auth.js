const User = require("../models/User");
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Register
// @route   POST /auth/register
// @acess   Public
exports.register = asyncHandler(async (req, res, next) => {
    
    const { email, password } =req.body
    
    // Create user
    const user = await User.create({
        email,
        password
    });
    
    sendTokenResponse(user, 200, res);

 });


// @desc    Login
// @route   POST /auth/login
// @acess   Public
exports.login = asyncHandler(async (req, res, next) => {
    
    const { email, password } =req.body
    
    // Validate email & password
    if(!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

    // Check for user
    const user = await User.findOne({email}).select('+password');
    
    if(!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    //Check if password matches
    const isMatch = await user.matchPassword(password);

    if(!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    sendTokenResponse(user, 200, res);

 });

// @desc    Logout user / clear cookie
// @route   GET /auth/logout
// @acess   Private
exports.logout = asyncHandler(async (req, res, next) =>{
 
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
      success: true,
      data: {}
  });
});


// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();
  
    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
    };
  
    if (process.env.NODE_ENV === 'production') {
      options.secure = true;
      options.sameSite = 'none';
    }
  
    res.status(statusCode).cookie('token', token, options).json({
      success: true,
      token,
    });
  };


// @desc    Get current logged in user
// @route   POST /auth/me
// @acess   Private
exports.getMe = asyncHandler(async (req, res, next) =>{
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        data: user
    });
});