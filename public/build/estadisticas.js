console.log('estadisticas');
const tableBody = document.querySelector('tbody');
getTeamnName();
getGoalsTeam();


function getTeamnName() {
    for (let i = 0; i < dataStandings.standings[0].table.length; i++) {
        tableBody.innerHTML += `
        ${dataStandings.standings[0].table[i].team.name}
        `;
    }
}

function getGoalsTeam() {
    for (let i = 0; i < dataStandings.standings[0].table.length; i++) {
        tableBody.innerHTML += `
        ${dataStandings.standings[0].table[i].goalsFor}
        `;
    }
}