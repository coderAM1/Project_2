const crypto = require('crypto');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
let AccountModel = {};
const iterations = 10000;
const saltLength = 64;
const keyLength = 64;
// shcema for account
const AccountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[A-Za-z0-9_\-.]{1,16}$/,
  },
  salt: {
    type: Buffer,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

AccountSchema.statics.toAPI = (doc) => ({
  // _id is built into your mongo document and is guaranteed to be unique
  username: doc.username,
  _id: doc._id,
});
// validates password
const validatePassword = (doc, password, callback) => {
  const pass = doc.password;

  return crypto.pbkdf2(password, doc.salt, iterations, keyLength, 'RSA-SHA512', (err, hash) => {
    if (hash.toString('hex') !== pass) {
      return callback(false);
    }
    return callback(true);
  });
};
// finds by username
AccountSchema.statics.findByUsername = (name, callback) => {
  const search = {
    username: name,
  };

  return AccountModel.findOne(search, callback);
};
// generates hash using password
AccountSchema.statics.generateHash = (password, callback) => {
  const salt = crypto.randomBytes(saltLength);

  crypto.pbkdf2(password, salt, iterations, keyLength, 'RSA-SHA512', (err, hash) => callback(salt, hash.toString('hex')));
};
// authenticates user
AccountSchema.statics.authenticate = (username, password, callback) => {
  AccountModel.findByUsername(username, (err, doc) => {
    if (err) {
      return callback(err);
    }

    if (!doc) {
      return callback();
    }

    return validatePassword(doc, password, (result) => {
      if (result === true) {
        return callback(null, doc);
      }

      return callback();
    });
  });
};
// change password method
AccountSchema.statics.changePassword = (id, salt, hash, callback) => {
  const updateData = {
    password: hash,
    salt,
  };
  AccountModel.findByIdAndUpdate(id, updateData, (err, result) => {
    if (err) {
      return callback(err);
    }
    return result;
  });
  return callback();
};

AccountModel = mongoose.model('Account', AccountSchema);
// exports
module.exports.AccountModel = AccountModel;
module.exports.AccountSchema = AccountSchema;
