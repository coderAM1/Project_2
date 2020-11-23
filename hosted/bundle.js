"use strict";

var handleCharacter = function handleCharacter(e) {
  e.preventDefault();

  if ($("#characterName").val() == '' || $("#characterRole").val() == '' || $("#characterDataCenter").val() == '' || $("#characterItemLevel").val() == '') {
    return false;
  }

  sendAjax('POST', $("#CharacterForm").attr("action"), $("#CharacterForm").serialize(), function () {
    loadCharactersFromServer();
  });
  return false;
};

var removeCharacter = function removeCharacter(e) {
  e.preventDefault();

  if ($("#characterNameRemove").val() == '') {
    return false;
  }

  sendAjax('DELETE', "/removeCharacter", $("#CharacterRemoveForm").serialize(), function () {
    loadCharactersFromServer();
  });
  return false;
}; // will be implemented later
// const removeCharacter = (e) => {};


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
};

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
};

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
};

var loadCharactersFromServer = function loadCharactersFromServer() {
  sendAjax('GET', '/getCharacters', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(CharacterList, {
      characters: data.characters
    }), document.querySelector("#characters"));
  });
};

var setup = function setup(csrf) {
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
