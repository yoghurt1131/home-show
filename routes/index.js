require('date-utils');
const cron = require('node-cron');
const express = require('express');
const promise = require('request-promise');
const router = express.Router();
const socket = require('socket.io-client')('http://localhost:3000');

const city = 'Tokyo';

// options for request
const options = {
  uri: 'http://localhost:8080/current/city',
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
  renderMap['date'] = new Date().toFormat('MM/DD(DDD)');
  renderMap['wether'] = 'sun' //default
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
    socket.emit('report', { temperature: data['temperature'] });
  });
});

module.exports = router;

