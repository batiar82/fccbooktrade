const mongoose = require('mongoose');
const User = mongoose.model('User').schema
const Schema = mongoose.Schema;

let Book = new Schema({
    //_id: Schema.Types.ObjectId,
    title: {type: String, required: true},
    author: {type: String, required: true},
    owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    //owner: User,
    coverUrl: String,
    tradeable: {type: Boolean, default: false}
})
    module.exports = mongoose.model('Book', Book);