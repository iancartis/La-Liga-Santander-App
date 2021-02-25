const body = document.querySelector('body');
const tableTopBody = document.querySelector('.tabletop tbody');
const tableLessBody = document.querySelector('.tableless tbody');
const url = "https://api.football-data.org/v2/competitions/2014/matches"
showData(url, apicode);


// let partidos = dataMatches.matches
// let resultados = getAverageGoalsGame(partidos);
// let resultadosAway = getFewerGoalsGame(partidos);
// console.log(partidos);
// console.log(resultadosAway);

function showData(url, apiKey) {
    if (window.localStorage.getItem('array') < 0) {
        window.addEventListener('load', () => {
            loader();
            fetch(url, {
                    method: 'GET',
                    headers: {
                        'X-Auth-Token': apiKey
                    }
                })
                .then(response => { return response.json() })
                .then(data => {
                    localStorage.setItem("array", JSON.stringify(data));
                    console.log(data.matches);
                    createLessGoalsTable(getFewerGoalsGame(data.matches));
                    createAverageTable(data.matches);
                    loaderAway();


                })
                .catch((error) => {
                    console.error('Error:', error);
                });


        });

    } else {
        window.addEventListener('load', () => {
            loader();
            let dataArray = JSON.parse(localStorage.getItem('array'))
            createLessGoalsTable(getFewerGoalsGame(dataArray.matches));
            createAverageTable(dataArray.matches);
            loaderAway();


        });
    }

}


function loader() {
    let loader = document.createElement('div');

    loader.className = "ring-container";
    loader.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div> </div>   `
    body.appendChild(loader);

}

function loaderAway() {
    let loader = document.querySelector('.ring-container');
    body.removeChild(body.lastChild);



}
//1 - Función para calcular el promedio de goles por partido de cada equipo
function getAverageGoalsGame(partidos) {
    let partidosFiltrados = [];
    let matchday
    let equipoEncontradoHome = [];
    let equipoEncontradoAway = []; // console.log(equipoEncontradoHome);
    // Foreach per iterar nomes per homeTeam
    partidos.forEach(partido => {


        currentMatchDay = partido.season.currentMatchday;

        equipoEncontradoHome = partidosFiltrados.find(equipo => {
            let idHomeTeam = partido.homeTeam.id;
            return equipo.id == idHomeTeam;
        });

        equipoEncontradoAway = partidosFiltrados.find(equipo => {
            let idAwayTeam = partido.awayTeam.id;
            return equipo.id == idAwayTeam;
        });
        // Si el partido esta finalizado y la array ya tiene un partido
        if (partido.status == "FINISHED") {
            //Filtramos por la id de los equipos que han jugado como locales
            //No existe el equipo Home
            if (!equipoEncontradoHome) {
                partidosFiltrados.push({
                    id: partido.homeTeam.id,
                    name: partido.homeTeam.name,

                    totalGoals: partido.score.fullTime.homeTeam,
                    matches: 1,
                    average: ""
                });
            } else {
                equipoEncontradoHome.totalGoals += partido.score.fullTime.homeTeam;
                equipoEncontradoHome.average = equipoEncontradoHome.totalGoals / equipoEncontradoHome.matches;
                equipoEncontradoHome.matches++;
                // Si existe el equipo Away
            }



            if (!equipoEncontradoAway) {
                partidosFiltrados.push({
                    id: partido.awayTeam.id,
                    name: partido.awayTeam.name,

                    totalGoals: partido.score.fullTime.awayTeam,
                    matches: 1,
                    average: ""
                });
            } else {
                equipoEncontradoAway.totalGoals += partido.score.fullTime.awayTeam;
                equipoEncontradoAway.average = equipoEncontradoAway.totalGoals / equipoEncontradoAway.matches;
                equipoEncontradoAway.matches++;

            }

        }

    });

    partidosFiltrados.sort(function(a, b) {
        var partidoA = a.average,
            partidoB = b.average;
        return partidoB - partidoA
    });

    console.log(partidosFiltrados);

    return partidosFiltrados;

}
//2 - Realizamos la suma de goles como visitante + goles como local



//Creamos la table con el top 5 goleadores

function createAverageTable(array) {

    let partidosAverage = Array.from(getAverageGoalsGame(array));
    let partidos = partidosAverage.map(equipo => {
        return {
            id: equipo.id,
            name: equipo.name,
            goles: equipo.totalGoals,
            matches: equipo.matches,
            average: equipo.average.toFixed(2)
        };
    });
    console.log(partidos)

    for (let i = 0; i < 5; i++) {
        let row = document.createElement("tr")
        row.className = 'fila ';
        tableTopBody.appendChild(row);
        let img = `<img class="w-14 mx-4" src="https://crests.football-data.org/${partidos[i].id}.svg">`
        let newArray = [img, partidos[i].name, partidos[i].goles, partidos[i].matches, partidos[i].average]
        for (let j = 0; j < newArray.length; j++) {
            let cell = document.createElement("td")
            cell.className = "px-6 py-4 text-center"

            row.appendChild(cell);

            cell.innerHTML = newArray[j];


        }


    }
    loaderAway();
}


//Calculamos el promedio de goles recibidos como visitante y ordenamos los equipos de menos a más
function getFewerGoalsGame(partidos) {
    let partidosFiltradosMenosGoles = [];

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
            //Si no se cumple la condición, es decir no existe ningun equipo en la array, hacemos push del objeto para cada equipo
            if (!equipoEncontradoAway) {
                partidosFiltradosMenosGoles.push({ id: partido.awayTeam.id, name: partido.awayTeam.name, golesRecibidos: partido.score.fullTime.homeTeam, matches: 1, average: "" });
                //Si el equipo ya existe solo actualizamos los datos de los goles y el average
            } else {
                equipoEncontradoAway.golesRecibidos += partido.score.fullTime.homeTeam;
                equipoEncontradoAway.average = equipoEncontradoAway.golesRecibidos / equipoEncontradoAway.matches;
                equipoEncontradoAway.matches++
                    // To - do Modificar matches
            }
        }
        //Si el partido ha terminado y la array esta vacia
        else if (partido.status == "FINISHED" && partidosFiltradosMenosGoles.length == 0) {
            partidosFiltradosMenosGoles.push({ id: partido.awayTeam.id, name: partido.awayTeam.name, golesRecibidos: partido.score.fullTime.homeTeam, matches: partido.matchday });

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
        let img = `<img class="w-14 mx-4" src="https://crests.football-data.org/${array[i].id}.svg">`
        let newArray = [img, array[i].name, array[i].golesRecibidos, array[i].matches, array[i].average.toFixed(2)]
        for (let j = 0; j < newArray.length; j++) {
            let cell = document.createElement("td")
            cell.className = "px-6 py-4 text-center"

            row.appendChild(cell);

            cell.innerHTML = newArray[j];
        }
    }
}