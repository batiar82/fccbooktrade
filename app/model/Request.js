const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Request = new Schema({
    book: {type: Schema.Types.ObjectId, ref: 'Book'},
    requester: {type: Schema.Types.ObjectId, red: 'User'}
});
module.exports = mongoose.model('Request',Request);