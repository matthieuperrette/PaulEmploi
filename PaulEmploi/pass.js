const bcrypt = require("bcrypt")
module.exports = {
  generateHash: function (plaintextPassword, callback) {
    
  },

  comparePassword: function (plaintextPassword, hash, callback) {
    bcrypt.compare(plaintextPassword, hash, function (err, result) {
      if (result)
        // password is valid
        callback(true);
      else callback(false);
    });
  },
}; 
/* version async&await
module.exports = {
  generateHash: async function (plaintextPassword) {
    const hash = await bcrypt.hash(plaintextPassword, 10);
    return hash;
  },

  // compare password
  comparePassword: async function (plaintextPassword, hash) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
  },
};
*/

