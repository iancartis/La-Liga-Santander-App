const tableBody = document.querySelector('tbody');
// appendStandings();
createTable();
console.log(dataStandings.standings[0].table.length);

//Crear array amb tots els valors

function createTable() {
    // let newArrayMatches = Array.from(dataMatches.matches);
    // let keyValue = (Object.entries(newArrayMatches));
    for (let i = 0; i < dataStandings.standings[0].table.length; i++) {
        let row = document.createElement("tr")
        row.className = 'fila';
        tableBody.appendChild(row);
        let img = `<img class="w-14 mx-4" src="${dataStandings.standings[0].table[i].team.crestUrl}">`
        let newArray = [img, dataStandings.standings[0].table[i].team.name, dataStandings.standings[0].table[i].won, dataStandings.standings[0].table[i].lost, dataStandings.standings[0].table[i].draw, dataStandings.standings[0].table[i].goalsFor, dataStandings.standings[0].table[i].goalsAgainst, dataStandings.standings[0].table[i].points, dataStandings.standings[0].table[i].form];
        console.log(newArray.length);
        for (let j = 0; j < newArray.length; j++) {
            let cell = document.createElement("td")
            cell.className = "px-6 py-4 "

            row.appendChild(cell);
            if (newArray[j] == dataStandings.standings[0].table[i].form) {


                let form = dataStandings.standings[0].table[i].form;
                for (l = 0; l < form.length; l++) {
                    let filteredform = form.replace(/,/g, "");
                    let filteredform2 = filteredform.replace(/D/g, "<div class=\"\draw\"\></div>");
                    let filteredform3 = filteredform2.replace(/W/g, "<div class=\"\win\"\></div>");
                    let filteredform4 = filteredform3.replace(/L/g, "<div class=\"\lose\"\></div>");
                    filteredform5 = `<div class="form_container">${filteredform4}</div>`;
                    console.log(filteredform5)

                    cell.innerHTML = filteredform5;
                }


            } else {
                cell.innerHTML = newArray[j];
            }

        }


    }
}


function appendStandings() {

    for (let i = 0; i < dataStandings.standings[0].table.length; i++) {
        //To-do crear array buida per farcir-la amb els values de cada objecte + Loop sobre la array y apend a TR
        tableBody.innerHTML += `
        <tr colspan="2">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                    
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
                        ${dataStandings.standings[0].table.keys}
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">
                        ${dataStandings.standings[0].table[i].points}
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

createTable();


function appendTeamForm() {

    for (let j = 0; j < formCell.length; j++) {

        for (let i = 0; i < dataStandings.standings[0].table.length; i++) {
            formCell[j].innerHTML = `${dataStandings.standings[0].table[i].form}`;
        }

    }

}
appendTeamForm();