const bcrypt = require('bcrypt');

function comparePass(candidatePassword) {
    console.log("Voy a comparar passwords");
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (error, isMatch) => (
      error ? reject(error) : resolve(isMatch)
    ));
  });
}

module.exports = {
  comparePass,
};