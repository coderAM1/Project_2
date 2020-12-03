//handles error and displays them to the errorMes div
const handleError = (message) => {
    ReactDOM.render(
      <h3>{message}</h3>,document.querySelector("#errorMes")
    );
  }
//redirects the page

const redirect = (response) => {
    window.location = response.redirect;
};
//send ajax method
const sendAjax = (type,action,data,success) => {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function(xhr, status, error){
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};