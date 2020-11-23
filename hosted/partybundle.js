"use strict";

var handleParty = function handleParty(e) {
  e.preventDefault();

  if ($("#nameAndDatacenter").val() == '') {
    console.log('choose a character');
    return false;
  }

  sendAjax('POST', $("#PartyForm").attr("action"), $("#PartyForm").serialize(), function () {
    loadPartiesFromServer();
  });
  return false;
};

var handleChange = function handleChange(e) {
  return false;
};

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
};

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
};

var loadCharactersFromServer = function loadCharactersFromServer(csrf) {
  sendAjax('GET', '/getCharacters', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(PartyForm, {
      characters: data.characters,
      csrf: csrf
    }), document.querySelector("#makeParty"));
  });
};

var loadPartiesFromServer = function loadPartiesFromServer() {
  sendAjax('GET', '/getParties', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(PartyList, {
      parties: data.parties
    }), document.querySelector("#parties"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(PartyForm, {
    csrf: csrf,
    characters: []
  }), document.querySelector("#makeParty"));
  ReactDOM.render( /*#__PURE__*/React.createElement(PartyList, {
    parties: []
  }), document.querySelector("#parties"));
  loadCharactersFromServer(csrf);
  loadPartiesFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {};

var redirect = function redirect(response) {
  window.location = response.redirect;
};

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
