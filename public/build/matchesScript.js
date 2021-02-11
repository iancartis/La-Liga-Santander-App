const tableBody = document.querySelector('tbody');
appendMatches();
fetchData();


// // let keyValue = (Object.entries(newArrayMatches));[0].score);

function fetchData() {
    fetch('https://api.football-data.org/v2/competitions/2014/matches', {
            method: 'GET',
            // withCredentials: true,
            // credentials: 'include',
            headers: {

                'X-Auth-Token': 'f1369749923140b09d6fd4c523b50ef1', //it can be iPhone or your any other attribute
            }
        })
        .then(response => response.json())
        .then(function data() {
            let results = data;
            return results
        });

}








//---------Copia de la array original Array.from() sort dels partits en base a la jornada. How to order arrays of objects
function appendMatches() {
    let newArrayMatches = Array.from(dataMatches.matches);

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
    //Condicional para validar si el matchday del partido iterado es igual o menor a la Jornada actual




}