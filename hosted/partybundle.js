"use strict";

//handles ajax call for getting the parties for the first two tabs
var handleParty = function handleParty(e) {
  e.preventDefault();
  handleError("");
  sendAjax('GET', $("#partyForm2").attr("action"), $("#partyForm2").serialize(), function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(PartyList, {
      parties: data.parties
    }), document.querySelector("#parties"));
  });
  return false;
}; //handlesthe tab with name same as above but needs to account for someone not filling out the name


var handlePartyName = function handlePartyName(e) {
  e.preventDefault();
  handleError("");

  if ($("#characterName").val() == '') {
    handleError("Name is required");
    return false;
  }

  sendAjax('GET', $("#partyForm2").attr("action"), $("#partyForm2").serialize(), function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(PartyList, {
      parties: data.parties
    }), document.querySelector("#parties"));
  });
  return false;
}; //form for the content get 


var PartyFormContent = function PartyFormContent(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "partyForm2",
    name: "PartyForm",
    onSubmit: handleParty,
    action: "/getPartiesContent",
    method: "GET",
    className: "PartyForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "dataCenter"
  }, "Datacenter: "), /*#__PURE__*/React.createElement("select", {
    id: "characterDataCenter",
    name: "dataCenter"
  }, /*#__PURE__*/React.createElement("option", {
    value: "primal"
  }, "Primal"), /*#__PURE__*/React.createElement("option", {
    value: "aether"
  }, "Aether"), /*#__PURE__*/React.createElement("option", {
    value: "crystal"
  }, "Crystal")), /*#__PURE__*/React.createElement("label", {
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
  }, "E8")), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "makePartySubmit",
    type: "submit",
    value: "Get Party"
  }));
}; //form for getting parties from the datacenter


var PartyFormDatacenter = function PartyFormDatacenter(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "partyForm2",
    name: "PartyForm",
    onSubmit: handleParty,
    action: "/getPartiesDatacenter",
    method: "GET",
    className: "PartyForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "dataCenter"
  }, "Datacenter: "), /*#__PURE__*/React.createElement("select", {
    id: "characterDataCenter",
    name: "dataCenter"
  }, /*#__PURE__*/React.createElement("option", {
    value: "primal"
  }, "Primal"), /*#__PURE__*/React.createElement("option", {
    value: "aether"
  }, "Aether"), /*#__PURE__*/React.createElement("option", {
    value: "crystal"
  }, "Crystal")), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "makePartySubmit",
    type: "submit",
    value: "Get Party"
  }));
}; //form for getting party by a characters name


var PartyFormCharacter = function PartyFormCharacter(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "partyForm2",
    name: "PartyForm",
    onSubmit: handleParty,
    action: "/getPartiesCharacter",
    method: "GET",
    className: "PartyForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "characterName"
  }, "Character name: "), /*#__PURE__*/React.createElement("input", {
    id: "characterName",
    type: "text",
    name: "character",
    placeholder: "Character Name"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "makePartySubmit",
    type: "submit",
    value: "Get Party"
  }));
}; //created the html elements for the parties


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
}; //loading the parties from the server


var loadPartiesFromServer = function loadPartiesFromServer() {
  ReactDOM.render( /*#__PURE__*/React.createElement(PartyList, {
    parties: []
  }), document.querySelector("#parties"));
  sendAjax('GET', $("#partyForm2").attr("action"), $("#partyForm2").serialize(), function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(PartyList, {
      parties: data.parties
    }), document.querySelector("#parties"));
  });
}; //sets up the datacenter tab


var setupDatacenterFind = function setupDatacenterFind(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(PartyFormDatacenter, {
    csrf: csrf
  }), document.querySelector("#getParty"));
  loadPartiesFromServer();
}; //sets up the content tab


var setupContentFind = function setupContentFind(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(PartyFormContent, {
    csrf: csrf
  }), document.querySelector("#getParty"));
  loadPartiesFromServer();
}; //sets up the character tab


var setupCharacterFind = function setupCharacterFind(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(PartyFormCharacter, {
    csrf: csrf
  }), document.querySelector("#getParty"));
  loadPartiesFromServer();
}; //sets up the page


var setup = function setup(csrf) {
  var dataCenterButton = document.querySelector("#dataCenterButton");
  var contentButton = document.querySelector("#contentButton");
  var characterButton = document.querySelector("#characterButton");
  dataCenterButton.addEventListener("click", function (e) {
    e.preventDefault();
    handleError("");
    setupDatacenterFind(csrf);
    return false;
  });
  contentButton.addEventListener("click", function (e) {
    e.preventDefault();
    handleError("");
    setupContentFind(csrf);
    return false;
  });
  characterButton.addEventListener("click", function (e) {
    e.preventDefault();
    handleError("");
    setupCharacterFind(csrf);
    return false;
  });
  setupDatacenterFind(csrf);
}; //gets the csrf token


var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
}; //called with page is loaded


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
