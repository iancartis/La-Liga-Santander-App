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
    fetchResponse = fetchResponse.standings[0].table
    fetchResponse.forEach(element => {
        let row = document.createElement("tr")
        row.className = 'fila ';
        tableBody.appendChild(row);
        let img = `<img class="w-14 mx-4" src="${element.team.crestUrl}">`
        let newArray = [img, element.team.name, element.won, element.lost, element.draw, element.goalsFor, element.goalsAgainst, element.points, element.form];
        for (let j = 0; j < newArray.length; j++) {
            let cell = document.createElement("td")
            cell.className = "px-6 py-4 "

            row.appendChild(cell);
            if (newArray[j] == element.form) {


                let form = element.form;
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
    });

    loaderAway();
}

function appendStandings(fetchResponse) {
    fetchResponse = fetchResponse.standings[0].table
    fetchResponse.forEach(element => {
        tableBody.innerHTML += `
        <tr colspan="2">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                    
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900 flex flex-row items-center">
                        <img class="w-14 mx-4" src="${element.team.crestUrl}">

                        ${element.team.name}
                        </div>
                        
                    </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${element.won}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    ${element.lost}
                    
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${element.draw}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${element.goalsFor}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">
                        ${fetchResponse.standings[0].table.keys}
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">
                        ${element.points}
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap" class="form">
                    <div class="text-sm text-gray-500">
                        
                    </div>
                </td>
                
                </tr>
        
        `;
    })

}

function appendTeamForm() {
    fetchResponse = fetchResponse.standings[0].table
    const formCell = document.querySelectorAll('.form');
    formCell.forEach(table => {
        table.forEach(cell => {
            table.innerHTML = `${fetchResponse.form}`
        })
    })

}