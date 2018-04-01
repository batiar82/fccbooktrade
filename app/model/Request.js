const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Request = new Schema({
    book: {type: Schema.Types.ObjectId, ref: 'Book', required: true},
    requester: {type: Schema.Types.ObjectId, red: 'User', required: true}
});
module.exports = mongoose.model('Request',Request);