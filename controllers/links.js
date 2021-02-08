const Link = require("../models/Link");
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { nanoid } = require("nanoid");

// @desc    Get all link
// @route   GET /all
// @acess   Private/Admin
exports.getlinks = asyncHandler(async (req, res, next) => {
    
    const link = await Link.find();
 
    res.status(200).json({sucess: true, count:link.length,  data: link}); 
             
 });


// @desc    Get single link
// @route   GET /:id
// @acess   Public
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
// @acess   Public
exports.createlink = asyncHandler(async(req, res, next) => {
    
    req.body.address = nanoid(5);
    req.body.url = req.body.url.replace(/^https?:\/\//,'');
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
        return next(new ErrorResponse(`Url not found with name of ${req.params.id}`, 404));

    }

    res.status(200).json({sucess: true, data: link});     
});


// @desc    Delete link
// @route   PELETE /:id
// @acess   Private
exports.deletelink = asyncHandler(async (req, res,  next) => {
    const link = await Link.findOneAndDelete({url : req.params.id});

    if(!link){
        return next(new ErrorResponse(`Url not found with name of ${req.params.id}`, 404));
    }

    res.status(200).json({sucess: true, data: {} });
});    
