const models = require('../models');

const { Character, Party } = models;

const partyPage = (req, res) => {
  Character.CharacterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred ' });
    }
    return res.render('party', { csrfToken: req.csrfToken(), Characters: docs });
  });
};

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

const getParties = (request, response) => {
  const req = request;
  const res = response;

  return Party.PartyModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    console.log(docs);
    return res.json({ parties: docs });
  });
};

module.exports.partyPage = partyPage;
module.exports.getParties = getParties;
module.exports.makeParty = makeParty;
