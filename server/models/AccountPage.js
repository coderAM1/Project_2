const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let CharacterModel;

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();
// character schema
const CharacterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  role: {
    type: String,
    required: true,
  },
  itemLevel: {
    type: Number,
    required: true,
  },
  dataCenter: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

CharacterSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  tankLvl: doc.tankLvl,
  healerLvl: doc.healerLvl,
  dpsLvl: doc.dpsLvl,
  dataCenter: doc.dataCenter,
});
// method to find by owner
CharacterSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };
  return CharacterModel.find(search).select('name role itemLevel dataCenter').lean().exec(callback);
};
// method to delete character
CharacterSchema.statics.deleteCharacter = (ownerId, name, callback) => {
  const search = {
    owner: convertId(ownerId),
    name,
  };
  return CharacterModel.deleteOne(search, callback);
};

CharacterModel = mongoose.model('Character', CharacterSchema);
// exports
module.exports.CharacterModel = CharacterModel;
module.exports.CharacterSchema = CharacterSchema;
