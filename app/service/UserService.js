const ServerError = require('../helpers/server').ServerError;
const rp = require('request-promise');
const User = require('../model/User');
const Book = require('../model/Book');

let = saveUser = async (user) =>{
    console.log("User save "+JSON.stringify(user));
    try{
        newUser= new User(user);
        await newUser.validate();
        return newUser.save();
    }catch(validateERror){
        throw new ServerError(validateERror.message,400);
    }
}
module.exports = {saveUser}