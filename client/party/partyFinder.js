

const handleParty = (e) => {
    e.preventDefault();
    if($("#nameAndDatacenter").val() == ''){
        console.log('choose a character');
        return false;
    }
    sendAjax('POST', $("#PartyForm").attr("action"),  $("#PartyForm").serialize(), function() {
        loadPartiesFromServer();
    });
    return false;
};

const handleChange = (e) => {
    return false;
};

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

const loadCharactersFromServer= (csrf) => {
    sendAjax('GET', '/getCharacters', null, (data) => {
        ReactDOM.render(
            <PartyForm characters={data.characters} csrf={csrf} />,document.querySelector("#makeParty")
        );
    });
};

const loadPartiesFromServer = () => {
    sendAjax('GET', '/getParties', null, (data) => {
        ReactDOM.render(
            <PartyList parties={data.parties} />,document.querySelector("#parties")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <PartyForm csrf={csrf} characters={[]}/>, document.querySelector("#makeParty")
    );
    ReactDOM.render(
        <PartyList parties={[]}/>, document.querySelector("#parties")
    );
    loadCharactersFromServer(csrf);
    loadPartiesFromServer();
    
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});