const body = document.querySelector('body');
const tableTopBody = document.querySelector('.tabletop tbody');
const tableLessBody = document.querySelector('.tableless tbody');

// let partidos = dataMatches.matches
// let resultados = getAverageGoalsGame(partidos);
// let resultadosAway = getFewerGoalsGame(partidos);
// console.log(partidos);
// console.log(resultadosAway);

// Event Listener page on load
fetch('https://api.football-data.org/v2/competitions/2014/matches', {
        method: 'GET',
        headers: {
            'X-Auth-Token': 'f1369749923140b09d6fd4c523b50ef1'
        }
    })
    .then(response => { loader(); return response.json() })
    .then(data => {

        createLessGoalsTable(getFewerGoalsGame(data.matches));
        createAverageTable(data.matches);



    })
    .catch((error) => {
        console.error('Error:', error);
    });


function loader() {
    let loader = document.createElement('div');

    loader.className = "ring-container";
    loader.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div> </div>   `
    body.appendChild(loader);

}

function loaderAway() {
    let loader = document.querySelector('.ring-container');
    body.removeChild(body.lastChild);

    console.log(loader);
    console.log(body)

}

//1 - Función para calcular el promedio de goles por partido de cada equipo
function getAverageGoalsGame(partidos) {
    let partidosFiltrados = [];
    let matchday

    // console.log(equipoEncontradoHome);
    // Foreach per iterar nomes per homeTeam
    partidos.forEach(partido => {

        matchday = partido.matchday;
        currentMatchDay = partido.season.currentMatchday;

        // Si el partido esta finalizado y la array ya tiene un partido
        if (partido.status == "FINISHED" && partidosFiltrados.length > 0) {
            //Filtramos por la id de los equipos que han jugado como locales
            let equipoEncontradoHome = partidosFiltrados.find(equipo => {
                let _id = partido.homeTeam.id;
                return equipo.id == _id;
            });
            let equipoEncontradoAway = partidosFiltrados.find(equipo => {
                let _id = partido.awayTeam.id;
                return equipo.id == _id;
            });
            //Si no se cumple la condición, es decir no existe ningun equipo en la array, hacemos push del objeto para cada equipo
            if (!equipoEncontradoHome) {
                partidosFiltrados.push({ id: partido.homeTeam.id, name: partido.homeTeam.name, goalsHomeTeam: partido.score.fullTime.homeTeam, goalsAwayTeam: partido.score.fullTime.awayTeam, totalGoals: "", matches: matchday, average: "" });
                //Si el equipo ya existe solo actualizamos los datos de los goles y el average
            } else {
                let totalGoals = equipoEncontradoHome.goalsHomeTeam + equipoEncontradoHome.goalsAwayTeam;
                equipoEncontradoHome.goalsHomeTeam += partido.score.fullTime.homeTeam;
                equipoEncontradoHome.goalsAwayTeam += partido.score.fullTime.awayTeam;
                equipoEncontradoHome.totalGoals = totalGoals;
                equipoEncontradoHome.average = equipoEncontradoHome.goalsHomeTeam / equipoEncontradoHome.matches;
                equipoEncontradoHome.matches = currentMatchDay;
                // To - do Modificar matches
            }
        }
        //Si el partido ha terminado y la array esta vacia
        else if (partido.status == "FINISHED" && partidosFiltrados.length == 0) {
            partidosFiltrados.push({ id: partido.homeTeam.id, name: partido.homeTeam.name, goalsHomeTeam: partido.score.fullTime.homeTeam, goalsawayTeam: partido.score.fullTime.awayTeam, totalGoals: "", matches: partido.matchday });

        } else {
            console.log('partidos pendientes');
        }

    });
    //Hacemos un sort de la array para ordenarla segun el numero de goles marcados

    partidosFiltrados.sort(function(a, b) {
        var partidoA = parseInt(a.goalsHomeTeam),
            partidoB = parseInt(b.goalsHomeTeam);
        return partidoB - partidoA
    });


    return partidosFiltrados;


}
//2 - Realizamos la suma de goles como visitante + goles como local
function golesSumados(array) {

}


//Creamos la table con el top 5 goleadores

function createAverageTable(array) {

    let partidosAverage = Array.from(getAverageGoalsGame(array));
    console.log(partidosAverage);
    let partidos = partidosAverage.map(equipo => {
        return {
            id: equipo.id,
            name: equipo.name,
            goles: equipo.goalsHomeTeam + equipo.goalsAwayTeam,
            matches: equipo.matches,
            average: equipo.average
        };
    });

    for (let i = 0; i < 5; i++) {
        let row = document.createElement("tr")
        row.className = 'fila ';
        tableTopBody.appendChild(row);
        let img = `<img class="w-10" src="https://crests.football-data.org/${partidos[i].id}.svg">`
        let newArray = [img, partidos[i].name, partidos[i].goles, partidos[i].matches, partidos[i].average]
        for (let j = 0; j < newArray.length; j++) {
            let cell = document.createElement("td")
            cell.className = "px-10 py-4 text-center"

            row.appendChild(cell);

            cell.innerHTML = newArray[j];


        }


    }
    loaderAway();
}


//Calculamos el promedio de goles recibidos como visitante y ordenamos los equipos de menos a más
function getFewerGoalsGame(partidos) {
    let partidosFiltradosMenosGoles = [];
    let matchday

    // console.log(equipoEncontradoHome);
    // Foreach per iterar nomes per homeTeam
    partidos.forEach(partido => {

        matchday = partido.matchday;
        currentMatchDay = partido.season.currentMatchday;

        // Si el partido esta finalizado y la array ya tiene un partido
        if (partido.status == "FINISHED" && partidosFiltradosMenosGoles.length > 0) {
            //Filtramos por la id de los equipos que han jugado como locales

            let equipoEncontradoAway = partidosFiltradosMenosGoles.find(equipo => {
                let _id = partido.awayTeam.id;
                return equipo.id == _id;
            });
            console.log(equipoEncontradoAway);
            //Si no se cumple la condición, es decir no existe ningun equipo en la array, hacemos push del objeto para cada equipo
            if (!equipoEncontradoAway) {
                partidosFiltradosMenosGoles.push({ id: partido.awayTeam.id, name: partido.awayTeam.name, golesRecibidos: partido.score.fullTime.homeTeam, matches: matchday, average: "" });
                //Si el equipo ya existe solo actualizamos los datos de los goles y el average
            } else {
                equipoEncontradoAway.golesRecibidos += partido.score.fullTime.homeTeam;
                equipoEncontradoAway.average = equipoEncontradoAway.golesRecibidos / equipoEncontradoAway.matches;
                equipoEncontradoAway.matches = currentMatchDay;
                console.log(typeof equipoEncontradoAway.average)
                    // To - do Modificar matches
            }
        }
        //Si el partido ha terminado y la array esta vacia
        else if (partido.status == "FINISHED" && partidosFiltradosMenosGoles.length == 0) {
            partidosFiltradosMenosGoles.push({ id: partido.awayTeam.id, name: partido.awayTeam.name, golesRecibidos: partido.score.fullTime.homeTeam, matches: partido.matchday });

        } else {
            console.log('partidos pendientes');
        }

    });
    //Hacemos un sort de la array para ordenarla segun el numero de goles marcados

    partidosFiltradosMenosGoles.sort(function(a, b) {
        var partidoA = parseInt(a.golesRecibidos),
            partidoB = parseInt(b.golesRecibidos);
        return partidoA - partidoB
    });

    loaderAway();
    return partidosFiltradosMenosGoles;


}





//Creamos la tabla con el top de equipos menos goleados
function createLessGoalsTable(array) {
    for (let i = 0; i < 5; i++) {
        let row = document.createElement("tr")
        row.className = 'fila ';
        tableLessBody.appendChild(row);
        let img = `<img class="w-10" src="https://crests.football-data.org/${array[i].id}.svg">`
        let newArray = [img, array[i].name, array[i].golesRecibidos, array[i].matches, array[i].average]
        for (let j = 0; j < newArray.length; j++) {
            let cell = document.createElement("td")
            cell.className = "px-10 py-4 text-center"

            row.appendChild(cell);

            cell.innerHTML = newArray[j];


        }


    }
    loaderAway();
}