const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
    url: {
        type: String,
        required: [true, 'Please add an url]
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid URL with HTTP or HTTPS'
          ]
    },
    description:{
        type: String,
        maxlength: [100, 'Description can not be more that 100 characters'],
        select: false,
    },
    shortUrl: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        select: false,
    },
    expires:{
        type: Date,
        default: () => new Date(+new Date() + 30 * 24 * 60 * 60 * 1000),
        select: false,
    },
    password: {
        type: String,
        minlength: 6,
        select: false,
    },
    visitCount:{
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: false,
        select: false,
    }  
})