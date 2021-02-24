const Link = require("../models/Link");
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { nanoid } = require("nanoid");

// @desc    Get all link
// @route   GET /all
// @access   Private/Admin
exports.getlinks = asyncHandler(async (req, res, next) => {
    
    //Make sure user is admin
    if(req.user.role !== "admin") {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to access this link`, 401));
    }
    
    const link = await Link.find();
 
    res.status(200).json({success: true, count:link.length,  data: link}); 
             
 });


// @desc    Get single link
// @route   GET /:id
// @access   Public
exports.getlink = asyncHandler(async (req, res, next) => {
   
        const link = await Link.findOne({address : req.params.id});

        if (!link) {
            return next(new ErrorResponse(`Url not found with name of ${req.params.id}`, 404));

        } else {
            return res.redirect(`https://${link.url}`);
        }

        
});

// @desc    Create new link
// @route   POST /
// @access   Private
exports.createlink = asyncHandler(async(req, res, next) => {
    
    //Add user to req.body
    req.body.user = req.user.id;
    
    req.body.address = nanoid(5);
    req.body.url = req.body.url.replace(/^https?:\/\//,'');
    const link = await Link.create(req.body);
    const {address} = link
    const result = `https://koppi.link/`+address;
    res.status(201).json({
        success: true,
        data: link,
        result
    }); 
 
});


// @desc    Create new unregistered link
// @route   POST /unreg
// @access   Public
exports.createUnregisteredLink = asyncHandler(async(req, res, next) => {
    
    if(!req.body.url){
        return next(new ErrorResponse(`Bad Request`, 400));
    }

    req.body.address = nanoid(5);
    req.body.url = req.body.url.replace(/^https?:\/\//,'');
    const link = await Link.create(req.body);
    const {address} = link
    const result = `https://koppi.link/`+address;
    
    res.status(201).json({
        success: true,
        data: link,
        result
    }); 
 
});

// @desc    Update link
// @route   PUT /:id
// @access   Private
exports.updatelink = asyncHandler(async (req, res, next) => {
    
    

    link = await Link.findOne({address : req.params.id});

    if(!link){
        return next(new ErrorResponse(`Url not found with name of ${req.params.id}`, 404));

    }
    
    if(req.user.role == "admin"){
        link.remove();
        return res.status(200).json({success: true, data: link});  
    }

    //Make sure user is link owner
    if(link.user.toString() !== req.user.id && req.user.role !== "admin") {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this link`, 401));
    }

    link = await Link.findOneAndUpdate({address : req.params.id}, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({success: true, data: link});     
});


// @desc    Delete link
// @route   PELETE /:id
// @access   Private
exports.deletelink = asyncHandler(async (req, res,  next) => {
    const link = await Link.findOne({address : req.params.id});

    if(!link){
        return next(new ErrorResponse(`Url not found with name of ${req.params.id}`, 404));
    }

    

    //Make sure user is link owner
    if(link.user.toString() !== req.user.id && req.user.role !== "admin") {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this link`, 401));
    }

    link.remove();

    res.status(200).json({success: true, data: {} });
});    
