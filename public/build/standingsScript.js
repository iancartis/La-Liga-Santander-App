const tableBody = document.querySelector('tbody');
appendStandings();

function appendStandings() {
    for (let i = 0; i < dataStandings.standings[0].table.length; i++) {
        tableBody.innerHTML += `
        <tr colspan="2">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900 flex flex-row items-center">
                        <img class="w-14 mx-4" src="${dataStandings.standings[0].table[i].team.crestUrl}">

                        ${dataStandings.standings[0].table[i].team.name}
                        </div>
                        
                    </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${dataStandings.standings[0].table[i].won}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    ${dataStandings.standings[0].table[i].lost}
                    
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${dataStandings.standings[0].table[i].draw}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${dataStandings.standings[0].table[i].goalsFor}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">
                        ${dataStandings.standings[0].table[i].goalsAgainst}
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">
                        ${dataStandings.standings[0].table[i].points}
                    </div>
                </td>
                
                </tr>
        
        `;
    }


}
console.log(dataStandings.standings[0].table[0].team.crestUrl);