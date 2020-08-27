const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/api/airports/:icao', async (req, res) => {
  const icao = req.params.icao;
  if(!require('fs').existsSync(`./data/${icao}.json`)) {
    res.sendStatus(404);
  } else {
    const data = await require('fs').promises.readFile(`./data/${icao}.json`, 'utf-8')
    res.json(JSON.parse(data));
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})