const pokemonNameInput = document.getElementById('pokemonName')
const nameDisplay = document.getElementById('nameDisplay')
const pokemonSprite = document.getElementById('pokemonSprite')
const pokemonInfo = document.getElementById('pokemonInfo')
const abilityList = document.getElementById('abilityList')
const statList = document.getElementById('statList')
const typeList = document.getElementById('typeList')
const pokemonBaseExperience = document.getElementById('pokemonBaseExperience')
const pokemonHeight = document.getElementById('pokemonHeight')
const pokemonWeight = document.getElementById('pokemonWeight')
const fetchBtn = document.getElementById('fetchBtn')



pokemonNameInput.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        fetchPokemon()
    }
})

async function fetchPokemon() {
    try {
        clearInfo();

        const pokemonName = pokemonNameInput.value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        // const response = await fetch(`https://pokeapi.co/api/v2/pokemon/pikachu`);
        
        if (!response.ok) {
            throw new Error("Could not fetch Pokemon");
        }

        if (pokemonName.trim().length === 0) {
            alert("No Pokemon entered!")
            return
        }

        const data = await response.json();
        console.log(data)

        pokemonInfo.style.display = "grid";
        fetchData(data)
    }
    catch(error) {
        alert(Error("Could not fetch Pokemon"))
        console.error(error)
        clearInfo();
    }
}

// clear
async function clearInfo() {
    pokemonInfo.style.display = "none"
    pokemonSprite.src = ''
    pokemonId.replaceChildren()
    pokemonId.textContent = "ID#: "
    abilityList.replaceChildren()
    statList.replaceChildren()
    typeList.replaceChildren()
    pokemonBaseExperience.replaceChildren()
    pokemonBaseExperience.textContent = "Base Experience: "
    pokemonHeight.replaceChildren();
    pokemonHeight.textContent = "Height: "
    pokemonWeight.replaceChildren();
    pokemonWeight.textContent = "Weight: "
}

// data
async function fetchData(data) {
    fetchId(data)
    fetchSprite(data)
    fetchAbilities(data)
    fetchStats(data)
    fetchTypes(data)
    fetchBaseExperience(data)
    fetchHeight(data)
    fetchWeight(data)
    fetchName(data)
}

// sprite
async function fetchSprite(data) {
    pokemonSprite.src = data.sprites.front_default;
}

// name 
async function fetchName(data) {
    nameDisplay.textContent = data.name.toUpperCase();
    console.log(data.name)
}

// abilities
async function fetchAbilities(data) {
    data.abilities.forEach(abilityNumber => {
        const node = document.createElement('li')
        const formattedText = capitalizeFirstLetter(abilityNumber.ability.name)
        const textNode = document.createTextNode(formattedText)
        node.appendChild(textNode)
        abilityList.appendChild(node)
        // console.log(abilityNumber.ability.name)
    });
}

async function fetchId(data) {
    const node = document.createElement('span')
    const idNode = document.createTextNode(data.id)
    node.appendChild(idNode)
    pokemonId.appendChild(node);
    console.log(data.id);
}

// stats
async function fetchStats(data) {
    data.stats.forEach(statNumber => {
        const node = document.createElement('li')
        const statText = formatStats(statNumber.stat.name)+": "+statNumber.base_stat
        const statNode = document.createTextNode(statText)
        node.appendChild(statNode)
        statList.appendChild(node)
        // console.log(statNumber.stat.name+": "+statNumber.base_stat)
    })
}

// types
async function fetchTypes(data) {
    data.types.forEach(typeNumber => {
        const node = document.createElement('li')
        const formattedText = capitalizeFirstLetter(typeNumber.type.name)
        const typeNode = document.createTextNode(formattedText)
        node.appendChild(typeNode)
        typeList.appendChild(node);
        // console.log(typeNumber.type.name)
    })
}

// base_experience
async function fetchBaseExperience(data) {
    const node = document.createElement('span')
    const expNode = document.createTextNode(data.base_experience)
    node.appendChild(expNode)
    pokemonBaseExperience.appendChild(node);
    // console.log(data.base_experience);
}

// height
async function fetchHeight(data) {
    const node = document.createElement('span')
    const formattedHeight = deciToBase(data.height)+"m"
    const heightNode = document.createTextNode(formattedHeight)
    node.appendChild(heightNode)
    pokemonHeight.appendChild(node);
    // console.log(data.height);
}

// weight
async function fetchWeight(data) {
    const node = document.createElement('span')
    const formattedWeight = deciToBase(data.weight)+"kg"
    const weightNode = document.createTextNode(formattedWeight)
    node.appendChild(weightNode)
    pokemonWeight.appendChild(node);
    // console.log(data.weight);
}

function formatStats(string) {
    if (string.length === 2) {
        string = string.toUpperCase();
    }
    const words = string.split('-')
    return words.map(word => {
        return capitalizeFirstLetter(word)
    }).join(' ');
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function deciToBase(value) {
    return (parseFloat(value) / 10).toFixed(1)
}

 

