const teamContainer = document.querySelector('.team_container');
// appendStandings();
// createTeams();
const url = "https://api.football-data.org/v2/competitions/2014/teams";

const body = document.querySelector('body');
const table = document.querySelector('table thead tr');
const tableBody = document.querySelector('tbody');
showData(url, apicode);

function showData(url, apiKey) {
    // if (window.localStorage.getItem('array') < 0) {
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
                // localStorage.setItem("array", JSON.stringify(data));
                console.log(data);
                createTeams(data);
                loaderAway();


            })
            .catch((error) => {
                console.error('Error:', error);
            });
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

//Crear array amb tots els valors

function createTeams(array) {
    console.log(teamContainer);
    for (let i = 0; i < array.teams.length; i++) {
        let teamObject = document.createElement('article');
        teamObject.setAttribute('id', array.teams[i].shortName)
        teamObject.classList.add('team');
        teamContainer.appendChild(teamObject);
        let img = document.createElement('img');
        img.setAttribute("src", array.teams[i].crestUrl)
        teamObject.appendChild(img);
        let nombre = document.createElement('h2')
        nombre.className = "text-3xl font-bold text-center"
        nombre.innerText = array.teams[i].name;
        teamObject.appendChild(nombre);
        let fundacion = document.createElement('p');
        fundacion.className = "fundacion text-2xl ";
        fundacion.innerText = `Fundado en ${array.teams[i].founded}`;
        teamObject.appendChild(fundacion);
        let estadio = document.createElement('p');
        estadio.className = 'estadio text-1xl ';
        estadio.innerText = array.teams[i].venue;
        teamObject.appendChild(estadio);
        let web = document.createElement('a');
        web.className = "web"
        web.setAttribute('href', array.teams[i].website);
        web.innerHTML = "Visita su web";
        teamObject.appendChild(web);
        // let colors = document.createElement('p');

        // let colorsValue = array.teams[i].clubColors;
        // colorsValue = colorsValue.split("/");
        // colorsValue = colorsValue.join("");
        // colors.innerText = colorsValue;
        // colors.className = colorsValue;
        // teamObject.appendChild(colors);






        teamContainer.appendChild(teamObject);

    }

}





//         }

//     }
// }
// for (let i = 0; i < dataStandings.standings[0].table.length; i++) {
//     let row = document.createElement("tr")
//     row.className = 'fila ';
//     tableBody.appendChild(row);
//     let img = `<img class="w-14 mx-4" src="${dataStandings.standings[0].table[i].team.crestUrl}">`
//     let newArray = [img, dataStandings.standings[0].table[i].team.name, dataStandings.standings[0].table[i].won, dataStandings.standings[0].table[i].lost, dataStandings.standings[0].table[i].draw, dataStandings.standings[0].table[i].goalsFor, dataStandings.standings[0].table[i].goalsAgainst, dataStandings.standings[0].table[i].points, dataStandings.standings[0].table[i].form];
//     for (let j = 0; j < newArray.length; j++) {
//         let cell = document.createElement("td")
//         cell.className = "px-6 py-4 "

//         row.appendChild(cell);
//         if (newArray[j] == dataStandings.standings[0].table[i].form) {


//             let form = dataStandings.standings[0].table[i].form;
//             for (l = 0; l < form.length; l++) {
//                 let filteredform = form.replace(/,/g, "");
//                 let filteredform2 = filteredform.replace(/D/g, "<div class=\"\draw\"\></div>");
//                 let filteredform3 = filteredform2.replace(/W/g, "<div class=\"\win\"\></div>");
//                 let filteredform4 = filteredform3.replace(/L/g, "<div class=\"\lose\"\></div>");
//                 filteredform5 = `<div class="form_container">${filteredform4}</div>`;

//                 cell.innerHTML = filteredform5;
//             }


//         } else {
//             cell.innerHTML = newArray[j];
//         }

//     }


// }



// function appendStandings() {

//     for (let i = 0; i < dataStandings.standings[0].table.length; i++) {
//         //To-do crear array buida per farcir-la amb els values de cada objecte + Loop sobre la array y apend a TR
//         tableBody.innerHTML += `
//         <tr colspan="2">
//                 <td class="px-6 py-4 whitespace-nowrap">
//                     <div class="flex items-center">

//                     <div class="ml-4">
//                         <div class="text-sm font-medium text-gray-900 flex flex-row items-center">
//                         <img class="w-14 mx-4" src="${dataStandings.standings[0].table[i].team.crestUrl}">

//                         ${dataStandings.standings[0].table[i].team.name}
//                         </div>

//                     </div>
//                     </div>
//                 </td>
//                 <td class="px-6 py-4 whitespace-nowrap">
//                     <div class="text-sm text-gray-900">${dataStandings.standings[0].table[i].won}</div>
//                 </td>
//                 <td class="px-6 py-4 whitespace-nowrap">
//                     ${dataStandings.standings[0].table[i].lost}

//                 </td>
//                 <td class="px-6 py-4 whitespace-nowrap">
//                     <div class="text-sm text-gray-900">${dataStandings.standings[0].table[i].draw}</div>
//                 </td>
//                 <td class="px-6 py-4 whitespace-nowrap">
//                     <div class="text-sm text-gray-900">${dataStandings.standings[0].table[i].goalsFor}</div>
//                 </td>
//                 <td class="px-6 py-4 whitespace-nowrap">
//                     <div class="text-sm text-gray-500">
//                         ${dataStandings.standings[0].table.keys}
//                     </div>
//                 </td>
//                 <td class="px-6 py-4 whitespace-nowrap">
//                     <div class="text-sm text-gray-500">
//                         ${dataStandings.standings[0].table[i].points}
//                     </div>
//                 </td>
//                 <td class="px-6 py-4 whitespace-nowrap" class="form">
//                     <div class="text-sm text-gray-500">

//                     </div>
//                 </td>

//                 </tr>

//         `;


//     }





// }

// const formCell = document.querySelectorAll('.form');

// createTable();


// function appendTeamForm() {

//     for (let j = 0; j < formCell.length; j++) {

//         for (let i = 0; i < dataStandings.standings[0].table.length; i++) {
//             formCell[j].innerHTML = `${dataStandings.standings[0].table[i].form}`;
//         }

//     }

// }
// appendTeamForm();