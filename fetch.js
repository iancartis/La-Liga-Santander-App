const fetch = require("node-fetch");



fetch('http://api.football-data.org/v2/matches?status=LIVE', {
        method: 'GET',
        headers: { 'X-Auth-Token': 'f1369749923140b09d6fd4c523b50ef1' },
    })
    .then(response => response.json())
    .then(json => console.log(json));

console.log('Hello');