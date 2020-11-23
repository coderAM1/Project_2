
const handleCharacter = (e) => {
    e.preventDefault();

    if($("#characterName").val() == '' || $("#characterRole").val() =='' || $("#characterDataCenter").val() == '' ||  $("#characterItemLevel").val() == '' ){
        return false;
    }
    sendAjax('POST', $("#CharacterForm").attr("action"), $("#CharacterForm").serialize(), function() {
        loadCharactersFromServer();
    });
    return false;
};

const removeCharacter = (e) => {
    e.preventDefault();
    if($("#characterNameRemove").val() =='') {
        return false;
    }
    sendAjax('DELETE', "/removeCharacter", $("#CharacterRemoveForm").serialize(), function() {
        loadCharactersFromServer();
    });
    return false;
}


// will be implemented later
// const removeCharacter = (e) => {};

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

const loadCharactersFromServer= () => {
    sendAjax('GET', '/getCharacters', null, (data) => {
        ReactDOM.render(
            <CharacterList characters={data.characters} />,document.querySelector("#characters")
        );
    });
};

const setup = function(csrf) {
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

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});