const express = require('express');
const axios = require('axios');
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

const coverage = require('./coverage.json').length; 
const badgeUrl = require('./gh-coverage-badge');

app.get('/gh-badge', async (req, res) => {
  res.setHeader('content-type', 'image/svg+xml');
  res.send((await axios.get(badgeUrl(coverage))).data);
})

app.get('/coverage', (req, res) => {
  res.sendFile(__dirname + '/html/coverage.html');
})

app.get('/coverage.json', (req, res) => {
  res.sendFile(__dirname + '/coverage.json');
})
app.get('/app.js', (req, res) => {
  res.sendFile(__dirname + '/html/app.js');
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})