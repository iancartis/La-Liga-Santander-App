< div id = "yr"
class = "year" > < /div>

function year() {
    var test = '<table border="1px"><thead><tr><th><</th><th colspan="2">2015-2016</th><th>></th><tr></thead><tbody>';
    var tr = '';
    for (var i = 0; i < 4; i++) {
        tr += '<tr>';
        for (var j = 0; j < 4; j++) {
            tr += '<td>' + 2015 + '</td>';
        }
    }
    tr += '</tr>';
    test += tr;
    return document.getElementById('yr').innerHTML = test;
}
year();


// const tableBody = document.querySelector('tbody');
// getAverageGoalsGame();
// console.log(dataMatches.matches[0].score.fullTime.homeTeam);
// let teamGoalsperGame = []



// function checkId(teamName) {
//     if (teamName === "Madrid");
//     return "Madrid"
// }

// function getAverageGoalsGame() {
//     for (let i = 0; i < dataMatches.matches.length; i++) {
//         let homeTeamName = dataMatches.matches[i].homeTeam.name;
//         let awayTeamName = dataMatches.matches[i].awayTeam.name;
//         if (homeTeamName === "Real Madrid CF") {
//             // console.log(`Goles a favor en casa:${dataMatches.matches[i].score.fullTime.homeTeam}`);
//             let arrayGoals = +[dataMatches.matches[i].score.fullTime.homeTeam];
//             console.log(arrayGoals);
//         } else if (awayTeamName === "Real Madrid CF") {
//             console.log(`Goles a favor fuera de casa:${dataMatches.matches[i].score.fullTime.awayTeam}`);

//         }

//     }
// }

// function fetchData() {
//     // fetch('https://api.football-data.org/v2/competitions/2014/matches', {
//     //         method: 'GET', // or 'PUT'
//     //         headers: {
//     //             'X-Auth-Token': 'f1369749923140b09d6fd4c523b50ef1',
//     //         },
//     //         body: JSON.stringify(data),
//     //     })
//     //     .then(response => response.json())
//     //     .then(data => {
//     //         console.log('Success:', data);
//     //     })
//     //     .catch((error) => {
//     //         console.error('Error:', error);
//     //     });
//     fetch('https://api.football-data.org/v2/competitions/2014/matches', {
//             method: 'GET',
//             // withCredentials: true,
//             // credentials: 'include',
//             headers: {

//                 'X-Auth-Token': 'f1369749923140b09d6fd4c523b50ef1', //it can be iPhone or your any other attribute
//             }
//         })
//         .then(response => response.json())
//         .then(data => console.log(data))
//         .then(appendMatches());

//     function appendMatches() {
//         for (let i = 0; i < data.matches.length; i++) {
//             if (data[i].season.currentMatchDay <= data.matches.season.currentMatchDay) {
//                 tableBody.innerHTML += `
//                 <tr class="border-black border-4">
//                         <td class="px-6 py-4 whitespace-nowrap ">
//                             <div class="flex items-center">
//                             <div class="flex-shrink-0 h-10 w-10">
//                             </div>
//                             <div class="ml-4">
//                                 <div class="text-sm font-medium text-gray-900">
//                                 ${data[i].homeTeam.name}
//                                 </div>
//                                 <div class="text-sm font-medium text-gray-900">
//                                 ${data[i].awayTeam.name}
//                                 </div>
//                             </div>
//                             </div>
//                         </td>
//                         <td class="px-6 py-4 whitespace-nowrap">
//                             <div class="text-sm text-gray-900">${data[i].score.fullTime.homeTeam}</div>
//                             <div class="text-sm text-gray-500">${data[i].score.fullTime.awayTeam}</div>
//                         </td>
//                         <td class="px-6 py-4 whitespace-nowrap">
//                             ${data[i].matchday}
//                         </td>   
//                 </tr>
//                 `;

//             } else {}

//         }


//     }
//     console.log(data[0]);
//     appendMatches();

// }

// function appendMatches() {
//     for (let i = 0; i < dataMatches.matches.length; i++) {
//         if (dataMatches.matches[i].matchday <= dataMatches.matches[0].season.currentMatchday) {
//             tableBody.innerHTML += `
//         <tr class=" ">
//                 <td class="px-6 py-4 whitespace-nowrap ">
//                     <div class="flex items-center">
//                     <div class="flex-shrink-0 h-10 w-10">
//                     </div>
//                     <div class="ml-4">
//                         <div class="text-sm font-medium text-gray-900 flex flex-row mb-5">
//                         <img class="w-10" src="https://crests.football-data.org/${dataMatches.matches[i].homeTeam.id}.svg">
//                         ${dataMatches.matches[i].homeTeam.name}
//                         </div>
//                         <div class="text-sm font-medium text-gray-900 flex flex-row">
//                         <img class="w-10" src="https://crests.football-data.org/${dataMatches.matches[i].awayTeam.id}.svg">
//                         ${dataMatches.matches[i].awayTeam.name}
//                         </div>
//                     </div>
//                     </div>
//                 </td>
//                 <td class="px-6 py-4 whitespace-nowrap">
//                     <div class="text-sm text-gray-900 mb-10">${dataMatches.matches[i].score.fullTime.homeTeam}</div>
//                     <div class="text-sm text-gray-500">${dataMatches.matches[i].score.fullTime.awayTeam}</div>
//                 </td>
//                 <td class="px-6 py-4 whitespace-nowrap">
//                     ${dataMatches.matches[i].matchday}

//                 </td>

//         </tr>
//         `;
//         } else {
//             tableBody.innerHTML += `
//         <tr class="border-black border-4 ">
//                 <td class="px-6 py-4 whitespace-nowrap ">
//                     <div class="flex items-center">
//                     <div class="flex-shrink-0 h-10 w-10">
//                     </div>
//                     <div class="ml-4">
//                         <div class="text-sm font-medium text-gray-900">
//                         ${dataMatches.matches[i].homeTeam.name}
//                         </div>
//                         <div class="text-sm font-medium text-gray-900">
//                         ${dataMatches.matches[i].awayTeam.name}
//                         </div>
//                     </div>
//                     </div>
//                 </td>
//                 <td class="px-6 py-4 whitespace-nowrap">
//                     <div class="text-sm text-red-500">Partido pendiente de jugar</div>

//                 </td>
//                 <td class="px-6 py-4 whitespace-nowrap">
//                 ${dataMatches.matches[i].matchday}

//                 </td>

//         </tr>
//         `;

//         }

//     }


// }
// console.log(dataMatches.matches);