const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getCharacters', mid.requiresLogin, controllers.Character.getCharacters);
  app.delete('/removeCharacter', mid.requiresLogin, controllers.Character.removeCharacter);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/accountPage', mid.requiresLogin, controllers.Character.accountPage);
  app.post('/makeCharacter', mid.requiresLogin, controllers.Character.make);
  app.post('/makeParty', mid.requiresLogin, controllers.Party.makeParty);
  app.get('/party', mid.requiresLogin, controllers.Party.partyPage);
  app.get('/getParties', mid.requiresLogin, controllers.Party.getParties);
  app.get('/getPartiesContent', mid.requiresSecure, controllers.Party.getPartiesByContent);
  app.get('/getPartiesDatacenter', mid.requiresLogin, controllers.Party.getPartiesByDatacenter);
  app.get('/getPartiesCharacter', mid.requiresLogin, controllers.Party.getPartiesByCharacter);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.delete('/removeParty', mid.requiresLogin, controllers.Party.deleteParty);
  app.post('/changePassword', mid.requiresLogin, controllers.Account.changePassword);
};
module.exports = router;
