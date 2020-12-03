"use strict";

//gets characters owned by the user using ajax call
var handleCharacter = function handleCharacter(e) {
  e.preventDefault();
  handleError("");

  if ($("#characterName").val() == '' || $("#characterRole").val() == '' || $("#characterDataCenter").val() == '' || $("#characterItemLevel").val() == '') {
    handleError("All fields required");
    return false;
  }

  sendAjax('POST', $("#CharacterForm").attr("action"), $("#CharacterForm").serialize(), function () {
    loadCharactersFromServer();
  });
  return false;
}; //sends a request to delete a character from the user


var removeCharacter = function removeCharacter(e) {
  handleError("");
  e.preventDefault();

  if ($("#characterNameRemove").val() == '') {
    handleError("All fields required");
    return false;
  }

  sendAjax('DELETE', "/removeCharacter", $("#CharacterRemoveForm").serialize(), function () {
    loadCharactersFromServer();
  });
  return false;
}; //sends a request to change the user's password


var changePasswordFunc = function changePasswordFunc(e) {
  e.preventDefault();
  handleError("");

  if ($("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("password is empty");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("Passwords do not match");
    return false;
  }

  console.log($("#changePassword").serialize());
  sendAjax('POST', "/changePassword", $("#changePassword").serialize(), function () {
    ReactDOM.render( /*#__PURE__*/React.createElement("h1", null, "Password changed"), document.querySelector("#characters"));
  });
  return false;
}; //sends a request to fetch the parties created by the user


var handleParty = function handleParty(e) {
  e.preventDefault();
  handleError("");

  if ($("#nameAndDatacenter").val() == '') {
    handleError("All fields required");
    return false;
  }

  console.log($("#PartyForm").serialize());
  sendAjax('POST', $("#PartyForm").attr("action"), $("#PartyForm").serialize(), function () {
    loadPartiesFromServer();
  });
  return false;
}; //sends a request to remove a party created by the user


var removeParty = function removeParty(e) {
  e.preventDefault();
  handleError("");

  if ($("#partyNameRemove").val() == '') {
    handleError("All fields required");
    return false;
  }

  sendAjax('DELETE', "/removeParty", $("#partyRemoveForm").serialize(), function () {
    loadPartiesFromServer();
  });
  return false;
}; //form for creating a party


var PartyForm = function PartyForm(props) {
  if (props.characters.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "partyForm"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyCharacter"
    }, "Need To Create a Character"));
  }

  var CharacterNodesSelect = props.characters.map(function (character, index) {
    return /*#__PURE__*/React.createElement("option", {
      value: character.name + "*|*" + character.dataCenter,
      key: index
    }, character.name, " dataCenter: ", character.dataCenter);
  });
  return /*#__PURE__*/React.createElement("form", {
    id: "PartyForm",
    name: "PartyForm",
    onSubmit: handleParty,
    action: "/makeParty",
    method: "/POST",
    className: "PartyForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "nameDatacenter"
  }, "Character and Datacenter"), /*#__PURE__*/React.createElement("select", {
    id: "nameAndDatacenter",
    name: "nameDatacenter"
  }, CharacterNodesSelect), /*#__PURE__*/React.createElement("label", {
    htmlFor: "content"
  }, "Content: "), /*#__PURE__*/React.createElement("select", {
    id: "partyContent",
    name: "content"
  }, /*#__PURE__*/React.createElement("option", {
    value: "e1"
  }, "E1"), /*#__PURE__*/React.createElement("option", {
    value: "e2"
  }, "E2"), /*#__PURE__*/React.createElement("option", {
    value: "e3"
  }, "E3"), /*#__PURE__*/React.createElement("option", {
    value: "e4"
  }, "E4"), /*#__PURE__*/React.createElement("option", {
    value: "e5"
  }, "E5"), /*#__PURE__*/React.createElement("option", {
    value: "e6"
  }, "E6"), /*#__PURE__*/React.createElement("option", {
    value: "e7"
  }, "E7"), /*#__PURE__*/React.createElement("option", {
    value: "e8"
  }, "E8")), /*#__PURE__*/React.createElement("label", {
    htmlFor: "raidDate"
  }, "Date For Raid: "), /*#__PURE__*/React.createElement("input", {
    id: "raidDate",
    type: "date",
    name: "date",
    defaultValue: "2020-11-11"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "raidTime"
  }, "Raid Time: "), /*#__PURE__*/React.createElement("input", {
    id: "raidTime",
    type: "time",
    name: "raidTime",
    defaultValue: "12:00"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "makePartySubmit",
    type: "submit",
    value: "Make Party"
  }));
}; //form for removing a party


var PartyRemoveForm = function PartyRemoveForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "partyRemoveForm",
    name: "partyRemoveForm",
    onSubmit: removeParty,
    action: "/removeParty",
    method: "DELETE",
    className: "PartyRemoveForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "characterOwner"
  }, "Name: "), /*#__PURE__*/React.createElement("input", {
    id: "partyNameRemove",
    type: "text",
    name: "characterOwner",
    placeholder: "Character Name"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "content"
  }, "Content: "), /*#__PURE__*/React.createElement("select", {
    id: "partyContent",
    name: "content"
  }, /*#__PURE__*/React.createElement("option", {
    value: "e1"
  }, "E1"), /*#__PURE__*/React.createElement("option", {
    value: "e2"
  }, "E2"), /*#__PURE__*/React.createElement("option", {
    value: "e3"
  }, "E3"), /*#__PURE__*/React.createElement("option", {
    value: "e4"
  }, "E4"), /*#__PURE__*/React.createElement("option", {
    value: "e5"
  }, "E5"), /*#__PURE__*/React.createElement("option", {
    value: "e6"
  }, "E6"), /*#__PURE__*/React.createElement("option", {
    value: "e7"
  }, "E7"), /*#__PURE__*/React.createElement("option", {
    value: "e8"
  }, "E8")), /*#__PURE__*/React.createElement("label", {
    htmlFor: "dataCenter"
  }, "Datacenter: "), /*#__PURE__*/React.createElement("select", {
    id: "characterDataCenter",
    name: "dataCenter"
  }, /*#__PURE__*/React.createElement("option", {
    value: "aether"
  }, "Aether"), /*#__PURE__*/React.createElement("option", {
    value: "primal"
  }, "Primal"), /*#__PURE__*/React.createElement("option", {
    value: "crystal"
  }, "Crystal")), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "removePartySubmit",
    type: "submit",
    value: "Remove Party"
  }));
}; //party list html element that shows parties created by the user


var PartyList = function PartyList(props) {
  if (props.parties.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "partyList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyParty"
    }, "No Parties yet"));
  }

  var PartyNodes = props.parties.map(function (party) {
    return /*#__PURE__*/React.createElement("div", {
      key: party._id,
      className: "party"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "PartyName"
    }, " Party Leader: ", party.characterOwner, " "), /*#__PURE__*/React.createElement("h3", {
      className: "PartyDataCenter"
    }, " DataCenter: ", party.dataCenter, " "), /*#__PURE__*/React.createElement("h3", {
      className: "PartyContent"
    }, " Content: ", party.content, " "), /*#__PURE__*/React.createElement("h3", {
      className: "PartyDate"
    }, " Date: ", party.dateToRun, " "), /*#__PURE__*/React.createElement("h3", {
      className: "time"
    }, " Time: ", party.time, " "));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "partyList"
  }, PartyNodes);
}; //form for creating a character


var CharacterForm = function CharacterForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "CharacterForm",
    name: "CharacterForm",
    onSubmit: handleCharacter,
    action: "/makeCharacter",
    method: "POST",
    className: "CharacterForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "name"
  }, "Name: "), /*#__PURE__*/React.createElement("input", {
    id: "characterName",
    type: "text",
    name: "name",
    placeholder: "Character Name"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "role"
  }, "Role: "), /*#__PURE__*/React.createElement("select", {
    id: "characterRole",
    name: "role"
  }, /*#__PURE__*/React.createElement("option", {
    value: "tank"
  }, "Tank"), /*#__PURE__*/React.createElement("option", {
    value: "healer"
  }, "Healer"), /*#__PURE__*/React.createElement("option", {
    value: "dps"
  }, "DPS")), /*#__PURE__*/React.createElement("label", {
    htmlFor: "itemLevel"
  }, "Item level: "), /*#__PURE__*/React.createElement("input", {
    id: "characterItemLevel",
    type: "text",
    name: "itemLevel",
    placeholder: "Item Level"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "dataCenter"
  }, "Datacenter: "), /*#__PURE__*/React.createElement("select", {
    id: "characterDataCenter",
    name: "dataCenter"
  }, /*#__PURE__*/React.createElement("option", {
    value: "aether"
  }, "Aether"), /*#__PURE__*/React.createElement("option", {
    value: "primal"
  }, "Primal"), /*#__PURE__*/React.createElement("option", {
    value: "crystal"
  }, "Crystal")), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "makeCharacterSubmit",
    type: "submit",
    value: "Make Character"
  }));
}; //form for removing a character


var CharacterRemoveForm = function CharacterRemoveForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "CharacterRemoveForm",
    name: "characterRemoveForm",
    onSubmit: removeCharacter,
    action: "/removeCharacter",
    method: "DELETE",
    className: "CharacterRemoveForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "name"
  }, "Name: "), /*#__PURE__*/React.createElement("input", {
    id: "characterNameRemove",
    type: "text",
    name: "name",
    placeholder: "Character Name"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "removeCharacterSubmit",
    type: "submit",
    value: "Remove Character"
  }));
}; //lists characters created by the user


var CharacterList = function CharacterList(props) {
  if (props.characters.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "characterList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyCharacter"
    }, "No Characters yet"));
  }

  var CharacterNodes = props.characters.map(function (character) {
    return /*#__PURE__*/React.createElement("div", {
      key: character._id,
      className: "character"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "characterName"
    }, " Name: ", character.name, " "), /*#__PURE__*/React.createElement("h3", {
      className: "characterTank"
    }, " Role: ", character.role, " "), /*#__PURE__*/React.createElement("h3", {
      className: "characterHealer"
    }, " Item Level: ", character.itemLevel, " "), /*#__PURE__*/React.createElement("h3", {
      className: "characterDatacenter"
    }, " Datacenter: ", character.dataCenter, " "));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "characterList"
  }, CharacterNodes);
}; //renders with an ajax call the character list


var loadCharactersFromServer = function loadCharactersFromServer() {
  sendAjax('GET', '/getCharacters', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(CharacterList, {
      characters: data.characters
    }), document.querySelector("#characters"));
  });
}; //renders the party form to with info from the characters


var loadCharactersFromServer2 = function loadCharactersFromServer2(csrf) {
  sendAjax('GET', '/getCharacters', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(PartyForm, {
      characters: data.characters,
      csrf: csrf
    }), document.querySelector("#makeCharacter"));
  });
}; //gets parties created by the user and renders them


var loadPartiesFromServer = function loadPartiesFromServer() {
  sendAjax('GET', '/getParties', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(PartyList, {
      parties: data.parties
    }), document.querySelector("#characters"));
  });
}; //button method call for the character forms/list


var createCharactersWindow = function createCharactersWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(CharacterForm, {
    csrf: csrf
  }), document.querySelector("#makeCharacter"));
  ReactDOM.render( /*#__PURE__*/React.createElement(CharacterRemoveForm, {
    csrf: csrf
  }), document.querySelector("#removeCharacter"));
  ReactDOM.render( /*#__PURE__*/React.createElement(CharacterList, {
    characters: []
  }), document.querySelector("#characters"));
  loadCharactersFromServer();
}; //button method call for party forms/list


var createPartyWindow = function createPartyWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(PartyForm, {
    csrf: csrf,
    characters: []
  }), document.querySelector("#makeCharacter"));
  ReactDOM.render( /*#__PURE__*/React.createElement(PartyList, {
    parties: []
  }), document.querySelector("#characters"));
  ReactDOM.render( /*#__PURE__*/React.createElement(PartyRemoveForm, {
    csrf: csrf
  }), document.querySelector("#removeCharacter"));
  loadCharactersFromServer2(csrf);
  loadPartiesFromServer();
}; //button method call for the change password window


var ChangePasswordWindow = function ChangePasswordWindow(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "changePassword",
    name: "changePass",
    onSubmit: changePasswordFunc,
    action: "/changePassword",
    method: "POST",
    className: "changePass"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass"
  }, "New Password: "), /*#__PURE__*/React.createElement("input", {
    id: "pass",
    type: "password",
    name: "pass",
    placeholder: "password"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass2"
  }, "New Password: "), /*#__PURE__*/React.createElement("input", {
    id: "pass2",
    type: "password",
    name: "pass2",
    placeholder: "retype password"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "formSubmit",
    type: "submit",
    value: "Change Password"
  }));
}; //rendering the changepassword tab


var createChangePasswordWindow = function createChangePasswordWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(ChangePasswordWindow, {
    csrf: csrf
  }), document.querySelector("#makeCharacter"));
  ReactDOM.render( /*#__PURE__*/React.createElement("div", null), document.querySelector("#removeCharacter"));
  ReactDOM.render( /*#__PURE__*/React.createElement("div", null), document.querySelector("#characters"));
}; //sets up the html page


var setup = function setup(csrf) {
  var characterButton = document.querySelector("#createCharacters");
  var partyButton = document.querySelector("#createdParties");
  var changePassButton = document.querySelector("#changePass");
  characterButton.addEventListener("click", function (e) {
    e.preventDefault();
    handleError("");
    createCharactersWindow(csrf);
    return false;
  });
  partyButton.addEventListener("click", function (e) {
    e.preventDefault();
    handleError("");
    createPartyWindow(csrf);
    return false;
  });
  changePassButton.addEventListener("click", function (e) {
    e.preventDefault();
    handleError("");
    createChangePasswordWindow(csrf);
    return false;
  });
  createCharactersWindow(csrf);
}; //gets csrf token


var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
}; //called when the document is ready


$(document).ready(function () {
  getToken();
});
"use strict";

//handles error and displays them to the errorMes div
var handleError = function handleError(message) {
  ReactDOM.render( /*#__PURE__*/React.createElement("h3", null, message), document.querySelector("#errorMes"));
}; //redirects the page


var redirect = function redirect(response) {
  window.location = response.redirect;
}; //send ajax method


var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
