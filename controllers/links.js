
// @desc    Get single link
// @route   GET /:id
// @acess   Public
exports.getlink = (req, res, next) => {
    res.status(200).json({sucess: true});     
}

// @desc    Create new link
// @route   POST /
// @acess   Public
exports.createlink = (req, res, next) => {
    res.status(200).json({sucess: true});     
}

// @desc    Update link
// @route   PUT /:id
// @acess   Private
exports.updatelink = (req, res, next) => {
    res.status(200).json({sucess: true});     
}


// @desc    Delete link
// @route   PELETE /:id
// @acess   Private
exports.deletelink = (req, res, next) => {
    res.status(200).json({sucess: true});     
}