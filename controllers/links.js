const Link = require("../models/Link");


// @desc    Get all link
// @route   GET /
// @acess   Private/Admin
exports.getlinks = async (req, res, next) => {
    try {
         const link = await Link.find();
 
         
         res.status(200).json({sucess: true, count:link.length,  data: link}); 
     } catch (err) {
         res.status(400).json({success: false});
     }
         
 }


// @desc    Get single link
// @route   GET /:id
// @acess   Public
exports.getlink = async (req, res, next) => {
   try {
        const link = await Link.findOne({url : req.params.id});

        if (!link) {
            return res.status(400).json({sucess: false});
        }

        res.status(200).json({sucess: true, data: link}); 
    } catch (err) {
        res.status(400).json({success: false});
    }
        
}

// @desc    Create new link
// @route   POST /
// @acess   Public
exports.createlink = async(req, res, next) => {
    try{
        const link = await Link.create(req.body);
    //console.log(req.body);
    
    res.status(201).json({
        sucess: true,
        data: link
    }); 
} catch(err) {
    res.status(400).json({sucess:false });
}    

};

// @desc    Update link
// @route   PUT /:id
// @acess   Private
exports.updatelink = async (req, res, next) => {
    const link = await Link.findOneAndUpdate({url : req.params.id}, req.body, {
        new: true,
        runValidators: true
    });

    if(!link){
        return res.status(400).json({success: false});
    }

    res.status(200).json({sucess: true, data: link});     
}


// @desc    Delete link
// @route   PELETE /:id
// @acess   Private
exports.deletelink = async (req, res,  next) => {
    const link = await Link.findOneAndDelete({url : req.params.id});

    if(!link){
        return res.status(400).json({success: false});
    }

    res.status(200).json({sucess: true, data: {} });
}    
