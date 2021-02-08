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
    .get(getlinks)
    .post(createlink)

router
    .route('/:id')
    .get(getlink)
    .put(updatelink)
    .delete(deletelink)

module.exports = router;
