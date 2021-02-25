// let partidos = Array.from(dataMatches.matches);
const body = document.querySelector('body');
const tableBody = document.querySelector('tbody');

function loadData(data) {

    appendMatches(data);
}

function resetbutton(data) {
    let button = document.querySelector('.resetbutton');
    let searchForm = document.getElementById('search');
    button.addEventListener('click', function() {
        searchForm.value = "";
        loadData(data);

    })

}

function searchData(data) {
    document.getElementById('sendButton').addEventListener('click', function(e) {
        e.preventDefault();
        let partidosFiltrados = filterArraySearch(data);
        appendMatches(partidosFiltrados);
        resetbutton(data);
    })
}


// Event Listener page on load
fetch('https://api.football-data.org/v2/competitions/2014/matches', {
        method: 'GET',
        headers: {
            'X-Auth-Token': apicode
        }
    })
    .then(response => { loader(); return response.json() })
    .then(data => {
        loadData(data.matches);
        searchData(data.matches);



    })
    .catch((error) => {
        console.error('Error:', error);
    });

function appendMatches(newArrayMatches) {
    if (!newArrayMatches) {

        return
    }
    while (tableBody.hasChildNodes()) {
        tableBody.removeChild(tableBody.firstChild);
    }
    newArrayMatches.sort((a, b) => {
        return a.matchday - b.matchday
    });
    newArrayMatches.forEach(match => {

        let row = document.createElement("tr");
        let tdEquipos = document.createElement("td")
        tdEquipos.className = "px-6 py-4 whitespace-nowrap equipos"
        let divLocal = document.createElement("div");
        divLocal.className = "text-sm font-medium text-gray-900 flex flex-row  items-center local"
        let escudoLocal = document.createElement("img");
        escudoLocal.setAttribute("src", `https://crests.football-data.org/${match.homeTeam.id}.svg`);
        divLocal.append(escudoLocal, match.homeTeam.name)
        let divVisitante = document.createElement("div");
        divVisitante.className = "text-sm font-medium text-gray-900 flex flex-row  items-center visitante"
        let escudoVisitante = document.createElement("img");
        escudoVisitante.setAttribute("src", `https://crests.football-data.org/${match.awayTeam.id}.svg`);
        divVisitante.append(escudoVisitante, match.awayTeam.name)
        tdEquipos.append(divLocal, divVisitante);
        let tdResultados = document.createElement("td");
        tdResultados.className = "px-6 py-4 whitespace-nowrap flex flex-col resultado "
        let resultadoHomeTeam = document.createElement("div");
        resultadoHomeTeam.className = "text-sm text-gray-900 flex flex-col justify-center ";
        resultadoHomeTeam.innerHTML = match.score.fullTime.homeTeam
        let resultadoawayTeam = document.createElement("div");
        resultadoawayTeam.className = "text-sm text-gray-900 flex flex-col justify-center ";
        resultadoawayTeam.innerHTML = match.score.fullTime.awayTeam;

        if (match.status === "FINISHED") {
            tdResultados.append(resultadoHomeTeam, resultadoawayTeam);
        } else if ((match.matchday < match.season.currentMatchday) && match.status == "SCHEDULED") {
            tdResultados.className = "flex flex-col justify-center aplazado"

            tdResultados.innerHTML = "Partido aplazado";
        } else if (match.status === "IN_PLAY") {
            tdResultados.className = "flex flex-col justify-center inplay"

            tdResultados.innerHTML = "En juego";
        } else {
            tdResultados.className = "flex flex-col justify-center toplay"

            tdResultados.innerHTML = "Por Jugar";
        }
        let tdMatchDay = document.createElement("td");
        tdMatchDay.className = "px-6 py-4 whitespace-nowrap text-center";
        tdMatchDay.innerHTML = match.matchday;
        tdEquipos.append(divLocal, divVisitante);
        row.append(tdEquipos, tdResultados, tdMatchDay);
        tableBody.append(row);

    })

    loaderAway();

}

function searchChecker() {
    // let searchForm = document.getElementById('search');
    // let body = document.querySelector('body');
    // if (searchForm.value.length === 0) {
    let div = document.createElement('div');
    div.className = 'alertcontainer';
    div.innerHTML = `<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Ups parece que ha habido un error!</strong>
        <span class="block sm:inline">Por favor introduzca un valor de búsqueda</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg class="fill-current h-6 w-6 text-red-500 close" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>
      </div>`
    body.appendChild(div);
    return false

    // } else {
    //     return true
    // }


}

function radioChecker() {
    // let body = document.querySelector('body');
    // let radio = document.querySelectorAll('input[type="radio"]:checked');
    // let radioStatus
    // console.log(radio);
    // radio.forEach(radios => {
    //     if (radios.checked) {
    //         radioStatus = true
    //     } else if (radios.checked === undefined) {
    //         radioStatus = false
    //     }
    // })

    // if (radioStatus === undefined) {
    let div = document.createElement('div');
    div.className = 'alertcontainer';
    div.innerHTML = `<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Ups parece que ha habido un error!</strong>
        <span class="block sm:inline">Por favor seleccione algun valor para filtrar.</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3 close">
          <svg class="fill-current h-6 w-6 text-red-500 " role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>
      </div>`
    body.appendChild(div);

    // }
    // return true
}


function filterArraySearch(array) {
    let radio = document.querySelector('input[name="tipo"]:checked');
    let searchForm = document.getElementById('search').value;
    let finalArray = [];
    resetbutton();

    //Aqust if aplicarlo més tard en el filter del array. if filter ok -> retorno !! si el filtre es ko llenço la funció per mostrar l'error
    let searchedArray = array.filter(element => {
        return (element.homeTeam.name.toLowerCase() == searchForm.toLowerCase()) || (element.awayTeam.name.toLowerCase() == searchForm.toLowerCase())
    });
    let filteredArray = Array.from(searchedArray);
    if (searchForm && radio) {
        let radioValue = radio.value;
        if (radioValue == "empatados") {
            console.log('empatados');
            finalArray = filteredArray.filter((element2) => {

                return element2.score.winner == "DRAW"
            })
        } else if (radioValue == "ganados") {
            console.log('ganados');
            finalArray = filteredArray.filter((element2) => {

                return (element2.score.winner == "HOME_TEAM" && element2.homeTeam.name.toLowerCase() == searchForm.toLowerCase()) || (element2.score.winner == "AWAY_TEAM" && element2.awayTeam.name.toLowerCase() == searchForm.toLowerCase())


            })
        } else if (radioValue == "perdidos") {
            console.log('perdidos');
            finalArray = filteredArray.filter((element2) => {

                return (element2.score.winner == "AWAY_TEAM" && element2.homeTeam.name.toLowerCase() == searchForm.toLowerCase()) || (element2.score.winner == "HOME_TEAM" && element2.awayTeam.name.toLowerCase() == searchForm.toLowerCase())

            })
        } else if (radioValue == "proximos") {
            console.log('proximos');
            finalArray = filteredArray.filter((element2) => {

                return element2.status == "SCHEDULED"

            })


        } else if (resetbutton) {
            search.value = "";
            finalArray = array

        }
        return finalArray
    } else if (searchForm) {
        finalArray = searchedArray;
        return finalArray;
    } else if (!searchForm && radio) {
        radioChecker();
        closeAlert();
    }

}

function closeAlert() {
    let close = document.querySelector(".close");
    console.log(close);

    close.addEventListener("click", function() {
        body.removeChild(body.lastChild);

    });

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