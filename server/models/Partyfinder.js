const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let PartyModel;

const convertId = mongoose.Types.ObjectId;
// party schema
const PartySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  content: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  dateToRun: {
    type: String,
    required: true,
  },
  dataCenter: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  characterOwner: {
    type: String,
    required: true,
  },
});

PartySchema.statics.toAPI = (doc) => ({
  content: doc.content,
  dataCenter: doc.dataCenter,
  dateToRun: doc.dateToRun,
  time: doc.time,
  characterOwner: doc.characterOwnerm,
});
// finds by owner
PartySchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };
  return PartyModel.find(search).select('content dateToRun dataCenter time characterOwner owner').lean().exec(callback);
};
// finds by datacenter
PartySchema.statics.findByDatacenter = (dataCenter, callback) => {
  const search = {
    dataCenter,
  };
  return PartyModel.find(search).select('content dateToRun dataCenter time characterOwner').lean().exec(callback);
};
// finds by content
PartySchema.statics.findByContent = (dataCenter, content, callback) => {
  const search = {
    dataCenter,
    content,
  };
  return PartyModel.find(search).select('content dateToRun dataCenter time characterOwner').lean().exec(callback);
};
// finds by character
PartySchema.statics.findByCharacter = (character, callback) => {
  const search = {
    characterOwner: character,
  };
  return PartyModel.find(search).select('content dateToRun dataCenter time characterOwner').lean().exec(callback);
};
// deletes party
PartySchema.statics.deleteParty = (ownerId, dataCenter, content, characterOwner, callback) => {
  const search = {
    owner: convertId(ownerId),
    content,
    dataCenter,
    characterOwner,
  };
  console.log(search);
  return PartyModel.deleteOne(search, callback);
};

PartyModel = mongoose.model('Party', PartySchema);
// exports
module.exports.PartyModel = PartyModel;
module.exports.PartySchema = PartySchema;
