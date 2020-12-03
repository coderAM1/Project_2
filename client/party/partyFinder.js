
//handles ajax call for getting the parties for the first two tabs
const handleParty = (e) => {
    e.preventDefault();
    handleError("");
    sendAjax('GET', $("#partyForm2").attr("action"), $("#partyForm2").serialize(), (data) => {
        ReactDOM.render(
            <PartyList parties={data.parties} />,document.querySelector("#parties")
        );
    });
    return false;
};
//handlesthe tab with name same as above but needs to account for someone not filling out the name
const handlePartyName = (e) => {
    e.preventDefault();
    handleError("");

    if($("#characterName").val() == '' ){
        handleError("Name is required");
        return false;
    }
    sendAjax('GET', $("#partyForm2").attr("action"), $("#partyForm2").serialize(), (data) => {
        ReactDOM.render(
            <PartyList parties={data.parties} />,document.querySelector("#parties")
        );
    });
    return false;
};

//form for the content get 
const PartyFormContent = (props) => {
    return (
        <form id="partyForm2" name="PartyForm"
            onSubmit={handleParty}
            action="/getPartiesContent"
            method="GET"
            className="PartyForm"
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
            <input className="makePartySubmit" type="submit" value="Get Party"/>
        </form>
    );
};
//form for getting parties from the datacenter
const PartyFormDatacenter = (props) => {
    return (
        <form id="partyForm2" name="PartyForm"
            onSubmit={handleParty}
            action="/getPartiesDatacenter"
            method="GET"
            className="PartyForm"
        >
            <label htmlFor="dataCenter">Datacenter: </label>
            <select id="characterDataCenter" name="dataCenter">
                <option value="primal">Primal</option>
                <option value="aether">Aether</option>
                <option value="crystal">Crystal</option>
            </select>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makePartySubmit" type="submit" value="Get Party"/>
        </form>
    );
};
//form for getting party by a characters name
const PartyFormCharacter = (props) => {
    return (
        <form id="partyForm2" name="PartyForm"
            onSubmit={handleParty}
            action="/getPartiesCharacter"
            method="GET"
            className="PartyForm"
        >
            <label htmlFor="characterName">Character name: </label>
            <input id="characterName" type="text" name="character" placeholder="Character Name"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makePartySubmit" type="submit" value="Get Party"/>
        </form>
    );
};
//created the html elements for the parties
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
//loading the parties from the server
const loadPartiesFromServer = () => {
    ReactDOM.render(
        <PartyList parties={[]}/>, document.querySelector("#parties")
    );
    sendAjax('GET', $("#partyForm2").attr("action"), $("#partyForm2").serialize(), (data) => {
        ReactDOM.render(
            <PartyList parties={data.parties} />,document.querySelector("#parties")
        );
    });
};
//sets up the datacenter tab
const setupDatacenterFind = (csrf) => {
    ReactDOM.render(
        <PartyFormDatacenter csrf={csrf}/>, document.querySelector("#getParty")
    );
    loadPartiesFromServer();
};
//sets up the content tab
const setupContentFind = (csrf) => {
    ReactDOM.render(
        <PartyFormContent csrf={csrf}/>, document.querySelector("#getParty")
    );
    loadPartiesFromServer();
};
//sets up the character tab
const setupCharacterFind = (csrf) => {
    ReactDOM.render(
        <PartyFormCharacter csrf={csrf}/>, document.querySelector("#getParty")
    );
    loadPartiesFromServer();
};
//sets up the page
const setup = function(csrf) {
    const dataCenterButton = document.querySelector("#dataCenterButton");
    const contentButton = document.querySelector("#contentButton");
    const characterButton = document.querySelector("#characterButton");
    dataCenterButton.addEventListener("click", (e) => {
        e.preventDefault();
        handleError("");
        setupDatacenterFind(csrf);
        return false;
    });
    contentButton.addEventListener("click", (e) => {
        e.preventDefault();
        handleError("");
        setupContentFind(csrf);
        return false;
    });
    characterButton.addEventListener("click", (e) => {
        e.preventDefault();
        handleError("");
        setupCharacterFind(csrf);
        return false;
    });
    setupDatacenterFind(csrf);
};
//gets the csrf token
const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};
//called with page is loaded
$(document).ready(function() {
    getToken();
});