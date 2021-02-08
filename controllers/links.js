const Link = require("../models/Link");
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all link
// @route   GET /
// @acess   Private/Admin
exports.getlinks = asyncHandler(async (req, res, next) => {
    
    const link = await Link.find();
 
    res.status(200).json({sucess: true, count:link.length,  data: link}); 
             
 });


// @desc    Get single link
// @route   GET /:id
// @acess   Public
exports.getlink = asyncHandler(async (req, res, next) => {
   
        const link = await Link.findOne({url : req.params.id});

        if (!link) {
            return next(new ErrorResponse(`Url not found with name of ${req.params.id}`, 404));

        }

        res.status(200).json({sucess: true, data: link}); 
        
});

// @desc    Create new link
// @route   POST /
// @acess   Public
exports.createlink = asyncHandler(async(req, res, next) => {
    
    const link = await Link.create(req.body);
        
    res.status(201).json({
        sucess: true,
        data: link
    }); 
 
});

// @desc    Update link
// @route   PUT /:id
// @acess   Private
exports.updatelink = asyncHandler(async (req, res, next) => {
    const link = await Link.findOneAndUpdate({url : req.params.id}, req.body, {
        new: true,
        runValidators: true
    });

    if(!link){
        return res.status(400).json({success: false});
    }

    res.status(200).json({sucess: true, data: link});     
});


// @desc    Delete link
// @route   PELETE /:id
// @acess   Private
exports.deletelink = asyncHandler(async (req, res,  next) => {
    const link = await Link.findOneAndDelete({url : req.params.id});

    if(!link){
        return res.status(400).json({success: false});
    }

    res.status(200).json({sucess: true, data: {} });
});    
