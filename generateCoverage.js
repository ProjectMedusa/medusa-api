const axios = require('axios');
const fs = require('fs');

(async () => {
  const airports = await axios.get('https://raw.githubusercontent.com/mwgg/Airports/master/airports.json');
  

  fs.readdir(__dirname + '/data', async (err, files) => {
    const data = files
    .map((airport) => airport.replace('.json', ''));
    
    const result = []; 

    Object.entries(airports.data).forEach(([icao, { lat, lon, name }]) => {
      console.log(icao);
      if(data.includes(icao)) {
        result.push({
          icao, lat, lon, name
        })
      }
    })

    await fs.promises.writeFile('coverage.json', JSON.stringify(result), 'utf-8');
  })
})();