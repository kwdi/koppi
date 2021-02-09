const express = require('express');
const {
    getlink,
    getlinks,
    createlink,
    updatelink,
    deletelink,
    createUnregisteredLink
} = require('../controllers/links');

const router = express.Router();

const { protect } = require('../middleware/auth');


router
    .route('/')
    .post(protect, createlink)

router
    .route('/un')
    .post(createUnregisteredLink)


router 
    .route('/all')
    .get(protect, getlinks)
    
router
    .route('/:id')
    .get(getlink)
    .put(protect, updatelink)
    .delete(protect, deletelink)

module.exports = router;
