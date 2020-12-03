const models = require('../models');

const { Character, Party } = models;
// method for creating party send
const partyPage = (req, res) => {
  Character.CharacterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred ' });
    }
    return res.render('party', { csrfToken: req.csrfToken(), Characters: docs });
  });
};
// makes a party from a request
const makeParty = (req, res) => {
  if (!req.body.nameDatacenter) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const strtoSplit = String(req.body.nameDatacenter);
  const splitString = strtoSplit.split('*|*');
  const PartyData = {
    content: req.body.content,
    characterOwner: splitString[0],
    dataCenter: splitString[1],
    owner: req.session.account._id,
    dateToRun: req.body.date,
    time: req.body.raidTime,
  };

  const newParty = new Party.PartyModel(PartyData);

  const partyPromise = newParty.save();

  partyPromise.then(() => res.json({ redirect: '/party' }));

  partyPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Party Already Exists' });
    }
    return res.status(400).json({ error: 'An error occurred' });
  });
  return partyPromise;
};
// gets the parties from owner
const getParties = (request, response) => {
  const req = request;
  const res = response;

  return Party.PartyModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.json({ parties: docs });
  });
};
// gets parties from content
const getPartiesByContent = (request, response) => {
  const req = request;
  const res = response;
  return Party.PartyModel.findByContent(req.query.dataCenter, req.query.content, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error ocurred' });
    }
    return res.json({ parties: docs });
  });
};
// gets parties from datacenter
const getPartiesByDatacenter = (request, response) => {
  const req = request;
  const res = response;
  return Party.PartyModel.findByDatacenter(req.query.dataCenter, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error ocurred' });
    }
    return res.json({ parties: docs });
  });
};
// gets parties from characters
const getPartiesByCharacter = (request, response) => {
  const req = request;
  const res = response;
  return Party.PartyModel.findByCharacter(req.query.character, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error ocurred' });
    }
    return res.json({ parties: docs });
  });
};
// deletes parties by request
const deleteParty = (request, response) => {
  const req = request;
  const res = response;
  return Party.PartyModel.deleteParty(req.session.account._id, req.body.dataCenter, req.body.content, req.body.characterOwner, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.json({ parties: docs });
  });
};
// exports
module.exports.partyPage = partyPage;
module.exports.getParties = getParties;
module.exports.makeParty = makeParty;
module.exports.deleteParty = deleteParty;
module.exports.getPartiesByContent = getPartiesByContent;
module.exports.getPartiesByDatacenter = getPartiesByDatacenter;
module.exports.getPartiesByCharacter = getPartiesByCharacter;
