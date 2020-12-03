//gets characters owned by the user using ajax call
const handleCharacter = (e) => {
    e.preventDefault();
    handleError("");
    if($("#characterName").val() == '' || $("#characterRole").val() =='' || $("#characterDataCenter").val() == '' ||  $("#characterItemLevel").val() == '' ){
        handleError("All fields required");
        return false;
    }
    sendAjax('POST', $("#CharacterForm").attr("action"), $("#CharacterForm").serialize(), function() {
        loadCharactersFromServer();
    });
    return false;
};

//sends a request to delete a character from the user
const removeCharacter = (e) => {
    handleError("");
    e.preventDefault();
    if($("#characterNameRemove").val() =='') {
        handleError("All fields required");
        return false;
    }
    sendAjax('DELETE', "/removeCharacter", $("#CharacterRemoveForm").serialize(), function() {
        loadCharactersFromServer();
    });
    return false;
};

//sends a request to change the user's password
const changePasswordFunc = (e) => {
    e.preventDefault();
    handleError("");
    if($("#pass").val() == '' || $("#pass2").val() == ''){
        handleError("password is empty");
        return false;
    }

    if($("#pass").val() !== $("#pass2").val()) {
        handleError("Passwords do not match");
        return false;
    }
    console.log( $("#changePassword").serialize());
    sendAjax('POST', "/changePassword", $("#changePassword").serialize(), function() {
        ReactDOM.render(
            <h1>Password changed</h1>, document.querySelector("#characters")
        );
    });
    return false;
};

//sends a request to fetch the parties created by the user
const handleParty = (e) => {
    e.preventDefault();
    handleError("");
    if($("#nameAndDatacenter").val() == ''){
        handleError("All fields required");
        return false;
    }
    console.log($("#PartyForm").serialize());
    sendAjax('POST', $("#PartyForm").attr("action"),  $("#PartyForm").serialize(), function() {
        loadPartiesFromServer();
    });
    return false;
};

//sends a request to remove a party created by the user
const removeParty = (e) => {
    e.preventDefault();
    handleError("");
    if($("#partyNameRemove").val() =='') {
        handleError("All fields required");
        return false;
    }
    sendAjax('DELETE', "/removeParty", $("#partyRemoveForm").serialize(), function() {
        loadPartiesFromServer();
    });
    return false;
};

//form for creating a party
const PartyForm = (props) => {
    if(props.characters.length === 0) {
        return(
            <div className="partyForm">
                <h3 className="emptyCharacter">Need To Create a Character</h3>
            </div>
        );
    }
    const CharacterNodesSelect = props.characters.map(function(character,index) {
        return (
            <option value={character.name + "*|*" + character.dataCenter} key={index}>{character.name} dataCenter: {character.dataCenter}</option>
        );
    });
    return (
        <form id="PartyForm" name="PartyForm"
            onSubmit={handleParty}
            action="/makeParty"
            method="/POST"
            className="PartyForm"
        >
            <label htmlFor="nameDatacenter">Character and Datacenter</label>
            <select id="nameAndDatacenter" name="nameDatacenter" >
                {CharacterNodesSelect}
                
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
            <label htmlFor="raidDate">Date For Raid: </label>
            <input id="raidDate" type="date" name="date" defaultValue="2020-11-11"/>
            <label htmlFor="raidTime">Raid Time: </label>
            <input id="raidTime" type="time" name="raidTime" defaultValue="12:00"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makePartySubmit" type="submit" value="Make Party"/>
        </form>
    );
};

//form for removing a party
const PartyRemoveForm = (props) => {
    return (
    <form id="partyRemoveForm" name="partyRemoveForm"
        onSubmit={removeParty}
        action="/removeParty"
        method="DELETE"
        className="PartyRemoveForm"
    >
        <label htmlFor="characterOwner">Name: </label>
        <input id="partyNameRemove" type="text" name="characterOwner" placeholder="Character Name"/>
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
            <label htmlFor="dataCenter">Datacenter: </label>
            <select id="characterDataCenter" name="dataCenter">
                <option value="aether">Aether</option>
                <option value="primal">Primal</option>
                <option value="crystal">Crystal</option>
            </select>
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="removePartySubmit" type="submit" value="Remove Party" />
    </form>)
    ;
};

//party list html element that shows parties created by the user
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





//form for creating a character
const CharacterForm = (props) => {
    return (
        <form id="CharacterForm" name="CharacterForm" 
              onSubmit={handleCharacter}
              action="/makeCharacter"
              method="POST"
              className="CharacterForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="characterName" type="text" name="name" placeholder="Character Name"/>
            <label htmlFor="role">Role: </label>
            <select id="characterRole" name="role">
                <option value="tank">Tank</option>
                <option value="healer">Healer</option>
                <option value="dps">DPS</option>
            </select>
            <label htmlFor="itemLevel">Item level: </label>
            <input id="characterItemLevel" type="text" name="itemLevel" placeholder="Item Level"/>
            <label htmlFor="dataCenter">Datacenter: </label>
            <select id="characterDataCenter" name="dataCenter">
                <option value="aether">Aether</option>
                <option value="primal">Primal</option>
                <option value="crystal">Crystal</option>
            </select>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeCharacterSubmit" type="submit" value="Make Character" />
        </form>
    );
};
//form for removing a character
const CharacterRemoveForm = (props) => {
    return (
    <form id="CharacterRemoveForm" name="characterRemoveForm"
        onSubmit={removeCharacter}
        action="/removeCharacter"
        method="DELETE"
        className="CharacterRemoveForm"
    >
        <label htmlFor="name">Name: </label>
        <input id="characterNameRemove" type="text" name="name" placeholder="Character Name"/>
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="removeCharacterSubmit" type="submit" value="Remove Character" />
    </form>)
    ;
};

//lists characters created by the user
const CharacterList = function(props) {
    if(props.characters.length === 0) {
        return(
            <div className="characterList">
                <h3 className="emptyCharacter">No Characters yet</h3>
            </div>
        );
    }

    const CharacterNodes = props.characters.map(function(character) {
        return (
            <div key={character._id} className="character">
                <h3 className="characterName"> Name: {character.name} </h3>
                <h3 className="characterTank"> Role: {character.role} </h3>
                <h3 className="characterHealer"> Item Level: {character.itemLevel} </h3>
                <h3 className="characterDatacenter"> Datacenter: {character.dataCenter} </h3>
            </div>
        );
    });

    return (
        <div className="characterList">
            {CharacterNodes}
        </div>
    );
};

//renders with an ajax call the character list
const loadCharactersFromServer = () => {
    sendAjax('GET', '/getCharacters', null, (data) => {
        ReactDOM.render(
            <CharacterList characters={data.characters} />,document.querySelector("#characters")
        );
    });
};
//renders the party form to with info from the characters
const loadCharactersFromServer2 = (csrf) => {
    sendAjax('GET', '/getCharacters', null, (data) => {
        ReactDOM.render(
            <PartyForm characters={data.characters} csrf={csrf} />,document.querySelector("#makeCharacter")
        );
    });
};
//gets parties created by the user and renders them
const loadPartiesFromServer = () => {
    sendAjax('GET', '/getParties', null, (data) => {
        ReactDOM.render(
            <PartyList parties={data.parties} />,document.querySelector("#characters")
        );
    });
};


//button method call for the character forms/list
const createCharactersWindow = (csrf) =>{
    ReactDOM.render(
        <CharacterForm csrf={csrf} />, document.querySelector("#makeCharacter")
    );
    ReactDOM.render(
        <CharacterRemoveForm csrf={csrf}/>, document.querySelector("#removeCharacter")
    );
    ReactDOM.render(
        <CharacterList characters={[]} />,document.querySelector("#characters")
    );
    loadCharactersFromServer();
};
//button method call for party forms/list
const createPartyWindow = (csrf) => {
    ReactDOM.render(
        <PartyForm csrf={csrf} characters={[]}/>, document.querySelector("#makeCharacter")
    );
    ReactDOM.render(
        <PartyList parties={[]}/>, document.querySelector("#characters")
    );
    ReactDOM.render(
        <PartyRemoveForm csrf={csrf}/>, document.querySelector("#removeCharacter")
    );
    loadCharactersFromServer2(csrf);
    loadPartiesFromServer();
};
//button method call for the change password window
const ChangePasswordWindow = (props) => {
    return (
        <form id="changePassword" name="changePass"
            onSubmit={changePasswordFunc}
            action="/changePassword"
            method="POST"
            className="changePass"
        >
            <label htmlFor="pass">New Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password"/>
            <label htmlFor="pass2">New Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="retype password"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Change Password" />
        </form>
    );
};
//rendering the changepassword tab
const createChangePasswordWindow = (csrf) => {
    ReactDOM.render(
        <ChangePasswordWindow csrf={csrf}/> , document.querySelector("#makeCharacter")
    );
    ReactDOM.render(
        <div></div>, document.querySelector("#removeCharacter")
    );
    ReactDOM.render(
        <div></div>,document.querySelector("#characters")
    );
};
//sets up the html page
const setup = function(csrf) {
    const characterButton = document.querySelector("#createCharacters");
    const partyButton = document.querySelector("#createdParties");
    const changePassButton = document.querySelector("#changePass");
    characterButton.addEventListener("click", (e) => {
        e.preventDefault();
        handleError("");
        createCharactersWindow(csrf);
        return false;
    });

    partyButton.addEventListener("click", (e) => {
        e.preventDefault();
        handleError("");
        createPartyWindow(csrf);
        return false;
    });

    changePassButton.addEventListener("click", (e) => {
        e.preventDefault();
        handleError("");
        createChangePasswordWindow(csrf);
        return false;
    });

    createCharactersWindow(csrf);
};
//gets csrf token
const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};
//called when the document is ready
$(document).ready(function() {
    getToken();
});