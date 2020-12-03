//handles logging in
const handleLogin = (e) => {
    e.preventDefault();

    handleError("");

    if($("#user").val() == '' || $("#pass").val() == ''){
        handleError("Username or password is empty");
        return false;
    }


    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), function(response) {
        if(response.status === "401"){
            handleError("Wrong username or password");
            return false;
        }
        return redirect(response);
    });

    return false;
};
//handles signing up
const handleSignup = (e) => {
    e.preventDefault();

    handleError("");

    if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == ''){
        handleError("Username or password is empty");
        return false;
    }

    if($("#pass").val() !== $("#pass2").val()) {
        handleError("Passwords do not match");
        return false;
    }


    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

    return false;
};
//handles fetching parties to display on the first tab
const handleParty = (e) => {
    e.preventDefault();
    sendAjax('GET', '/getPartiesContent', $("#partyForm").serialize(), (data) => {
        ReactDOM.render(
            <PartyList parties={data.parties} />,document.querySelector("#content")
        );
    });
    return false;
};
//returns the login form
const LoginWindow = (props) => {
    return (
        <form id="loginForm" name="loginForm" 
              onSubmit={handleLogin}
              action="/login"
              method="POST"
              className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username"/>
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Sign in" />
        </form>
    );
};
//returns the signup form
const SignupWindow = (props) => {
    return (
        <form id="signupForm" name="signupForm" 
              onSubmit={handleSignup}
              action="/signup"
              method="POST"
              className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username"/>
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password"/>
            <label htmlFor="pass2">Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="retype password"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Sign in" />
        </form>
    );
};
//returns the party form
const PartyFindByWindow = (props) => {
    return (
        <form id="partyForm" name="partyForm"
            onSubmit={handleParty}
            action="/getPartyContent"
            method="GET"
            className="getForm"
        >
            <label htmlFor="dataCenter">Datacenter: </label>
            <select id="characterDataCenter" name="dataCenter">
                <option value="primal">Primal</option>
                <option value="aether">Aether</option>
                <option value="crystal">Crystal</option>
            </select>
            <label htmlFor="content">Content: </label>
            <select id="partyContent" name="content">
                <option value="e1">E1</option>
                <option value="e2">E2</option>
                <option value="e3">E3</option>
                <option value="e4">E4</option>
                <option value="e5">E5</option>
                <option value="e6">E6</option>
                <option value="e7">E7</option>
                <option value="e8">E8</option>
            </select>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Get Parties" />
        </form>
    )
};
//returns the party list
const PartyList = function(props) {
    if(props.parties.length === 0) {
        return(
            <div className="partyList">
                <h3 className="emptyParty">No Parties yet</h3>
            </div>
        );
    }

    const PartyNodes = props.parties.map(function(party) {
        return (
            <div key={party._id} className="party">
                <h3 className="PartyName"> Party Leader: {party.characterOwner} </h3>
                <h3 className="PartyDataCenter"> DataCenter: {party.dataCenter} </h3>
                <h3 className="PartyContent"> Content: {party.content} </h3>
                <h3 className="PartyDate"> Date: {party.dateToRun} </h3>
                <h3 className="time"> Time: {party.time} </h3>
            </div>
        );
    });

    return (
        <div className="partyList">
            {PartyNodes}
        </div>
    );
};
//gets the parties and renders them
const loadPartiesFromServer = () => {
    sendAjax('GET', '/getPartiesContent', $("#partyForm").serialize(), (data) => {
        ReactDOM.render(
            <PartyList parties={data.parties} />,document.querySelector("#content")
        );
    });
    
};
//renders the login window
const createLoginWindow = (csrf) => {
    ReactDOM.render(
        <LoginWindow csrf={csrf} />,
        document.querySelector("#content")
    );
    ReactDOM.render(
        <div></div>,document.querySelector("#contentControl")
    );
};
//renders the signup window
const createSignupWindow = (csrf) => {
    ReactDOM.render(
        <SignupWindow csrf={csrf} />,
        document.querySelector("#content")
    );
    ReactDOM.render(
        <div></div>,document.querySelector("#contentControl")
    );
};
//renders the party window
const createPartyWindow = (csrf) => {
    ReactDOM.render(
        <PartyFindByWindow csrf={csrf} />,document.querySelector("#contentControl")
    );
    loadPartiesFromServer();
};
//sets up the html page
const setup = (csrf) => {
    const loginButton = document.querySelector("#loginButton");
    const signupButton = document.querySelector("#signupButton");
    const partyButton = document.querySelector("#partiesButton");

    signupButton.addEventListener("click", (e) => {
        e.preventDefault();
        handleError("");
        createSignupWindow(csrf);
        return false;
    });

    loginButton.addEventListener("click",(e) => {
        e.preventDefault();
        handleError("");
        createLoginWindow(csrf);
        return false
    });

    partyButton.addEventListener("click", (e) => {
        e.preventDefault();
        handleError("");
        createPartyWindow(csrf);
        return false;
    });

    createPartyWindow(csrf);
};
//gets the csrf token
const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};
//called when the page is loaded
$(document).ready(function() {
    getToken();
});