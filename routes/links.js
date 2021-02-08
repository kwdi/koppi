const express = require('express');
const {
    getlink,
    getlinks,
    createlink,
    updatelink,
    deletelink
} = require('../controllers/links');

const router = express.Router();

router
    .route('/')
    .post(createlink)

router 
    .route('/all')
    .get(getlinks)
    
router
    .route('/:id')
    .get(getlink)
    .put(updatelink)
    .delete(deletelink)

module.exports = router;
