const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const comparePass = require('./methods/userMethods');
//const hashPassword = require('./middleware/userMiddleware');
const bcrypt = require('bcrypt');
let User = new Schema({
    //_id: Schema.Types.ObjectId,
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    city: String,
    state: String,
    books: [{type: Schema.Types.ObjectId,ref: 'Book'}],
    //libros ue este usuario pide a otros
    requestedBooks: [{type: Schema.Types.ObjectId,ref: 'Book'}],
    //libros que le piden a este usuario
    requiredBooks: [{type: Schema.Types.ObjectId,ref: 'Book'}]
});

/**
 * Middleware
 */
User.pre('save', function(next){
    console.log("Voy a hashear el pass")
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  return bcrypt.genSalt(10, (error, salt) => {
    if (error) return next(error);
    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) return next(hashError);
      user.password = hash;
      return next();
    });
  });
})

/**
 * Methods.
 */
User.methods.comparePassword=function comparePass(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (error, isMatch) => (
      error ? reject(error) : resolve(isMatch)
    ));
  });
}

/*User.methods.comparePassword = function comparePassword (pass) {
    console.log("Comparando");
    return this.password===pass;
  };*/
module.exports = mongoose.model('User',User);