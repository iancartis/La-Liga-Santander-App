// let partidos = Array.from(dataMatches.matches);
const body = document.querySelector('body');
const tableBody = document.querySelector('tbody');


function loadData(data) {

    appendMatches(data);


}

function searchData(data) {
    document.getElementById('sendButton').addEventListener('click', function(e) {
        e.preventDefault();
        // radioChecker();
        while (tableBody.hasChildNodes()) {
            tableBody.removeChild(tableBody.firstChild);
        }
        let partidosFiltrados = filterArraySearch(data);
        appendMatches(partidosFiltrados);
    })
}


// console.log(dataMatches.matches);

// Event Listener page on load
fetch('https://api.football-data.org/v2/competitions/2014/matches', {
        method: 'GET',
        headers: {
            'X-Auth-Token': 'f1369749923140b09d6fd4c523b50ef1'
        }
    })
    .then(response => { loader(); return response.json() })
    .then(data => {
        loadData(data.matches);
        if (radioChecker) {
            searchData(data.matches);

        }

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


function appendMatches(newArrayMatches) {
    console.log('Hello');
    for (let i = 0; i < newArrayMatches.length; i++) {
        newArrayMatches.sort(function(a, b) {
            return a.matchday - b.matchday
        });
        if ((newArrayMatches[i].matchday <= newArrayMatches[0].season.currentMatchday) && newArrayMatches[i].status == "FINISHED") {

            tableBody.innerHTML += `
                    <tr class=" ">
                            <td class="px-6 py-4 whitespace-nowrap ">
                                <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10">
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900 flex flex-row mb-5 items-center">
                                    <img class="w-10" src="https://crests.football-data.org/${newArrayMatches[i].homeTeam.id}.svg">
                                    ${newArrayMatches[i].homeTeam.name}
                                    </div>
                                    <div class="text-sm font-medium text-gray-900 flex flex-row items-center">
                                    <img class="w-10" src="https://crests.football-data.org/${newArrayMatches[i].awayTeam.id}.svg">
                                    ${newArrayMatches[i].awayTeam.name}
                                    </div>
                                </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900 mb-10">${newArrayMatches[i].score.fullTime.homeTeam}</div>
                                <div class="text-sm text-gray-500">${newArrayMatches[i].score.fullTime.awayTeam}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                ${newArrayMatches[i].matchday}
    
                            </td>
    
                                </tr>
                    `;
        }
        //Condicional para detectar si el partido no tiene score y de esta manera entendemos que se ha aplazado
        else if ((newArrayMatches[i].matchday < newArrayMatches[i].season.currentMatchday) && newArrayMatches[i].status == "SCHEDULED") {
            tableBody.innerHTML += `
                    <tr class="  ">
                            <td class="px-6 py-4 whitespace-nowrap ">
                                <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10">
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900 flex flex-row mb-5 items-center">
                                    <img class="w-10" src="https://crests.football-data.org/${newArrayMatches[i].homeTeam.id}.svg">
                                    ${newArrayMatches[i].homeTeam.name}
                                    </div>
                                    <div class="text-sm font-medium text-gray-900 flex flex-row items-center">
                                    <img class="w-10" src="https://crests.football-data.org/${newArrayMatches[i].awayTeam.id}.svg">
                                    ${newArrayMatches[i].awayTeam.name}
                                    </div>
                                </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-red-500">
                                Partido pendiente de jugar
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm ">
                            ${newArrayMatches[i].matchday}
    
                            </td>
    
                    </tr>
                    `;
        }
        //Si no se cumple la condición se muestra un mensaje de "Partido pendiente de jugar"
        else {
            tableBody.innerHTML += `
            <tr class="border-black border-4 ">
                    <td class="px-6 py-4 whitespace-nowrap ">
                        <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                        </div>
                        <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900 flex flex-row mb-5 items-center">
                                    <img class="w-10" src="https://crests.football-data.org/${newArrayMatches[i].homeTeam.id}.svg">
                                    ${newArrayMatches[i].homeTeam.name}
                                    </div>
                                    <div class="text-sm font-medium text-gray-900 flex flex-row items-center">
                                    <img class="w-10" src="https://crests.football-data.org/${newArrayMatches[i].awayTeam.id}.svg">
                                    ${newArrayMatches[i].awayTeam.name}
                                    </div>
                                </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-red-500">Partido pendiente de jugar</div>
    
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                    ${newArrayMatches[i].matchday}
    
                    </td>
    
            </tr>
            `;

        }
    }
    loaderAway();


}

function radioChecker() {
    let body = document.querySelector('body');
    let radio = document.querySelectorAll('input[type="radio"]:checked');
    let radioStatus
    console.log(radio);
    var txt = "";
    var i;
    for (i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            radioStatus = true
        } else if (radio[i].checked === undefined) {
            radioStatus = false
        }
    }
    if (radioStatus === undefined) {
        let div = document.createElement('div');
        div.className = 'alert';
        div.innerHTML = `<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Ups parece que ha habido un error!</strong>
        <span class="block sm:inline">Por favor seleccione algun valor para filtrar.</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>
      </div>`
        body.appendChild(div);
    }
    return true
}

function filterNames(array) {
    function filterNames(event) {
        let searchvalue = event.target.value;
        let filterNames = array.filter((v, i) => {
            return (v.name.includes(searchvalue));
        })
        console.log(filterNames);
    }
}

function filterArraySearch(array) {
    radioChecker();
    let radioValue = document.querySelector('input[name="tipo"]:checked').value;
    let searchForm = document.getElementById('search').value;
    let finalArray = [];
    console.log(searchForm);
    console.log(radioValue, searchForm);

    // let searchedArray = array.filter((element) => {
    //     return element.homeTeam.name == searchForm || element.awayTeam.name == searchForm
    // })
    let searchedArray = array.filter(element => {
        return (element.homeTeam.name.toLowerCase() == searchForm.toLowerCase()) || (element.awayTeam.name.toLowerCase() == searchForm.toLowerCase())
    });



    let filteredArray = Array.from(searchedArray);

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
    }
    return finalArray
}