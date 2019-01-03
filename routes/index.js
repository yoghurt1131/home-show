require('date-utils');
const config = require('config');
const cron = require('node-cron');
const express = require('express');
const promise = require('request-promise');
const router = express.Router();

const socketHost = config.get('server.host') + ':' + config.get('server.port');
const socket = require('socket.io-client')(socketHost);

const city = 'Tokyo';

// options for request
const options = {
  uri: config.get('domain.weather') +'/current/city',
  method: 'GET',
  headers: {
    'content-type': 'application/json',
    'User-Agent': 'Request-Promise',
  },
  qs: {
    cityName: city 
  },
  json: true
}


/* GET home page. */
router.get('/', async function(req, res, next) {
  let renderMap = new Object();
  renderMap['socketHost'] = socketHost;
  renderMap['date'] = new Date().toFormat('MM/DD(DDD)');
  renderMap['wether'] = 'sun' //default
  renderMap['icon'] = 'http://openweathermap.org/img/w/01d.png' //default
  renderMap['temperature'] = 0; //default
// temperature
  const response = await promise(options)
  console.log(response);
  renderMap['temperature'] = response['temperature'];
  console.log('start render');
  res.render('index', renderMap);
});

/* get data periodically */
cron.schedule('*/30 * * * * *', () => {
  console.log('cron triggered');
  promise(options)
  .then(function(data) {
    console.log(data);
    socket.emit('report', { temperature: data['temperature'], icon: data['weatherIconUrl'] });
  })
  .catch(function(err) {
    console.log(err.message);
    console.log("Cannot connect to weather api.");
  });
});

module.exports = router;

