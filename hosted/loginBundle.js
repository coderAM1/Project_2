"use strict";

//handles logging in
var handleLogin = function handleLogin(e) {
  e.preventDefault();
  handleError("");

  if ($("#user").val() == '' || $("#pass").val() == '') {
    handleError("Username or password is empty");
    return false;
  }

  sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), function (response) {
    if (response.status === "401") {
      handleError("Wrong username or password");
      return false;
    }

    return redirect(response);
  });
  return false;
}; //handles signing up


var handleSignup = function handleSignup(e) {
  e.preventDefault();
  handleError("");

  if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("Username or password is empty");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("Passwords do not match");
    return false;
  }

  sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
  return false;
}; //handles fetching parties to display on the first tab


var handleParty = function handleParty(e) {
  e.preventDefault();
  sendAjax('GET', '/getPartiesContent', $("#partyForm").serialize(), function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(PartyList, {
      parties: data.parties
    }), document.querySelector("#content"));
  });
  return false;
}; //returns the login form


var LoginWindow = function LoginWindow(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "loginForm",
    name: "loginForm",
    onSubmit: handleLogin,
    action: "/login",
    method: "POST",
    className: "mainForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "username"
  }, "Username: "), /*#__PURE__*/React.createElement("input", {
    id: "user",
    type: "text",
    name: "username",
    placeholder: "username"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass"
  }, "Password: "), /*#__PURE__*/React.createElement("input", {
    id: "pass",
    type: "password",
    name: "pass",
    placeholder: "password"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "formSubmit",
    type: "submit",
    value: "Sign in"
  }));
}; //returns the signup form


var SignupWindow = function SignupWindow(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "signupForm",
    name: "signupForm",
    onSubmit: handleSignup,
    action: "/signup",
    method: "POST",
    className: "mainForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "username"
  }, "Username: "), /*#__PURE__*/React.createElement("input", {
    id: "user",
    type: "text",
    name: "username",
    placeholder: "username"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass"
  }, "Password: "), /*#__PURE__*/React.createElement("input", {
    id: "pass",
    type: "password",
    name: "pass",
    placeholder: "password"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass2"
  }, "Password: "), /*#__PURE__*/React.createElement("input", {
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
    value: "Sign in"
  }));
}; //returns the party form


var PartyFindByWindow = function PartyFindByWindow(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "partyForm",
    name: "partyForm",
    onSubmit: handleParty,
    action: "/getPartyContent",
    method: "GET",
    className: "getForm"
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
    className: "formSubmit",
    type: "submit",
    value: "Get Parties"
  }));
}; //returns the party list


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
}; //gets the parties and renders them


var loadPartiesFromServer = function loadPartiesFromServer() {
  sendAjax('GET', '/getPartiesContent', $("#partyForm").serialize(), function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(PartyList, {
      parties: data.parties
    }), document.querySelector("#content"));
  });
}; //renders the login window


var createLoginWindow = function createLoginWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(LoginWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
  ReactDOM.render( /*#__PURE__*/React.createElement("div", null), document.querySelector("#contentControl"));
}; //renders the signup window


var createSignupWindow = function createSignupWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(SignupWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
  ReactDOM.render( /*#__PURE__*/React.createElement("div", null), document.querySelector("#contentControl"));
}; //renders the party window


var createPartyWindow = function createPartyWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(PartyFindByWindow, {
    csrf: csrf
  }), document.querySelector("#contentControl"));
  loadPartiesFromServer();
}; //sets up the html page


var setup = function setup(csrf) {
  var loginButton = document.querySelector("#loginButton");
  var signupButton = document.querySelector("#signupButton");
  var partyButton = document.querySelector("#partiesButton");
  signupButton.addEventListener("click", function (e) {
    e.preventDefault();
    handleError("");
    createSignupWindow(csrf);
    return false;
  });
  loginButton.addEventListener("click", function (e) {
    e.preventDefault();
    handleError("");
    createLoginWindow(csrf);
    return false;
  });
  partyButton.addEventListener("click", function (e) {
    e.preventDefault();
    handleError("");
    createPartyWindow(csrf);
    return false;
  });
  createPartyWindow(csrf);
}; //gets the csrf token


var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
}; //called when the page is loaded


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
