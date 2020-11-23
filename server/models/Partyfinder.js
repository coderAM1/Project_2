const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// const _ = require('underscore');

let PartyModel;

const convertId = mongoose.Types.ObjectId;
// const setName = (name) => _.escape(name).trim();

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

PartySchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };
  return PartyModel.find(search).select('content dateToRun dataCenter time characterOwner owner').lean().exec(callback);
};

/* PartySchema.statics.findByDatacenter = (dataCenter, callback) => {
    const search = {
        dataCenter: dataCenter,
    };
    return PartyModel.find(search).select('content dateToRun dataCenter time characterOwner owner');
};

PartySchema.statics.findByContent = (dataCenter, content, callback) => {
    const search = {
        dataCenter: dataCenter,
        content: content,
    };
    return PartyModel.find(search).select('content dateToRun dataCenter time characterOwner owner');
}; */

PartyModel = mongoose.model('Party', PartySchema);

module.exports.PartyModel = PartyModel;
module.exports.PartySchema = PartySchema;
