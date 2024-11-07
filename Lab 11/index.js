// 
class Agente {
    constructor(nombre, rol, habilidades, imagen) {
        this.nombre = nombre;
        this.rol = rol;
        this.habilidades = habilidades;
        this.imagen = imagen;
    }
}

// 
async function getAgents() {
    try {
        const response = await fetch("https://valorant-api.com/v1/agents");
        const data = await response.json();
        const agentsData = data.data;
        
        // 
        const agents = agentsData.map(agent => new Agente(
            agent.displayName,
            agent.role ? agent.role.displayName : "Desconocido",
            agent.abilities.map(ability => ability.displayName),
            agent.displayIcon
        ));
        
        renderAgents(agents);
        setupSearch(agents);
    } catch (error) {
        console.error("Error al obtener los agentes:", error);
    }
}

// 
function renderAgents(agents) {
    const container = document.getElementById("agents-container");
    container.innerHTML = ""; // 
    
    agents.forEach(agent => {
        const agentCard = document.createElement("div");
        agentCard.className = "agent-card";
        
        agentCard.innerHTML = `
            <img src="${agent.imagen}" alt="${agent.nombre}">
            <h2>${agent.nombre}</h2>
            <p>Rol: ${agent.rol}</p>
            <h3>Habilidades:</h3>
            <ul>
                ${agent.habilidades.map(habilidad => `<li>${habilidad}</li>`).join('')}
            </ul>
        `;
        
        container.appendChild(agentCard);
    });
}

// 
function setupSearch(agents) {
    const searchInput = document.getElementById("search");
    searchInput.addEventListener("input", () => {
        const searchText = searchInput.value.toLowerCase();
        const filteredAgents = agents.filter(agent => 
            agent.nombre.toLowerCase().includes(searchText)
        );
        renderAgents(filteredAgents);
    });
}

// 
getAgents();
