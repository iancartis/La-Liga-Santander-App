let body = document.querySelector('body');

const table = document.querySelector('table thead tr');
const tableBody = document.querySelector('tbody');
console.log(table);

window.addEventListener('load', () => {
    let fetchResponse = fetch('https://api.football-data.org/v2/competitions/2014/standings', {
            method: 'GET',
            headers: {
                'X-Auth-Token': 'f1369749923140b09d6fd4c523b50ef1'
            }
        })
        .then(response => { loader(); return response.json() })

    .then(data => {

        createArray(data);


    });

});






// appendStandings();
// createTable();

function loader() {
    let loader = document.createElement('div');

    loader.className = "ring-container";
    loader.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div> </div>   `
    body.appendChild(loader);

}

function loaderAway() {
    let loader = document.querySelector('.ring-container');
    body.removeChild(loader);

    console.log(loader);
    console.log(body)

}
//Crear array amb tots els valors
function createArray(fetchResponse) {
    for (let i = 0; i < fetchResponse.standings[0].table.length; i++) {
        let row = document.createElement("tr")
        row.className = 'fila ';
        tableBody.appendChild(row);
        let img = `<img class="w-14 mx-4" src="${fetchResponse.standings[0].table[i].team.crestUrl}">`
        let newArray = [img, fetchResponse.standings[0].table[i].team.name, fetchResponse.standings[0].table[i].won, fetchResponse.standings[0].table[i].lost, fetchResponse.standings[0].table[i].draw, fetchResponse.standings[0].table[i].goalsFor, fetchResponse.standings[0].table[i].goalsAgainst, fetchResponse.standings[0].table[i].points, fetchResponse.standings[0].table[i].form];
        for (let j = 0; j < newArray.length; j++) {
            let cell = document.createElement("td")
            cell.className = "px-6 py-4 "

            row.appendChild(cell);
            if (newArray[j] == fetchResponse.standings[0].table[i].form) {


                let form = fetchResponse.standings[0].table[i].form;
                for (l = 0; l < form.length; l++) {
                    let filteredform = form.replace(/,/g, "");
                    let filteredform2 = filteredform.replace(/D/g, "<div class=\"\draw\"\></div>");
                    let filteredform3 = filteredform2.replace(/W/g, "<div class=\"\win\"\></div>");
                    let filteredform4 = filteredform3.replace(/L/g, "<div class=\"\lose\"\></div>");
                    filteredform5 = `<div class="form_container">${filteredform4}</div>`;

                    cell.innerHTML = filteredform5;
                }


            } else {
                cell.innerHTML = newArray[j];
            }

        }


    }
    loaderAway();
}




function appendStandings() {

    for (let i = 0; i < fetchResponse.standings[0].table.length; i++) {
        //To-do crear array buida per farcir-la amb els values de cada objecte + Loop sobre la array y apend a TR
        tableBody.innerHTML += `
        <tr colspan="2">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                    
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900 flex flex-row items-center">
                        <img class="w-14 mx-4" src="${fetchResponse.standings[0].table[i].team.crestUrl}">

                        ${fetchResponse.standings[0].table[i].team.name}
                        </div>
                        
                    </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${fetchResponse.standings[0].table[i].won}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    ${fetchResponse.standings[0].table[i].lost}
                    
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${fetchResponse.standings[0].table[i].draw}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${fetchResponse.standings[0].table[i].goalsFor}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">
                        ${fetchResponse.standings[0].table.keys}
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">
                        ${fetchResponse.standings[0].table[i].points}
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap" class="form">
                    <div class="text-sm text-gray-500">
                        
                    </div>
                </td>
                
                </tr>
        
        `;


    }





}

const formCell = document.querySelectorAll('.form');




function appendTeamForm() {

    for (let j = 0; j < formCell.length; j++) {

        for (let i = 0; i < fetchResponse.standings[0].table.length; i++) {
            formCell[j].innerHTML = `${fetchResponse.standings[0].table[i].form}`;
        }

    }

}
appendTeamForm();