//I don't think this actually does anything anymore due to moving to react
const handleError = (message) => {
  console.log("does this happen");
  ReactDOM.render(
    <h3>{message}</h3>,document.querySelector("#errorMes")
  );
}

const sendAjax = (action, data) => {
  $.ajax({
    cache: false,
    type: "POST",
    url: action,
    data: data,
    dataType: "json",
    success: (result, status, xhr) => {

      window.location = result.redirect;
    },
    error: (xhr, status, error) => {
      const messageObj = JSON.parse(xhr.responseText);

      //handleError(messageObj.error);
    }
  });        
}

$(document).ready(() => {
  $("#signupForm").on("submit", (e) => {
    e.preventDefault();


    if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
      //handleError("RAWR! All fields are required");
      return false;
    }

    if($("#pass").val() !== $("#pass2").val()) {
      //handleError("RAWR! Passwords do not match");
      return false;           
    }

    sendAjax($("#signupForm").attr("action"), $("#signupForm").serialize());

    return false;
  });

  $("#loginForm").on("submit", (e) => {
    e.preventDefault();


    if($("#user").val() == '' || $("#pass").val() == '') {
      //handleError("RAWR! Username or password is empty");
      return false;
    }

    sendAjax($("#loginForm").attr("action"), $("#loginForm").serialize());

    return false;
  });
  
  $("#CharacterForm").on("submit", (e) => {
    e.preventDefault();


    if($("#characterName").val() == '' || $("#characterTank").val() == '' || $("#characterHealer").val() == '' || $("#characterDps").val() == '' || $("#characterDataCenter").val() == '' ) {
      //handleError("RAWR! All fields are required");
      return false;
    }

    sendAjax($("#characterForm").attr("action"), $("#characterForm").serialize());

    return false;
  });
});