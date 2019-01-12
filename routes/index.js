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
};

/* GET home page. */
router.get('/', async function(req, res, next) {
  let renderMap = {};
  renderMap['socketHost'] = socketHost;
  renderMap['wether'] = 'sun'; //default
  renderMap['icon'] = 'images/undefined.png'; //default
  renderMap['temperature'] = '-'; //default

  const onRejected = (error) => {
    console.log("call error.");
    console.log(error);
  };
  try {
      // temperature
      const response = await promise(options);
      console.log(response);
      renderMap['temperature'] = response['temperature'];
      renderMap['icon'] = response['weatherIconUrl'];
      console.log('start render');
  } catch (error) {
    console.log("The error has occurred when calling weather api.");
  }
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

