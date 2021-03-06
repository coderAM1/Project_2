const models = require('../models');

const { Character } = models;
// gets the account page and returns characters from the user
const accountPage = (req, res) => {
  Character.CharacterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred ' });
    }
    return res.render('app', { csrfToken: req.csrfToken(), Characters: docs });
  });
};
// creates a character requested
const makeCharacter = (req, res) => {
  if (!req.body.name || !req.body.role || !req.body.itemLevel || !req.body.dataCenter) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const CharacterData = {
    name: req.body.name,
    role: req.body.role,
    itemLevel: req.body.itemLevel,
    dataCenter: req.body.dataCenter,
    owner: req.session.account._id,
  };

  const newCharacter = new Character.CharacterModel(CharacterData);

  const characterPromise = newCharacter.save();

  characterPromise.then(() => res.json({ redirect: '/accountPage' }));

  characterPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Character Already Exists' });
    }
    return res.status(400).json({ error: 'An error occurred' });
  });
  return characterPromise;
};
// gets the characters from a request
const getCharacters = (request, response) => {
  const req = request;
  const res = response;

  return Character.CharacterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.json({ characters: docs });
  });
};
// removes a character from a request
const removeCharacter = (request, response) => {
  const req = request;
  const res = response;
  return Character.CharacterModel.deleteCharacter(req.session.account._id, req.body.name, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.json({ characters: docs });
  });
};
// exports
module.exports.accountPage = accountPage;
module.exports.getCharacters = getCharacters;
module.exports.removeCharacter = removeCharacter;
module.exports.make = makeCharacter;
