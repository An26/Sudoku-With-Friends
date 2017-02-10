const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');


const Schema = mongoose.Schema;


const UsersSchema = new Schema({
    email: {
        type: String,
        index: { unique: true },
    },
    password: String,
    name: String,
    FBId: String,
});


UsersSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};


UsersSchema.pre('save', function saveHook(next) {
  const user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();


  return bcrypt.genSalt(1000, (saltError, salt) => {
    if (saltError) { return next(saltError); }

    return bcrypt.hash(user.password, salt, null, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});

const Users = mongoose.model('User', UsersSchema);

module.exports = Users;