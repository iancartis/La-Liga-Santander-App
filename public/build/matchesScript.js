const tableBody = document.querySelector('tbody');
appendMatches();

function fetchData() {
    // fetch('https://api.football-data.org/v2/competitions/2014/matches', {
    //         method: 'GET', // or 'PUT'
    //         headers: {
    //             'X-Auth-Token': 'f1369749923140b09d6fd4c523b50ef1',
    //         },
    //         body: JSON.stringify(data),
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('Success:', data);
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     });
    fetch('https://api.football-data.org/v2/competitions/2014/matches', {
            method: 'GET',
            // withCredentials: true,
            // credentials: 'include',
            headers: {

                'X-Auth-Token': 'f1369749923140b09d6fd4c523b50ef1', //it can be iPhone or your any other attribute
            }
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .then(appendMatches());

    function appendMatches() {
        for (let i = 0; i < data.matches.length; i++) {
            tableBody.innerHTML += `
                <tr class="border-black border-4">
                        <td class="px-6 py-4 whitespace-nowrap ">
                            <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10">
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">
                                ${data[i].homeTeam.name}
                                </div>
                                <div class="text-sm font-medium text-gray-900">
                                ${data[i].awayTeam.name}
                                </div>
                            </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">${data[i].score.fullTime.homeTeam}</div>
                            <div class="text-sm text-gray-500">${data[i].score.fullTime.awayTeam}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            ${data[i].matchday}
                            
                        </td>
                        
                </tr>
                
                
                `;
        }


    }
    console.log(data[0]);
    appendMatches();

}


function appendMatches() {
    for (let i = 0; i < dataMatches.matches.length; i++) {
        tableBody.innerHTML += `
        <tr class="border-black border-4 ">
                <td class="px-6 py-4 whitespace-nowrap ">
                    <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                        ${dataMatches.matches[i].homeTeam.name}
                        </div>
                        <div class="text-sm font-medium text-gray-900">
                        ${dataMatches.matches[i].awayTeam.name}
                        </div>
                    </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${dataMatches.matches[i].score.fullTime.homeTeam}</div>
                    <div class="text-sm text-gray-500">${dataMatches.matches[i].score.fullTime.awayTeam}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    ${dataMatches.matches[i].matchday}

                </td>

        </tr>


        `;
    }


}
console.log(dataMatches.matches);