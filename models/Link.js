const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
    url: {
        type: String,
        required: [true, 'Please add an url'],
        match: [
            /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid URL with HTTP or HTTPS'
          ],
    },
    address: {
        type: String
    },
    description:{
        type: String,
        maxlength: [100, 'Description can not be more that 100 characters'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expires:{
        type: Date,
        default: () => new Date(+new Date() + 30 * 24 * 60 * 60 * 1000),
    },
    password: {
        type: String,
        minlength: 6,
    },
    visitCount:{
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: false
    }  
})

module.exports = mongoose.model('Link', LinkSchema);
